import type { Period } from '../types';

export type Bucket = 'raw' | 'day' | 'week' | 'month';

export interface PeriodRange {
  period: Period;
  /** Inclusive lower bound. */
  start: Date;
  /** Upper bound (now). */
  end: Date;
  /**
   * How to aggregate. `raw` means "return individual records"; otherwise the
   * value is a Custom Metrics aggregate bucket size.
   */
  bucket: Bucket;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const PERIOD_DAYS: Record<Period, number> = {
  '7d': 7,
  '1m': 30,
  '6m': 182,
  '1y': 365,
};

const PERIOD_BUCKET: Record<Period, Bucket> = {
  // Short range: show every measurement.
  '7d': 'raw',
  // A month of daily-ish records stays readable as raw daily points.
  '1m': 'day',
  // Longer ranges get progressively coarser buckets to keep the line clean.
  '6m': 'week',
  '1y': 'week',
};

/**
 * Resolve a period selection into a concrete date range and bucket strategy.
 * Pure and deterministic given `now` (injectable for tests).
 */
export function resolvePeriod(period: Period, now: Date = new Date()): PeriodRange {
  const days = PERIOD_DAYS[period];
  const end = now;
  const start = new Date(now.getTime() - days * DAY_MS);
  return { period, start, end, bucket: PERIOD_BUCKET[period] };
}
