export function createTouchClickGuard() {
  let lastPointerDownAt = 0;
  let suppressUntil = 0;

  return {
    markPointerDown(timestamp = Date.now()) {
      lastPointerDownAt = timestamp;
      suppressUntil = timestamp + 250;
    },
    shouldIgnoreClick(timestamp = Date.now()) {
      if (timestamp <= suppressUntil) {
        return true;
      }

      return false;
    },
  };
}
