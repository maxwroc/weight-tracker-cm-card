import { describe, expect, it } from 'vitest';
import { computeStats } from '../src/logic/stats';
import type { WeightPoint } from '../src/types';

const points: WeightPoint[] = [
  { x: 1000, y: 104.6 },
  { x: 2000, y: 99 },
  { x: 3000, y: 93.8 },
];

describe('computeStats', () => {
  it('derives start (earliest), current (latest) and remaining', () => {
    const stats = computeStats({ points, target: 86 });
    expect(stats.start).toBe(104.6);
    expect(stats.current).toBe(93.8);
    expect(stats.target).toBe(86);
    expect(stats.remaining).toBeCloseTo(7.8);
  });

  it('computes progress toward the target', () => {
    const stats = computeStats({ points, target: 86 });
    // (104.6 - 93.8) / (104.6 - 86) = 10.8 / 18.6
    expect(stats.progress).toBeCloseTo(10.8 / 18.6);
  });

  it('honours an explicit start weight override', () => {
    const stats = computeStats({ points, target: 86, startWeight: 110 });
    expect(stats.start).toBe(110);
    expect(stats.progress).toBeCloseTo((110 - 93.8) / (110 - 86));
  });

  it('clamps progress to the 0..1 range', () => {
    // Already past the goal -> clamps at 1.
    const past = computeStats({ points: [{ x: 1, y: 100 }, { x: 2, y: 80 }], target: 85 });
    expect(past.progress).toBe(1);
    // Moved the wrong way -> clamps at 0.
    const wrong = computeStats({ points: [{ x: 1, y: 100 }, { x: 2, y: 105 }], target: 90 });
    expect(wrong.progress).toBe(0);
  });

  it('is unsorted-input tolerant', () => {
    const shuffled = [points[2], points[0], points[1]];
    const stats = computeStats({ points: shuffled, target: 86 });
    expect(stats.start).toBe(104.6);
    expect(stats.current).toBe(93.8);
  });

  it('returns undefined progress when start equals target', () => {
    const stats = computeStats({ points: [{ x: 1, y: 86 }], target: 86, startWeight: 86 });
    expect(stats.progress).toBeUndefined();
  });

  it('handles missing target gracefully', () => {
    const stats = computeStats({ points });
    expect(stats.remaining).toBeUndefined();
    expect(stats.progress).toBeUndefined();
    expect(stats.current).toBe(93.8);
  });

  it('handles empty input', () => {
    const stats = computeStats({ points: [], target: 86 });
    expect(stats.start).toBeUndefined();
    expect(stats.current).toBeUndefined();
  });
});
