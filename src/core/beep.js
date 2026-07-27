let audioContext = null;

export async function primeAudio() {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    await context.resume();
  }
}

export async function playBeep({ enabled = true, frequency = 880, volume = 0.6, durationMs = 120 } = {}) {
  if (!enabled) {
    return;
  }

  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    await context.resume();
  }

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const safeVolume = Math.min(Math.max(volume, 0), 1);
  const safeFrequency = Math.min(Math.max(frequency, 120), 2200);
  const durationSeconds = Math.min(Math.max(durationMs, 40), 800) / 1000;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(safeFrequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, safeVolume), now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + durationSeconds + 0.02);
}

export function triggerVibration(enabled = true, pattern = [80]) {
  if (enabled && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

export function flashScreen(enabled = true) {
  if (!enabled) {
    return;
  }

  document.documentElement.classList.remove('screen-flash');
  window.requestAnimationFrame(() => {
    document.documentElement.classList.add('screen-flash');
    window.setTimeout(() => document.documentElement.classList.remove('screen-flash'), 240);
  });
}

function getAudioContext() {
  if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
    return null;
  }

  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextConstructor();
  }

  return audioContext;
}
