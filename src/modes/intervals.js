import { secondsToMs, toInteger } from '../core/format.js';

export function normalizeIntervalConfig(config = {}) {
  return {
    intervalSeconds: toInteger(config.intervalSeconds, 60, 5, 3600),
    targetCycles: toInteger(config.targetCycles, 10, 0, 500),
  };
}

export function getIntervalMs(config) {
  return secondsToMs(normalizeIntervalConfig(config).intervalSeconds);
}

export function getIntervalDurationMs(config) {
  const normalized = normalizeIntervalConfig(config);

  if (normalized.targetCycles === 0) {
    return null;
  }

  return normalized.targetCycles * getIntervalMs(normalized);
}

export function getIntervalMetrics({ config, elapsedMs }) {
  const normalized = normalizeIntervalConfig(config);
  const intervalMs = getIntervalMs(normalized);
  const durationMs = getIntervalDurationMs(normalized);
  const completedCycles = Math.floor(elapsedMs / intervalMs);
  const isComplete = durationMs !== null && elapsedMs >= durationMs;
  const remainder = elapsedMs % intervalMs;
  const countdownMs = isComplete ? 0 : remainder === 0 ? intervalMs : intervalMs - remainder;
  const currentCycle =
    normalized.targetCycles > 0
      ? Math.min(normalized.targetCycles, completedCycles + 1)
      : completedCycles + 1;

  return {
    ...normalized,
    intervalMs,
    durationMs,
    completedCycles:
      normalized.targetCycles > 0 ? Math.min(completedCycles, normalized.targetCycles) : completedCycles,
    currentCycle,
    countdownMs,
    remainingCycles:
      normalized.targetCycles > 0 ? Math.max(0, normalized.targetCycles - completedCycles) : null,
    progress: durationMs === null ? 0 : Math.min(elapsedMs / durationMs, 1),
    isComplete,
  };
}
