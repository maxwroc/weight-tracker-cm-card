import { describe, expect, it } from 'vitest';
import { ConfigError, normalizeConfig } from '../src/config';

describe('normalizeConfig', () => {
  const base = { type: 'custom:weight-tracker-cm-card', record_type: 'weight' };

  it('applies defaults', () => {
    const c = normalizeConfig(base);
    expect(c.data_source).toBe('custom_metrics');
    expect(c.unit).toBe('kg');
    expect(c.default_period).toBe('1m');
    expect(c.show_gauge).toBe(true);
    expect(c.show_stats).toBe(true);
    expect(c.show_graph).toBe(true);
    expect(c.show_add_record).toBe(true);
  });

  it('preserves explicit values', () => {
    const c = normalizeConfig({
      ...base,
      unit: 'lb',
      default_period: '1y',
      show_gauge: false,
      target: 80,
    });
    expect(c.unit).toBe('lb');
    expect(c.default_period).toBe('1y');
    expect(c.show_gauge).toBe(false);
    expect(c.target).toBe(80);
  });

  it('requires record_type', () => {
    expect(() => normalizeConfig({ type: 'x' })).toThrow(ConfigError);
  });

  it('rejects unsupported data sources', () => {
    expect(() => normalizeConfig({ ...base, data_source: 'entity' as never })).toThrow(ConfigError);
  });

  it('rejects invalid default_period', () => {
    expect(() => normalizeConfig({ ...base, default_period: '2w' as never })).toThrow(ConfigError);
  });

  it('throws on missing config', () => {
    expect(() => normalizeConfig(undefined as never)).toThrow(ConfigError);
  });
});
