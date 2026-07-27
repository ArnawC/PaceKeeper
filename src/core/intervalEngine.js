export class IntervalEngine {
  constructor({ intervalMs = 60_000, onInterval = () => {} } = {}) {
    this.intervalMs = normalizeInterval(intervalMs);
    this.onInterval = onInterval;
    this.lastIntervalIndex = 0;
  }

  setIntervalMs(intervalMs) {
    this.intervalMs = normalizeInterval(intervalMs);
  }

  reset(elapsedMs = 0) {
    this.lastIntervalIndex = this.getExpectedCount(elapsedMs);
  }

  update(elapsedMs) {
    const expectedCount = this.getExpectedCount(elapsedMs);

    if (!this.intervalMs) {
      return expectedCount;
    }

    for (let index = this.lastIntervalIndex + 1; index <= expectedCount; index += 1) {
      this.onInterval({
        index,
        intervalMs: this.intervalMs,
        scheduledAtMs: index * this.intervalMs,
        elapsedMs,
      });
    }

    this.lastIntervalIndex = Math.max(this.lastIntervalIndex, expectedCount);
    return expectedCount;
  }

  getExpectedCount(elapsedMs) {
    if (!this.intervalMs) {
      return 0;
    }

    return Math.max(0, Math.floor(Math.max(0, elapsedMs) / this.intervalMs));
  }

  getCountdownMs(elapsedMs) {
    if (!this.intervalMs) {
      return null;
    }

    const elapsed = Math.max(0, elapsedMs);
    const remainder = elapsed % this.intervalMs;
    return remainder === 0 ? this.intervalMs : this.intervalMs - remainder;
  }
}

function normalizeInterval(intervalMs) {
  const parsed = Number(intervalMs);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
