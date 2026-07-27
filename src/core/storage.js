const STORAGE_KEY = 'pacekeeper:state:v1';

export const DEFAULT_SETTINGS = {
  theme: 'system',
  sound: true,
  volume: 0.65,
  beepFrequency: 880,
  vibration: true,
  flash: true,
  keepAwake: false,
  keyboardShortcuts: true,
  language: 'es',
};

export const DEFAULT_CONFIGS = {
  exam: {
    totalQuestions: 80,
    durationMinutes: 60,
  },
  emom: {
    rounds: 20,
    intervalSeconds: 60,
  },
  intervals: {
    intervalSeconds: 60,
    targetCycles: 10,
  },
  stopwatch: {},
};

export const DEFAULT_PROFILES = [
  {
    id: 'pspo-i',
    name: 'PSPO I',
    mode: 'exam',
    config: { totalQuestions: 80, durationMinutes: 60 },
  },
  {
    id: 'psm-i',
    name: 'PSM I',
    mode: 'exam',
    config: { totalQuestions: 80, durationMinutes: 60 },
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    mode: 'intervals',
    config: { intervalSeconds: 1500, targetCycles: 1 },
  },
  {
    id: 'emom-20',
    name: 'EMOM',
    mode: 'emom',
    config: { rounds: 20, intervalSeconds: 60 },
  },
];

export function loadAppState() {
  if (!canUseStorage()) {
    return getDefaultState();
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return getDefaultState();
    }

    return mergeState(JSON.parse(rawState));
  } catch {
    return getDefaultState();
  }
}

export function saveAppState(state) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeState(state)));
}

export function getDefaultState() {
  return {
    settings: { ...DEFAULT_SETTINGS },
    configs: structuredCloneSafe(DEFAULT_CONFIGS),
    profiles: structuredCloneSafe(DEFAULT_PROFILES),
    lastMode: null,
  };
}

function mergeState(state = {}) {
  return {
    settings: {
      ...DEFAULT_SETTINGS,
      ...(state.settings ?? {}),
    },
    configs: {
      exam: {
        ...DEFAULT_CONFIGS.exam,
        ...(state.configs?.exam ?? {}),
      },
      emom: {
        ...DEFAULT_CONFIGS.emom,
        ...(state.configs?.emom ?? {}),
      },
      intervals: {
        ...DEFAULT_CONFIGS.intervals,
        ...(state.configs?.intervals ?? {}),
      },
      stopwatch: {},
    },
    profiles: Array.isArray(state.profiles) && state.profiles.length > 0
      ? state.profiles
      : structuredCloneSafe(DEFAULT_PROFILES),
    lastMode: state.lastMode ?? null,
  };
}

function structuredCloneSafe(value) {
  if ('structuredClone' in window) {
    return window.structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

function canUseStorage() {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window;
  } catch {
    return false;
  }
}
