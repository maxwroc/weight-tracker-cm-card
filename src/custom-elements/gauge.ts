import { LitElement, css, html, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { progressPath, trackPath } from '../logic/gauge-geometry';

const SIZE = 200;
const STROKE = 18;
const CENTER = SIZE / 2;
const RADIUS = CENTER - STROKE / 2 - 2;

/**
 * Themeable ~270° SVG gauge showing progress toward the target. The big number
 * is the remaining distance to the goal; the coloured arc shows how far along
 * the way the current weight is.
 */
@customElement('weight-tracker-cm-gauge')
export class WeightTrackerGauge extends LitElement {
  @property({ type: Number }) public value?: number;
  @property({ type: Number }) public progress = 0;
  @property({ type: String }) public unit = 'kg';
  @property({ type: String }) public label = 'REMAIN';

  static styles = css`
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      max-width: 220px;
      margin: 0 auto;
      display: block;
    }
    .track {
      fill: none;
      stroke: var(--wtc-gauge-track, var(--divider-color, #e0e0e0));
      stroke-linecap: round;
    }
    .progress {
      fill: none;
      stroke: var(--wtc-gauge-progress, var(--primary-color, #03a9f4));
      stroke-linecap: round;
      transition: stroke-dasharray 0.3s ease;
    }
    .value {
      fill: var(--primary-text-color, #212121);
      font-size: 42px;
      font-weight: 500;
      text-anchor: middle;
      dominant-baseline: central;
    }
    .unit {
      fill: var(--secondary-text-color, #727272);
      font-size: 18px;
    }
    .label {
      fill: var(--secondary-text-color, #727272);
      font-size: 13px;
      letter-spacing: 1px;
      text-anchor: middle;
    }
  `;

  render() {
    const display =
      this.value === undefined ? '—' : Math.abs(this.value).toLocaleString(undefined, {
        maximumFractionDigits: 1,
      });
    const progress = progressPath(CENTER, CENTER, RADIUS, this.progress);

    return html`
      <svg viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${this.label} ${display} ${this.unit}">
        <path class="track" style="stroke-width:${STROKE}" d="${trackPath(CENTER, CENTER, RADIUS)}" />
        ${progress
          ? svg`<path class="progress" style="stroke-width:${STROKE}" d="${progress}" />`
          : nothing}
        <text class="value" x="${CENTER}" y="${CENTER - 6}">
          ${display}<tspan class="unit"> ${this.unit}</tspan>
        </text>
        <text class="label" x="${CENTER}" y="${CENTER + 30}">${this.label}</text>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weight-tracker-cm-gauge': WeightTrackerGauge;
  }
}
