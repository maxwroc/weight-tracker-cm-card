// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import '../src/custom-elements/weight-tracker-cm-card';
import type { WeightTrackerCard } from '../src/custom-elements/weight-tracker-cm-card';
import type { HomeAssistantExt } from '../src/types';

function mockHass(handler: (msg: any) => any): HomeAssistantExt {
  return {
    connection: {
      sendMessagePromise: vi.fn((msg: any) => Promise.resolve(handler(msg))),
      subscribeEvents: vi.fn(() => Promise.resolve(() => Promise.resolve())),
    },
  } as unknown as HomeAssistantExt;
}

const records = [
  { id: 1, timestamp: '2024-06-01T00:00:00Z', weight: 100 },
  { id: 2, timestamp: '2024-06-10T00:00:00Z', weight: 94 },
];

function makeCard(): WeightTrackerCard {
  return document.createElement('weight-tracker-cm-card') as WeightTrackerCard;
}

async function settle(el: WeightTrackerCard): Promise<void> {
  await new Promise((r) => setTimeout(r, 30));
  await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
}

describe('WeightTrackerCard', () => {
  it('reports a config error for a missing record_type', async () => {
    const el = makeCard();
    el.setConfig({ type: 'custom:weight-tracker-cm-card' });
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.error')).not.toBeNull();
  });

  it('provides a stub config and a card size', () => {
    const el = makeCard();
    const stub = (
      el.constructor as unknown as { getStubConfig: () => Record<string, unknown> }
    ).getStubConfig();
    expect(stub.record_type).toBe('body_weight');
    el.setConfig({ type: 'custom:weight-tracker-cm-card', record_type: 'weight', target: 86 });
    expect(el.getCardSize()).toBeGreaterThan(1);
  });

  it('does not issue a redundant fetch on initial mount', async () => {
    const calls: any[] = [];
    const hass = mockHass((msg) => {
      calls.push(msg);
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return { records };
      return [];
    });
    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    // Config + hass are both set before the element is ever inserted into
    // the DOM (a common Home Assistant pattern) - connectedCallback()'s
    // first-ever invocation must not trigger a second, wasteful fetch on
    // top of the one setupDataSource() already made.
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    expect(calls.filter((m) => m.type === 'custom_metrics/list_records')).toHaveLength(1);
  });

  it('fetches data and renders gauge, stats and chart', async () => {
    const hass = mockHass((msg) => {
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return { records };
      return [];
    });
    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    expect(el.shadowRoot!.querySelector('weight-tracker-cm-gauge')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('weight-tracker-cm-chart')).not.toBeNull();
    // Current weight (latest record) shown in stats.
    expect(el.shadowRoot!.textContent).toContain('94');
  });

  it('switches period and refetches with the right bucket', async () => {
    const calls: any[] = [];
    const hass = mockHass((msg) => {
      calls.push(msg);
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return { records };
      if (msg.type === 'custom_metrics/aggregate_records') {
        return { series: [{ name: 'w', data: [{ x: 1, y: 95 }] }] };
      }
      return [];
    });
    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    const buttons = el.shadowRoot!.querySelectorAll('button.period');
    const oneYear = Array.from(buttons).find((b) => b.textContent?.trim() === '1Y') as HTMLElement;
    oneYear.click();
    await settle(el);

    expect(calls.some((m) => m.type === 'custom_metrics/aggregate_records')).toBe(true);
  });

  it('refreshes the chart/stats after adding a record via the dialog', async () => {
    const state = { records: [...records] };
    const calls: any[] = [];
    const hass = mockHass((msg) => {
      calls.push(msg);
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return { records: state.records };
      if (msg.type === 'custom_metrics/add_record') {
        state.records = [
          ...state.records,
          { id: 3, timestamp: '2024-06-20T00:00:00Z', weight: 90 },
        ];
        return {};
      }
      return [];
    });
    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    const addButton = el.shadowRoot!.querySelector('.add-btn') as HTMLElement;
    addButton.click();
    await settle(el);

    const dialogEl = el.shadowRoot!.querySelector('weight-tracker-cm-add-dialog') as unknown as {
      shadowRoot: ShadowRoot;
      updateComplete: Promise<unknown>;
      open: boolean;
    };
    await dialogEl.updateComplete;
    const listRecordsCallsBeforeSubmit = calls.filter((m) => m.type === 'custom_metrics/list_records').length;
    const submitBtn = dialogEl.shadowRoot.querySelector('button.submit') as HTMLElement;
    submitBtn.click();
    await settle(el);
    await settle(el);

    expect(calls.some((m) => m.type === 'custom_metrics/add_record')).toBe(true);
    // A fresh fetch must follow the add so the newly-added record is reflected.
    const listRecordsCallsAfterSubmit = calls.filter((m) => m.type === 'custom_metrics/list_records').length;
    expect(listRecordsCallsAfterSubmit).toBeGreaterThan(listRecordsCallsBeforeSubmit);
    expect(dialogEl.open).toBe(false);
    expect(el.shadowRoot!.textContent).toContain('90');
  });

  it('refreshes when a custom_metrics_updated event fires (e.g. added elsewhere)', async () => {
    const state = { records: [...records] };
    let subscribedCallback: ((event: unknown) => void) | undefined;
    const hass: HomeAssistantExt = {
      connection: {
        sendMessagePromise: vi.fn((msg: any) => {
          if (msg.type === 'custom_metrics/list_record_types') {
            return Promise.resolve({
              record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }],
            });
          }
          if (msg.type === 'custom_metrics/list_records') {
            return Promise.resolve({ records: state.records });
          }
          return Promise.resolve([]);
        }),
        subscribeEvents: vi.fn((callback: (event: unknown) => void) => {
          subscribedCallback = callback;
          return Promise.resolve(() => Promise.resolve());
        }),
      },
    } as unknown as HomeAssistantExt;

    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    expect(el.shadowRoot!.textContent).toContain('94');
    expect(subscribedCallback).toBeDefined();

    // Simulate a record added from elsewhere (another tab, an automation, the
    // Custom Metrics integration's own card) while ours stays mounted.
    state.records = [...state.records, { id: 3, timestamp: '2024-06-20T00:00:00Z', weight: 90 }];
    vi.useFakeTimers();
    subscribedCallback!({});
    // scheduleRefresh() debounces via a 300ms setTimeout - advance fake
    // timers instead of a real-time sleep (faster, and avoids CI flakiness).
    await vi.advanceTimersByTimeAsync(300);
    vi.useRealTimers();
    await el.updateComplete;

    expect(el.shadowRoot!.textContent).toContain('90');
  });

  it('re-subscribes to live updates after being detached and reattached', async () => {
    const state = { records: [...records] };
    let subscribeCount = 0;
    let subscribedCallback: ((event: unknown) => void) | undefined;
    const hass: HomeAssistantExt = {
      connection: {
        sendMessagePromise: vi.fn((msg: any) => {
          if (msg.type === 'custom_metrics/list_record_types') {
            return Promise.resolve({
              record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }],
            });
          }
          if (msg.type === 'custom_metrics/list_records') {
            return Promise.resolve({ records: state.records });
          }
          return Promise.resolve([]);
        }),
        subscribeEvents: vi.fn((callback: (event: unknown) => void) => {
          subscribeCount += 1;
          subscribedCallback = callback;
          return Promise.resolve(() => Promise.resolve());
        }),
      },
    } as unknown as HomeAssistantExt;

    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);
    expect(subscribeCount).toBe(1);

    // Simulate a dashboard view switch: the element is removed from the DOM
    // then reattached without setConfig()/hass being called again.
    el.remove();
    document.body.appendChild(el);
    await settle(el);

    expect(subscribeCount).toBe(2);

    // The re-established subscription must actually work.
    state.records = [...state.records, { id: 3, timestamp: '2024-06-20T00:00:00Z', weight: 90 }];
    vi.useFakeTimers();
    subscribedCallback!({});
    // scheduleRefresh() debounces via a 300ms setTimeout - advance fake
    // timers instead of a real-time sleep (faster, and avoids CI flakiness).
    await vi.advanceTimersByTimeAsync(300);
    vi.useRealTimers();
    await el.updateComplete;

    expect(el.shadowRoot!.textContent).toContain('90');
  });

  it('clears a pending refresh debounce timer on disconnect', async () => {
    const calls: any[] = [];
    let subscribedCallback: ((event: unknown) => void) | undefined;
    const hass: HomeAssistantExt = {
      connection: {
        sendMessagePromise: vi.fn((msg: any) => {
          calls.push(msg);
          if (msg.type === 'custom_metrics/list_record_types') {
            return Promise.resolve({
              record_types: [{ id: 'weight', fields: [{ key: 'weight', label: 'Weight', type: 'number' }] }],
            });
          }
          if (msg.type === 'custom_metrics/list_records') {
            return Promise.resolve({ records });
          }
          return Promise.resolve([]);
        }),
        subscribeEvents: vi.fn((callback: (event: unknown) => void) => {
          subscribedCallback = callback;
          return Promise.resolve(() => Promise.resolve());
        }),
      },
    } as unknown as HomeAssistantExt;

    const el = makeCard();
    el.setConfig({
      type: 'custom:weight-tracker-cm-card',
      record_type: 'weight',
      value_field: 'weight',
      target: 86,
      default_period: '7d',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await settle(el);

    const listRecordsCallsBeforeEvent = calls.filter((m) => m.type === 'custom_metrics/list_records').length;

    vi.useFakeTimers();
    // Fire the live-update event (schedules a 300ms debounced refetch), then
    // detach before it fires - disconnectedCallback must cancel the pending
    // timer instead of letting it fetch on a now-invisible card.
    subscribedCallback!({});
    el.remove();
    await vi.advanceTimersByTimeAsync(300);
    vi.useRealTimers();

    const listRecordsCallsAfter = calls.filter((m) => m.type === 'custom_metrics/list_records').length;
    expect(listRecordsCallsAfter).toBe(listRecordsCallsBeforeEvent);
  });
});
