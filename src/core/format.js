export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function toInteger(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return clamp(parsed, min, max);
}

export function toFloat(value, fallback, min, max) {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return clamp(parsed, min, max);
}

export function secondsToMs(seconds) {
  return Math.round(seconds * 1000);
}

export function minutesToMs(minutes) {
  return Math.round(minutes * 60 * 1000);
}

export function formatClock(ms) {
  const safeMs = Math.max(0, Math.round(ms));
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatPreciseClock(ms) {
  const safeMs = Math.max(0, Math.round(ms));
  const totalSeconds = Math.floor(safeMs / 1000);
  const tenths = Math.floor((safeMs % 1000) / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

export function formatDeltaMs(ms) {
  const sign = ms > 0 ? '+' : ms < 0 ? '-' : '';
  return `${sign}${formatClock(Math.abs(ms))}`;
}

export function formatDeltaNumber(value) {
  return value > 0 ? `+${value}` : String(value);
}

export function formatTimeOfDay(timestamp) {
  if (!timestamp) {
    return '--:--';
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function percent(value) {
  return `${Math.round(clamp(value, 0, 1) * 100)}%`;
}
