export const COUNTER_MODES = ['manual', 'automatic'];

export function normalizeCounterMode(value) {
  return value === 'automatic' ? 'automatic' : 'manual';
}
