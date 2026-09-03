export interface Point {
  x: number;
  y: number;
}

/** Angle (degrees) of the gauge's open gap, centred at the bottom. */
export const GAUGE_GAP_DEGREES = 90;
/** Total swept angle of the gauge arc. */
export const GAUGE_SWEEP_DEGREES = 360 - GAUGE_GAP_DEGREES;
/** Where the arc starts (bottom-left), measured clockwise from the top. */
export const GAUGE_START_ANGLE = 180 + GAUGE_GAP_DEGREES / 2;

/**
 * Convert a polar angle to cartesian coordinates using a convention where
 * `0` points up and angles increase clockwise (matching SVG's y-down axis).
 */
export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
}

/**
 * Build an SVG arc path string sweeping clockwise from `startAngle` to
 * `endAngle` (both in the {@link polarToCartesian} convention).
 */
export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/** Full background track path (the whole 270° arc). */
export function trackPath(cx: number, cy: number, r: number): string {
  return describeArc(cx, cy, r, GAUGE_START_ANGLE, GAUGE_START_ANGLE + GAUGE_SWEEP_DEGREES);
}

/**
 * Progress path covering `progress` (0..1) of the arc, starting from the same
 * point as the track. Returns an empty string for non-positive progress.
 */
export function progressPath(cx: number, cy: number, r: number, progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped <= 0) {
    return '';
  }
  return describeArc(
    cx,
    cy,
    r,
    GAUGE_START_ANGLE,
    GAUGE_START_ANGLE + GAUGE_SWEEP_DEGREES * clamped,
  );
}
