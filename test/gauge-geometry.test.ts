import { describe, expect, it } from 'vitest';
import {
  GAUGE_START_ANGLE,
  GAUGE_SWEEP_DEGREES,
  polarToCartesian,
  progressPath,
  trackPath,
} from '../src/logic/gauge-geometry';

describe('gauge geometry', () => {
  it('leaves a gap centred at the bottom', () => {
    // 270 sweep, 90 gap => arc runs from 225 to 495 (=135).
    expect(GAUGE_SWEEP_DEGREES).toBe(270);
    expect(GAUGE_START_ANGLE).toBe(225);
  });

  it('places angle 0 at the top and 180 at the bottom', () => {
    const top = polarToCartesian(100, 100, 50, 0);
    expect(top.x).toBeCloseTo(100);
    expect(top.y).toBeCloseTo(50);

    const bottom = polarToCartesian(100, 100, 50, 180);
    expect(bottom.x).toBeCloseTo(100);
    expect(bottom.y).toBeCloseTo(150);
  });

  it('builds a track path using the large-arc flag', () => {
    const path = trackPath(100, 100, 50);
    expect(path).toMatch(/^M /);
    // 270 degrees is > 180, so large-arc flag must be 1.
    expect(path).toContain('A 50 50 0 1 1');
  });

  it('returns no progress path for zero/negative progress', () => {
    expect(progressPath(100, 100, 50, 0)).toBe('');
    expect(progressPath(100, 100, 50, -0.5)).toBe('');
  });

  it('uses a small-arc flag for progress under half the sweep', () => {
    // 0.3 * 270 = 81 degrees (< 180) => large-arc flag 0.
    const path = progressPath(100, 100, 50, 0.3);
    expect(path).toContain('A 50 50 0 0 1');
  });

  it('clamps progress above 1 to a full arc', () => {
    expect(progressPath(100, 100, 50, 2)).toBe(trackPath(100, 100, 50));
  });
});
