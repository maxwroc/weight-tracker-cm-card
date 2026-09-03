import type { WeightPoint } from '../types';

export interface WeightStats {
  /** Starting weight (config override or earliest fetched point). */
  start?: number;
  /** Most recent weight. */
  current?: number;
  /** Target/goal weight. */
  target?: number;
  /** Remaining distance to target: `current - target` (may be negative). */
  remaining?: number;
  /**
   * Progress toward target in the range 0..1:
   * `(start - current) / (start - target)`, clamped. `undefined` when it can't
   * be computed (missing inputs or start === target).
   */
  progress?: number;
}

export interface StatsInput {
  points: WeightPoint[];
  target?: number;
  /** Explicit starting weight; overrides the earliest point when provided. */
  startWeight?: number;
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/**
 * Derive the numbers shown in the gauge and stats block. Pure and side-effect
 * free so it is straightforward to unit test.
 */
export function computeStats({ points, target, startWeight }: StatsInput): WeightStats {
  const ascending = [...points].sort((a, b) => a.x - b.x);
  const earliest = ascending[0]?.y;
  const current = ascending[ascending.length - 1]?.y;
  const start = startWeight ?? earliest;

  const stats: WeightStats = { start, current, target };

  if (current !== undefined && target !== undefined) {
    stats.remaining = current - target;
  }

  if (start !== undefined && current !== undefined && target !== undefined && start !== target) {
    stats.progress = clamp01((start - current) / (start - target));
  }

  return stats;
}
