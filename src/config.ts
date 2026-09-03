import type { Period, ResolvedConfig, WeightTrackerCardConfig } from './types';
import { PERIODS } from './types';

export class ConfigError extends Error {}

/**
 * Fill in defaults and validate a raw card config. Throws {@link ConfigError}
 * for problems worth surfacing to the user in the card UI.
 */
export function normalizeConfig(config: WeightTrackerCardConfig): ResolvedConfig {
  if (!config) {
    throw new ConfigError('Missing configuration');
  }

  const dataSource = config.data_source ?? 'custom_metrics';
  if (dataSource !== 'custom_metrics') {
    throw new ConfigError(
      `Unsupported data_source "${dataSource}". Only "custom_metrics" is supported for now.`,
    );
  }

  if (!config.record_type) {
    throw new ConfigError('You must set "record_type" (the Custom Metrics record type key).');
  }

  const period = config.default_period;
  if (period !== undefined && !PERIODS.includes(period)) {
    throw new ConfigError(`Invalid default_period "${period}". Use one of: ${PERIODS.join(', ')}.`);
  }

  return {
    ...config,
    data_source: dataSource,
    unit: config.unit ?? 'kg',
    default_period: (period ?? '1m') as Period,
    show_gauge: config.show_gauge ?? true,
    show_stats: config.show_stats ?? true,
    show_graph: config.show_graph ?? true,
    show_add_record: config.show_add_record ?? true,
  };
}
