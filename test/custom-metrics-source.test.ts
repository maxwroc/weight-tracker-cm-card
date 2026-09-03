import { describe, expect, it, vi } from 'vitest';
import { CustomMetricsDataSource } from '../src/data/custom-metrics-source';
import type { HomeAssistantExt } from '../src/types';
import { resolvePeriod } from '../src/logic/period';

function mockHass(handler: (msg: any) => any): HomeAssistantExt {
  return {
    connection: {
      sendMessagePromise: vi.fn((msg: any) => Promise.resolve(handler(msg))),
      subscribeEvents: vi.fn(() => Promise.resolve(() => Promise.resolve())),
    },
  } as unknown as HomeAssistantExt;
}

describe('CustomMetricsDataSource', () => {
  it('fetches raw records for the 7d view and maps timestamp/value', async () => {
    const hass = mockHass((msg) => {
      expect(msg.type).toBe('custom_metrics/list_records');
      expect(msg.record_type).toBe('weight');
      expect(msg.limit).toBe(500);
      return [
        { id: 2, timestamp: '2024-06-10T00:00:00Z', weight: 93.8 },
        { id: 1, timestamp: '2024-06-01T00:00:00Z', weight: 99 },
      ];
    });
    const source = new CustomMetricsDataSource(hass, { recordType: 'weight', valueField: 'weight' });

    const points = await source.fetchPoints(resolvePeriod('7d', new Date('2024-06-15T00:00:00Z')));

    expect(points).toHaveLength(2);
    // Sorted ascending by time.
    expect(points[0].y).toBe(99);
    expect(points[1].y).toBe(93.8);
    expect(points[0].x).toBeLessThan(points[1].x);
  });

  it('uses aggregate_records with apexcharts format for bucketed views', async () => {
    const hass = mockHass((msg) => {
      expect(msg.type).toBe('custom_metrics/aggregate_records');
      expect(msg.op).toBe('avg');
      expect(msg.bucket).toBe('week');
      expect(msg.format).toBe('apexcharts');
      return { series: [{ name: 'weight', data: [{ x: 1000, y: 95 }, { x: 2000, y: 94 }] }] };
    });
    const source = new CustomMetricsDataSource(hass, { recordType: 'weight', valueField: 'weight' });

    const points = await source.fetchPoints(resolvePeriod('1y', new Date('2024-06-15T00:00:00Z')));

    expect(points).toEqual([
      { x: 1000, y: 95 },
      { x: 2000, y: 94 },
    ]);
  });

  it('resolves the value field from the record type when not configured', async () => {
    const sent: any[] = [];
    const hass = mockHass((msg) => {
      sent.push(msg);
      if (msg.type === 'custom_metrics/list_record_types') {
        return {
          record_types: [
            {
              key: 'weight',
              name: 'Weight',
              fields: [
                { key: 'name', type: 'text' },
                { key: 'kg', type: 'number' },
              ],
            },
          ],
        };
      }
      return [];
    });
    const source = new CustomMetricsDataSource(hass, { recordType: 'weight' });

    await source.fetchPoints(resolvePeriod('7d'));

    // It should have asked for the record types to discover the numeric field...
    expect(sent.some((m) => m.type === 'custom_metrics/list_record_types')).toBe(true);
    // ...then fetched records for the resolved field without throwing.
    expect(sent.some((m) => m.type === 'custom_metrics/list_records')).toBe(true);
  });

  it('sends add_record with fields and an ISO timestamp', async () => {
    let captured: any;
    const hass = mockHass((msg) => {
      captured = msg;
      return {};
    });
    const source = new CustomMetricsDataSource(hass, { recordType: 'weight' });
    const ts = new Date('2024-06-15T08:30:00Z');

    await source.addRecord({ weight: 90 }, ts);

    expect(captured.type).toBe('custom_metrics/add_record');
    expect(captured.record_type).toBe('weight');
    expect(captured.fields).toEqual({ weight: 90 });
    expect(captured.timestamp).toBe(ts.toISOString());
  });

  it('throws a helpful error when no numeric field can be found', async () => {
    const hass = mockHass((msg) => {
      if (msg.type === 'custom_metrics/list_record_types') {
        return { record_types: [{ key: 'weight', fields: [{ key: 'note', type: 'text' }] }] };
      }
      return [];
    });
    const source = new CustomMetricsDataSource(hass, { recordType: 'weight' });

    await expect(source.fetchPoints(resolvePeriod('7d'))).rejects.toThrow(/value_field/);
  });
});
