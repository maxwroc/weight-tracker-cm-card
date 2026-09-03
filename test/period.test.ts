import { describe, expect, it } from 'vitest';
import { resolvePeriod } from '../src/logic/period';

describe('resolvePeriod', () => {
  const now = new Date('2024-06-15T12:00:00.000Z');

  it('uses raw records for the 7 day view', () => {
    const range = resolvePeriod('7d', now);
    expect(range.bucket).toBe('raw');
    expect(range.end).toBe(now);
    const days = (now.getTime() - range.start.getTime()) / (24 * 60 * 60 * 1000);
    expect(days).toBeCloseTo(7);
  });

  it('uses daily buckets for 1 month', () => {
    const range = resolvePeriod('1m', now);
    expect(range.bucket).toBe('day');
    const days = (now.getTime() - range.start.getTime()) / (24 * 60 * 60 * 1000);
    expect(days).toBeCloseTo(30);
  });

  it('uses weekly buckets for 6 months and 1 year', () => {
    expect(resolvePeriod('6m', now).bucket).toBe('week');
    expect(resolvePeriod('1y', now).bucket).toBe('week');

    const oneYear = resolvePeriod('1y', now);
    const days = (now.getTime() - oneYear.start.getTime()) / (24 * 60 * 60 * 1000);
    expect(days).toBeCloseTo(365);
  });

  it('is deterministic for a given now', () => {
    const a = resolvePeriod('1m', now);
    const b = resolvePeriod('1m', now);
    expect(a.start.getTime()).toBe(b.start.getTime());
  });
});
