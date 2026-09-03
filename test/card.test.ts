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

  it('fetches data and renders gauge, stats and chart', async () => {
    const hass = mockHass((msg) => {
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ key: 'weight', fields: [{ key: 'weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return records;
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
        return { record_types: [{ key: 'weight', fields: [{ key: 'weight', type: 'number' }] }] };
      }
      if (msg.type === 'custom_metrics/list_records') return records;
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
});
