import { describe, expect, it } from 'vitest';
import { computeChartLayout, type ChartPadding } from '../src/logic/chart-geometry';

const padding: ChartPadding = { top: 10, right: 10, bottom: 20, left: 30 };

describe('computeChartLayout', () => {
  it('flags empty data', () => {
    const layout = computeChartLayout({ points: [], width: 400, height: 200, padding });
    expect(layout.hasData).toBe(false);
    expect(layout.points).toHaveLength(0);
    expect(layout.polyline).toBe('');
  });

  it('scales points within the padded plot area', () => {
    const layout = computeChartLayout({
      points: [
        { x: 0, y: 100 },
        { x: 100, y: 90 },
      ],
      width: 400,
      height: 200,
      padding,
    });

    expect(layout.hasData).toBe(true);
    expect(layout.points).toHaveLength(2);
    // First point at the left edge of the plot, last at the right edge.
    expect(layout.points[0].x).toBeCloseTo(padding.left);
    expect(layout.points[1].x).toBeCloseTo(400 - padding.right);
    // Higher value should sit higher on screen (smaller y).
    expect(layout.points[0].y).toBeLessThan(layout.points[1].y);
  });

  it('includes the target within the value range and returns its pixel Y', () => {
    const layout = computeChartLayout({
      points: [
        { x: 0, y: 95 },
        { x: 1, y: 94 },
      ],
      target: 86,
      width: 400,
      height: 200,
      padding,
    });
    expect(layout.targetY).toBeDefined();
    // Target below the data => rendered lower (greater y) than the points.
    expect(layout.targetY!).toBeGreaterThan(layout.points[0].y);
  });

  it('centres a single point horizontally', () => {
    const layout = computeChartLayout({
      points: [{ x: 42, y: 90 }],
      width: 400,
      height: 200,
      padding,
    });
    const plotW = 400 - padding.left - padding.right;
    expect(layout.points[0].x).toBeCloseTo(padding.left + plotW / 2);
  });

  it('produces the requested number of y ticks', () => {
    const layout = computeChartLayout({
      points: [
        { x: 0, y: 90 },
        { x: 1, y: 100 },
      ],
      width: 400,
      height: 200,
      padding,
      tickCount: 5,
    });
    expect(layout.yTicks).toHaveLength(5);
  });
});
