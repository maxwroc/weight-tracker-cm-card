import type { WeightPoint } from '../types';

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartTick {
  value: number;
  y: number;
}

export interface ChartLayout {
  width: number;
  height: number;
  /** Scaled points in pixel space. */
  points: { x: number; y: number; value: number; time: number }[];
  /** `points` joined for an SVG polyline `points` attribute. */
  polyline: string;
  /** Pixel Y of the target line, or undefined when no target/out of range. */
  targetY?: number;
  yTicks: ChartTick[];
  hasData: boolean;
}

export interface ChartInput {
  points: WeightPoint[];
  target?: number;
  width: number;
  height: number;
  padding: ChartPadding;
  tickCount?: number;
}

function niceRange(min: number, max: number): [number, number] {
  if (min === max) {
    // Flat data: pad by ~1 unit so the line sits mid-chart.
    return [min - 1, max + 1];
  }
  const pad = (max - min) * 0.1;
  return [min - pad, max + pad];
}

/**
 * Compute the pixel-space layout for the weight line chart. Pure so the scaling
 * math can be unit tested without a DOM.
 */
export function computeChartLayout({
  points,
  target,
  width,
  height,
  padding,
  tickCount = 4,
}: ChartInput): ChartLayout {
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  if (points.length === 0) {
    return { width, height, points: [], polyline: '', yTicks: [], hasData: false };
  }

  const times = points.map((p) => p.x);
  const values = points.map((p) => p.y);
  let dataMin = Math.min(...values);
  let dataMax = Math.max(...values);
  if (target !== undefined) {
    dataMin = Math.min(dataMin, target);
    dataMax = Math.max(dataMax, target);
  }
  const [yMin, yMax] = niceRange(dataMin, dataMax);

  const xMin = Math.min(...times);
  const xMax = Math.max(...times);
  const xSpan = xMax - xMin || 1;
  const ySpan = yMax - yMin || 1;

  const sx = (x: number) =>
    xMax === xMin ? padding.left + plotW / 2 : padding.left + ((x - xMin) / xSpan) * plotW;
  const sy = (y: number) => padding.top + ((yMax - y) / ySpan) * plotH;

  const scaled = points.map((p) => ({ x: sx(p.x), y: sy(p.y), value: p.y, time: p.x }));
  const polyline = scaled.map((p) => `${p.x},${p.y}`).join(' ');

  const yTicks: ChartTick[] = [];
  for (let i = 0; i < tickCount; i++) {
    const value = yMin + (ySpan * i) / (tickCount - 1);
    yTicks.push({ value, y: sy(value) });
  }

  const targetY =
    target !== undefined && target >= yMin && target <= yMax ? sy(target) : undefined;

  return { width, height, points: scaled, polyline, targetY, yTicks, hasData: true };
}
