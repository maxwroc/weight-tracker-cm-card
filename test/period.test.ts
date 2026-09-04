import { describe, expect, it } from 'vitest';
import { resolveEffectivePeriod, resolvePeriod } from '../src/logic/period';

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

describe('resolveEffectivePeriod', () => {
  it('falls all the way back to 7d when only 2 days of data exist and 1y is selected', () => {
    expect(resolveEffectivePeriod('1y', 2)).toBe('7d');
  });

  it('falls back to 7d when data spans 14 days and 1m is selected', () => {
    expect(resolveEffectivePeriod('1m', 14)).toBe('7d');
  });

  it('uses the selected period as-is when data spans 40 days and 1m is selected', () => {
    expect(resolveEffectivePeriod('1m', 40)).toBe('1m');
  });

  it('does not fall back below the selected period', () => {
    expect(resolveEffectivePeriod('7d', 1)).toBe('7d');
  });

  it('stops at the first intermediate tier whose window is met, not necessarily 7d', () => {
    // 100 days of data doesn't fill 6m's 182-day window, but does fill 1m's
    // 30-day window, so it should land on 1m rather than skipping to 7d.
    expect(resolveEffectivePeriod('6m', 100)).toBe('1m');
  });

  it('treats data spanning exactly the selected window as sufficient', () => {
    expect(resolveEffectivePeriod('1m', 30)).toBe('1m');
  });

  it('returns the selected period unchanged when data age is unknown', () => {
    expect(resolveEffectivePeriod('1y', undefined)).toBe('1y');
  });
});
