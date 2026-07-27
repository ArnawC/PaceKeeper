import { clamp, minutesToMs, toInteger } from '../core/format.js';

export function normalizeExamConfig(config = {}) {
  return {
    totalQuestions: toInteger(config.totalQuestions, 80, 1, 500),
    durationMinutes: toInteger(config.durationMinutes, 60, 1, 600),
  };
}

export function getExamDurationMs(config) {
  return minutesToMs(normalizeExamConfig(config).durationMinutes);
}

export function getExamIntervalMs(config) {
  const normalized = normalizeExamConfig(config);
  return getExamDurationMs(normalized) / normalized.totalQuestions;
}

export function getExamMetrics({ config, elapsedMs, completedEvents }) {
  const normalized = normalizeExamConfig(config);
  const durationMs = getExamDurationMs(normalized);
  const intervalMs = getExamIntervalMs(normalized);
  const actualCompleted = clamp(completedEvents, 0, normalized.totalQuestions);
  const expectedCompleted = clamp(Math.floor(elapsedMs / intervalMs), 0, normalized.totalQuestions);
  const isComplete = elapsedMs >= durationMs || actualCompleted >= normalized.totalQuestions;
  const currentQuestion =
    actualCompleted >= normalized.totalQuestions ? normalized.totalQuestions : actualCompleted + 1;
  const expectedQuestion =
    expectedCompleted >= normalized.totalQuestions ? normalized.totalQuestions : expectedCompleted + 1;
  const remainingQuestions = Math.max(0, normalized.totalQuestions - actualCompleted);
  const remainingMs = Math.max(0, durationMs - elapsedMs);
  const averageMsPerQuestion = actualCompleted > 0 ? elapsedMs / actualCompleted : null;
  const estimatedTotalMs =
    averageMsPerQuestion === null ? null : averageMsPerQuestion * normalized.totalQuestions;
  const estimatedFinishTimestamp =
    estimatedTotalMs === null ? null : Date.now() + Math.max(0, estimatedTotalMs - elapsedMs);
  const timeBankMs = actualCompleted * intervalMs - elapsedMs;

  return {
    ...normalized,
    durationMs,
    intervalMs,
    actualCompleted,
    expectedCompleted,
    currentQuestion,
    expectedQuestion,
    difference: actualCompleted - expectedCompleted,
    remainingQuestions,
    remainingMs,
    estimatedFinishTimestamp,
    timeBankMs,
    actualProgress: actualCompleted / normalized.totalQuestions,
    scheduleProgress: Math.min(elapsedMs / durationMs, 1),
    isComplete,
  };
}
