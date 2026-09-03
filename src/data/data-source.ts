import type { PeriodRange } from '../logic/period';
import type { RecordType, WeightPoint } from '../types';

/**
 * Backend-agnostic contract the card renders against. A future
 * `EntityHistoryDataSource` (regular HA entity + recorder history) can
 * implement this without any change to the card or its child elements.
 */
export interface DataSource {
  /** Fetch weight points for a resolved period (ascending by time). */
  fetchPoints(range: PeriodRange): Promise<WeightPoint[]>;

  /** Add a new measurement. `fields` are backend field key/value pairs. */
  addRecord(fields: Record<string, unknown>, timestamp?: Date): Promise<void>;

  /** Describe the underlying record type (fields, etc.), when available. */
  getRecordType(): Promise<RecordType | undefined>;

  /**
   * Subscribe to backend-side data changes. Returns an unsubscribe function.
   * Implementations that can't observe changes may return a no-op.
   */
  subscribeUpdates(callback: () => void): Promise<() => void>;
}
