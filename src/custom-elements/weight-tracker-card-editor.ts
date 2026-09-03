import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CARD_EDITOR_NAME } from '../const';
import type { HomeAssistant, LovelaceCardEditor, WeightTrackerCardConfig } from '../types';

/** Schema fed to HA's `ha-form`. */
const SCHEMA = [
  { name: 'title', selector: { text: {} } },
  { name: 'record_type', required: true, selector: { text: {} } },
  { name: 'value_field', selector: { text: {} } },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'target', selector: { number: { mode: 'box', step: 0.1 } } },
      { name: 'start_weight', selector: { number: { mode: 'box', step: 0.1 } } },
      { name: 'unit', selector: { text: {} } },
      {
        name: 'default_period',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: '7d', label: '7 days' },
              { value: '1m', label: '1 month' },
              { value: '6m', label: '6 months' },
              { value: '1y', label: '1 year' },
            ],
          },
        },
      },
    ],
  },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'show_gauge', selector: { boolean: {} } },
      { name: 'show_stats', selector: { boolean: {} } },
      { name: 'show_graph', selector: { boolean: {} } },
      { name: 'show_add_record', selector: { boolean: {} } },
    ],
  },
] as const;

const LABELS: Record<string, string> = {
  title: 'Title',
  record_type: 'Record type (required)',
  value_field: 'Value field (optional)',
  target: 'Target weight',
  start_weight: 'Starting weight (optional)',
  unit: 'Unit',
  default_period: 'Default period',
  show_gauge: 'Show gauge',
  show_stats: 'Show stats',
  show_graph: 'Show graph',
  show_add_record: 'Show add button',
};

@customElement(CARD_EDITOR_NAME)
export class WeightTrackerCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config: WeightTrackerCardConfig = { type: '' };

  public setConfig(config: WeightTrackerCardConfig): void {
    this.config = config;
  }

  private computeLabel = (schema: { name: string }) => LABELS[schema.name] ?? schema.name;

  private onValueChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    const config = ev.detail.value as WeightTrackerCardConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  };

  render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
      <p class="hint">
        This card currently reads from the <b>Custom Metrics</b> integration. Filters and colour
        overrides can be set in YAML.
      </p>
    `;
  }

  static styles = css`
    .hint {
      color: var(--secondary-text-color, #727272);
      font-size: 0.85rem;
      margin: 12px 4px 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_EDITOR_NAME]: WeightTrackerCardEditor;
  }
}
