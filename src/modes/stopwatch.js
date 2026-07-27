export function getStopwatchMetrics({ elapsedMs, completedEvents }) {
  return {
    elapsedMs,
    completedEvents,
    isComplete: false,
  };
}
