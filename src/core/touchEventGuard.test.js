import test from 'node:test';
import assert from 'node:assert/strict';
import { createTouchClickGuard } from './touchEventGuard.js';

test('suppresses the next click after a touch pointerdown', () => {
  const guard = createTouchClickGuard();

  guard.markPointerDown(1000);
  assert.equal(guard.shouldIgnoreClick(1100), true);
  assert.equal(guard.shouldIgnoreClick(1300), false);
});

test('does not suppress clicks when no touch pointerdown was registered', () => {
  const guard = createTouchClickGuard();

  assert.equal(guard.shouldIgnoreClick(1000), false);
});
