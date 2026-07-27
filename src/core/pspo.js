export const PSPO_CONFIG = {
  totalQuestions: 80,
  intervalMs: 45_000,
  durationMs: 80 * 45_000,
};

export function getPspoCountForElapsed({
  elapsedMs,
  lastIncrementAtMs,
  currentCount,
  intervalMs,
  totalQuestions,
}) {
  const baseIncrementAtMs = Number.isFinite(lastIncrementAtMs) ? lastIncrementAtMs : 0;
  const pendingIncrements = Math.max(0, Math.floor((elapsedMs - baseIncrementAtMs) / intervalMs));

  if (pendingIncrements <= 0) {
    return {
      count: currentCount,
      lastIncrementAtMs: baseIncrementAtMs,
    };
  }

  return {
    count: Math.min(totalQuestions, currentCount + pendingIncrements),
    lastIncrementAtMs: baseIncrementAtMs + pendingIncrements * intervalMs,
  };
}
