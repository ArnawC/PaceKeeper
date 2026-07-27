import { clamp, secondsToMs, toInteger } from '../core/format.js';

export function normalizeEmomConfig(config = {}) {
  return {
    rounds: toInteger(config.rounds, 20, 1, 300),
    intervalSeconds: toInteger(config.intervalSeconds, 60, 5, 3600),
  };
}

export function getEmomIntervalMs(config) {
  return secondsToMs(normalizeEmomConfig(config).intervalSeconds);
}

export function getEmomDurationMs(config) {
  const normalized = normalizeEmomConfig(config);
  return normalized.rounds * getEmomIntervalMs(normalized);
}

export function getEmomMetrics({ config, elapsedMs }) {
  const normalized = normalizeEmomConfig(config);
  const intervalMs = getEmomIntervalMs(normalized);
  const durationMs = getEmomDurationMs(normalized);
  const completedRounds = clamp(Math.floor(elapsedMs / intervalMs), 0, normalized.rounds);
  const isComplete = elapsedMs >= durationMs;
  const currentRound = isComplete ? normalized.rounds : completedRounds + 1;
  const remainder = elapsedMs % intervalMs;
  const countdownMs = isComplete ? 0 : remainder === 0 ? intervalMs : intervalMs - remainder;

  return {
    ...normalized,
    intervalMs,
    durationMs,
    completedRounds,
    currentRound,
    countdownMs,
    remainingRounds: Math.max(0, normalized.rounds - completedRounds),
    progress: Math.min(elapsedMs / durationMs, 1),
    isComplete,
  };
}
