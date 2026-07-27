const DEFAULT_TICK_MS = 100;

export class Timer {
  constructor({ durationMs = null, tickMs = DEFAULT_TICK_MS, onTick = () => {}, onComplete = () => {} } = {}) {
    this.durationMs = normalizeDuration(durationMs);
    this.tickMs = tickMs;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.state = 'idle';
    this.elapsedBeforeStart = 0;
    this.startedAt = null;
    this.intervalId = null;
  }

  start() {
    if (this.state === 'running') {
      return this.getSnapshot();
    }

    this.clearInterval();
    this.elapsedBeforeStart = 0;
    this.startedAt = performance.now();
    this.state = 'running';
    this.schedule();
    this.emitTick();
    return this.getSnapshot();
  }

  pause() {
    if (this.state !== 'running') {
      return this.getSnapshot();
    }

    this.elapsedBeforeStart = this.getElapsedMs();
    this.startedAt = null;
    this.state = 'paused';
    this.clearInterval();
    this.emitTick();
    return this.getSnapshot();
  }

  resume() {
    if (this.state !== 'paused') {
      return this.getSnapshot();
    }

    this.startedAt = performance.now();
    this.state = 'running';
    this.schedule();
    this.emitTick();
    return this.getSnapshot();
  }

  reset({ emit = true } = {}) {
    this.clearInterval();
    this.elapsedBeforeStart = 0;
    this.startedAt = null;
    this.state = 'idle';

    if (emit) {
      this.emitTick();
    }

    return this.getSnapshot();
  }

  setDurationMs(durationMs) {
    this.durationMs = normalizeDuration(durationMs);
    return this.getSnapshot();
  }

  isRunning() {
    return this.state === 'running';
  }

  getElapsedMs() {
    const liveElapsed =
      this.state === 'running' && this.startedAt !== null
        ? performance.now() - this.startedAt
        : 0;

    const elapsed = this.elapsedBeforeStart + liveElapsed;

    if (this.durationMs === null) {
      return Math.max(0, elapsed);
    }

    return Math.min(Math.max(0, elapsed), this.durationMs);
  }

  getSnapshot() {
    const elapsedMs = this.getElapsedMs();
    const remainingMs =
      this.durationMs === null ? null : Math.max(0, this.durationMs - elapsedMs);

    return {
      durationMs: this.durationMs,
      elapsedMs,
      remainingMs,
      progress: this.durationMs === null ? 0 : elapsedMs / this.durationMs,
      state: this.state,
    };
  }

  schedule() {
    this.clearInterval();
    this.intervalId = window.setInterval(() => this.tick(), this.tickMs);
  }

  tick() {
    if (this.durationMs !== null && this.getElapsedMs() >= this.durationMs) {
      this.elapsedBeforeStart = this.durationMs;
      this.startedAt = null;
      this.state = 'complete';
      this.clearInterval();
      const snapshot = this.getSnapshot();
      this.onTick(snapshot);
      this.onComplete(snapshot);
      return;
    }

    this.emitTick();
  }

  emitTick() {
    this.onTick(this.getSnapshot());
  }

  clearInterval() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

function normalizeDuration(durationMs) {
  if (durationMs === null || durationMs === undefined) {
    return null;
  }

  const parsed = Number(durationMs);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
