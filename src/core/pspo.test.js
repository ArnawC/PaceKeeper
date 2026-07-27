import test from 'node:test';
import assert from 'node:assert/strict';
import { getPspoCountForElapsed, PSPO_CONFIG } from './pspo.js';

test('advances based on time since the last increment, not the session start', () => {
  const nextCount = getPspoCountForElapsed({
    elapsedMs: 55_000,
    lastIncrementAtMs: 10_000,
    currentCount: 2,
    intervalMs: PSPO_CONFIG.intervalMs,
    totalQuestions: PSPO_CONFIG.totalQuestions,
  });

  assert.equal(nextCount, 3);
});

test('keeps the first automatic increment at 45 seconds from the start', () => {
  const nextCount = getPspoCountForElapsed({
    elapsedMs: 45_000,
    lastIncrementAtMs: 0,
    currentCount: 1,
    intervalMs: PSPO_CONFIG.intervalMs,
    totalQuestions: PSPO_CONFIG.totalQuestions,
  });

  assert.equal(nextCount, 2);
});
