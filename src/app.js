import appIcon from './assets/pacekeeper-icon.svg';
import { Counter } from './components/Counter.js';
import { Controls } from './components/Controls.js';
import { ProgressBar } from './components/ProgressBar.js';
import { StatusGrid } from './components/StatusCard.js';
import { flashScreen, playBeep, primeAudio, triggerVibration } from './core/beep.js';
import {
  clamp,
  formatClock,
  formatDeltaMs,
  formatDeltaNumber,
  formatPreciseClock,
  formatTimeOfDay,
  percent,
} from './core/format.js';
import { IntervalEngine } from './core/intervalEngine.js';
import { loadAppState, saveAppState } from './core/storage.js';
import { Timer } from './core/timer.js';
import { getPspoCountForElapsed, PSPO_CONFIG } from './core/pspo.js';
import { COUNTER_MODES, normalizeCounterMode } from './core/counterMode.js';
import {
  getEmomDurationMs,
  getEmomIntervalMs,
  getEmomMetrics,
  normalizeEmomConfig,
} from './modes/emom.js';
import {
  getExamDurationMs,
  getExamIntervalMs,
  getExamMetrics,
  normalizeExamConfig,
} from './modes/exam.js';
import {
  getIntervalDurationMs,
  getIntervalMetrics,
  getIntervalMs,
  normalizeIntervalConfig,
} from './modes/intervals.js';
import { getStopwatchMetrics } from './modes/stopwatch.js';

const MODES = [
  { id: 'exam', short: 'EX', labelKey: 'exam', hintKey: 'examHint' },
  { id: 'emom', short: 'EM', labelKey: 'emom', hintKey: 'emomHint' },
  { id: 'intervals', short: 'IN', labelKey: 'intervals', hintKey: 'intervalsHint' },
  { id: 'stopwatch', short: 'SW', labelKey: 'stopwatch', hintKey: 'stopwatchHint' },
];

const PSPO_MODES = [
  { id: 'pspo-1', label: 'modo PSPO 1' },
  { id: 'pspo-1-edit', label: 'edit PSPO 1' },
];

const STRINGS = {
  en: {
    appSubtitle: 'Offline pace tracker',
    settings: 'Settings',
    close: 'Close',
    home: 'Home',
    manual: 'Manual',
    automatic: 'Automatic',
    counterMode: 'Counter mode',
    exam: 'Exam',
    emom: 'EMOM',
    intervals: 'Interval',
    stopwatch: 'Stopwatch',
    examHint: 'Questions and duration',
    emomHint: 'Rounds on a fixed clock',
    intervalsHint: 'Repeating timer',
    stopwatchHint: 'Simple elapsed time',
    configuration: 'Configuration',
    totalQuestions: 'Total questions',
    durationMinutes: 'Duration minutes',
    rounds: 'Rounds',
    intervalSeconds: 'Interval seconds',
    targetCycles: 'Target cycles',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    startAgain: 'Start again',
    timerControls: 'Timer controls',
    eventCounter: 'Event counter',
    progress: 'Progress',
    elapsed: 'Elapsed',
    remaining: 'Remaining',
    currentQuestion: 'Current question',
    expectedQuestion: 'Expected question',
    difference: 'Difference',
    remainingQuestions: 'Remaining questions',
    estimatedFinish: 'Estimated finish',
    timeBank: 'Time bank',
    currentRound: 'Current round',
    countdown: 'Countdown',
    remainingRounds: 'Remaining rounds',
    currentCycle: 'Current cycle',
    completedCycles: 'Completed cycles',
    remainingCycles: 'Remaining cycles',
    events: 'Events',
    profiles: 'Profiles',
    chooseProfile: 'Choose profile',
    profileName: 'Profile name',
    saveProfile: 'Save profile',
    theme: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    sound: 'Sound',
    volume: 'Volume',
    beepFrequency: 'Beep frequency',
    vibration: 'Vibration',
    flash: 'Flash screen',
    keepAwake: 'Keep screen awake',
    keyboardShortcuts: 'Keyboard shortcuts',
    language: 'Language',
    unlimited: 'Unlimited',
    noConfig: 'No configuration',
  },
  es: {
    appSubtitle: 'Ritmo offline',
    settings: 'Ajustes',
    close: 'Cerrar',
    home: 'Inicio',
    manual: 'Manual',
    automatic: 'Automático',
    counterMode: 'Modo de contador',
    exam: 'Examen',
    emom: 'EMOM',
    intervals: 'Intervalo',
    stopwatch: 'Cronómetro',
    examHint: 'Preguntas y duración',
    emomHint: 'Rondas con reloj fijo',
    intervalsHint: 'Temporizador repetido',
    stopwatchHint: 'Tiempo transcurrido',
    configuration: 'Configuración',
    totalQuestions: 'Preguntas totales',
    durationMinutes: 'Minutos',
    rounds: 'Rondas',
    intervalSeconds: 'Segundos por intervalo',
    targetCycles: 'Ciclos objetivo',
    start: 'Iniciar',
    pause: 'Pausar',
    resume: 'Reanudar',
    reset: 'Reiniciar',
    startAgain: 'Iniciar otra vez',
    timerControls: 'Controles del temporizador',
    eventCounter: 'Contador de eventos',
    progress: 'Progreso',
    elapsed: 'Transcurrido',
    remaining: 'Restante',
    currentQuestion: 'Pregunta actual',
    expectedQuestion: 'Pregunta esperada',
    difference: 'Diferencia',
    remainingQuestions: 'Preguntas restantes',
    estimatedFinish: 'Fin estimado',
    timeBank: 'Banco de tiempo',
    currentRound: 'Ronda actual',
    countdown: 'Cuenta atrás',
    remainingRounds: 'Rondas restantes',
    currentCycle: 'Ciclo actual',
    completedCycles: 'Ciclos completados',
    remainingCycles: 'Ciclos restantes',
    events: 'Eventos',
    profiles: 'Perfiles',
    chooseProfile: 'Elegir perfil',
    profileName: 'Nombre del perfil',
    saveProfile: 'Guardar perfil',
    theme: 'Tema',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    sound: 'Sonido',
    volume: 'Volumen',
    beepFrequency: 'Frecuencia',
    vibration: 'Vibración',
    flash: 'Flash de pantalla',
    keepAwake: 'Mantener pantalla activa',
    keyboardShortcuts: 'Atajos de teclado',
    language: 'Idioma',
    unlimited: 'Ilimitado',
    noConfig: 'Sin configuración',
  },
};

export function createApp(root) {
  return new PaceKeeperApp(root);
}

class PaceKeeperApp {
  constructor(root) {
    this.root = root;
    const savedState = loadAppState();
    const currentPath = window.location.pathname;
    const initialRouteMode = this.getModeFromPath(currentPath);
    const shouldUseSavedMode = currentPath !== '/home' && currentPath !== '/';
    const activeMode = this.isKnownMode(initialRouteMode)
      ? initialRouteMode
      : shouldUseSavedMode && this.isKnownMode(savedState.lastMode)
        ? savedState.lastMode
        : null;
    this.state = {
      ...savedState,
      activeMode,
      lastMode: activeMode,
      elapsedMs: 0,
      count: 0,
      pspoAutoIncrements: 0,
      pspoLastIncrementAtMs: 0,
      timerState: 'idle',
      settingsOpen: false,
      draftProfileName: '',
      selectedProfileId: savedState.selectedProfileId ?? '',
    };
    this.wakeLock = null;
    this.timer = new Timer({
      tickMs: 100,
      onTick: (snapshot) => this.handleTick(snapshot),
      onComplete: () => this.handleComplete(),
    });
    this.intervalEngine = new IntervalEngine({
      onInterval: () => this.handleInterval(),
    });
  }

  init() {
    this.root.addEventListener('click', (event) => this.handleClick(event));
    this.root.addEventListener('pointerdown', (event) => this.handlePointerDown(event));
    this.root.addEventListener('change', (event) => this.handleChange(event));
    this.root.addEventListener('input', (event) => this.handleInput(event));
    document.addEventListener('keydown', (event) => this.handleKeydown(event));
    window.addEventListener('hashchange', () => this.handleLocationChange());
    window.addEventListener('popstate', () => this.handleLocationChange());
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.timer.isRunning()) {
        this.syncWakeLock();
      }
    });
    this.applyTheme();
    this.configureEngines();

    if (this.isPspoMode(this.state.activeMode)) {
      this.syncUrl({ replace: true });
      this.startPspoSession();
      return;
    }

    this.syncUrl({ replace: true });
    this.render();
  }

  t(key) {
    const language = this.state.settings.language in STRINGS ? this.state.settings.language : 'en';
    return STRINGS[language][key] ?? STRINGS.en[key] ?? key;
  }

  render() {
    if (!this.root) {
      return;
    }

    if (this.isPspoMode(this.state.activeMode)) {
      this.root.innerHTML = this.renderPspoScreen();
      return;
    }

    this.root.innerHTML = `
      <div class="app-shell">
        ${this.renderHeader()}
        ${this.state.settingsOpen ? this.renderSettings() : ''}
        <main class="main-area">
          ${this.state.activeMode ? this.renderMode() : this.renderHome()}
        </main>
      </div>
    `;
  }

  renderHeader() {
    const mode = this.getActiveMode();
    const subtitle = mode ? this.t(mode.labelKey) : this.t('appSubtitle');

    return `
      <header class="topbar">
        <button class="brand" type="button" data-action="go-home" aria-label="PaceKeeper ${this.t('home')}">
          <img src="${appIcon}" alt="" width="40" height="40" />
          <span>
            <strong>PaceKeeper</strong>
            <small>${subtitle}</small>
          </span>
        </button>
        <button class="settings-button" type="button" data-action="toggle-settings">
          ${this.state.settingsOpen ? this.t('close') : this.t('settings')}
        </button>
      </header>
    `;
  }

  renderHome() {
    return `
      <section class="home-screen" aria-label="PaceKeeper modes">
        <div class="pspo-launch-grid" aria-label="PSPO 1">
          ${PSPO_MODES.map(
            (mode) => `
              <button class="pspo-launch-card" type="button" data-mode="${mode.id}">
                <strong>${mode.label}</strong>
              </button>
            `
          ).join('')}
        </div>
        <div class="mode-grid">
          ${MODES.map(
            (mode) => `
              <button class="mode-card" type="button" data-mode="${mode.id}">
                <span class="mode-badge">${mode.short}</span>
                <strong>${this.t(mode.labelKey)}</strong>
                <small>${this.t(mode.hintKey)}</small>
              </button>
            `
          ).join('')}
        </div>
      </section>
    `;
  }

  renderPspoScreen() {
    const isEditable = this.state.activeMode === 'pspo-1-edit';

    return `
      <main
        class="pspo-screen ${isEditable ? 'is-editable' : ''}"
        ${isEditable ? 'role="button" tabindex="0"' : ''}
        aria-label="${isEditable ? 'edit PSPO 1' : 'modo PSPO 1'}"
      >
        <output class="pspo-timer" aria-label="Temporizador">${formatClock(this.state.elapsedMs)}</output>
        <output class="pspo-count" aria-label="Pregunta">${this.getPspoCount()}</output>
      </main>
    `;
  }

  renderMode() {
    const mode = this.getActiveMode();
    const metrics = this.getMetrics();

    return `
      <section class="workspace" aria-label="${this.t(mode.labelKey)}">
        <div class="mode-title">
          <button class="text-button" type="button" data-action="go-home">${this.t('home')}</button>
          <div>
            <h1>${this.t(mode.labelKey)}</h1>
            <p>${this.t(mode.hintKey)}</p>
          </div>
        </div>
        ${this.renderConfig()}
        ${this.renderProfiles()}
        ${this.renderCounterModeSelector()}
        <div class="run-layout">
          <section class="timer-panel" aria-live="polite">
            ${this.renderTimerHero(metrics)}
            ${Controls({ state: this.state.timerState, t: (key) => this.t(key) })}
          </section>
          ${Counter({
            count: this.state.count,
            canDecrement: this.state.count > 0,
            label: this.t('eventCounter'),
          })}
        </div>
        ${this.renderStatus(metrics)}
      </section>
    `;
  }

  renderTimerHero(metrics) {
    const mode = this.state.activeMode;

    if (mode === 'stopwatch') {
      return `
        <div class="time-readout">
          <span>${this.t('elapsed')}</span>
          <strong>${formatPreciseClock(this.state.elapsedMs)}</strong>
        </div>
      `;
    }

    const countdown = metrics.countdownMs ?? metrics.remainingMs ?? this.timer.getSnapshot().remainingMs ?? 0;
    const progressValue =
      mode === 'exam'
        ? metrics.actualProgress
        : mode === 'emom' || mode === 'intervals'
          ? metrics.progress
          : 0;

    return `
      <div class="time-readout">
        <span>${mode === 'exam' ? this.t('remaining') : this.t('countdown')}</span>
        <strong>${formatClock(countdown)}</strong>
      </div>
      ${ProgressBar({
        value: progressValue,
        label: this.t('progress'),
        detail: `${this.t('elapsed')}: ${formatClock(this.state.elapsedMs)}`,
      })}
    `;
  }

  renderConfig() {
    const mode = this.state.activeMode;
    const config = this.getConfig();

    if (mode === 'exam') {
      return `
        <section class="config-panel" aria-label="${this.t('configuration')}">
          ${this.renderNumberField('totalQuestions', this.t('totalQuestions'), config.totalQuestions, 1, 500)}
          ${this.renderNumberField('durationMinutes', this.t('durationMinutes'), config.durationMinutes, 1, 600)}
        </section>
      `;
    }

    if (mode === 'emom') {
      return `
        <section class="config-panel" aria-label="${this.t('configuration')}">
          ${this.renderNumberField('rounds', this.t('rounds'), config.rounds, 1, 300)}
          ${this.renderNumberField('intervalSeconds', this.t('intervalSeconds'), config.intervalSeconds, 5, 3600)}
        </section>
      `;
    }

    if (mode === 'intervals') {
      return `
        <section class="config-panel" aria-label="${this.t('configuration')}">
          ${this.renderNumberField('intervalSeconds', this.t('intervalSeconds'), config.intervalSeconds, 5, 3600)}
          ${this.renderNumberField('targetCycles', this.t('targetCycles'), config.targetCycles, 0, 500)}
        </section>
      `;
    }

    return `
      <section class="config-panel compact" aria-label="${this.t('configuration')}">
        <span class="quiet-label">${this.t('noConfig')}</span>
      </section>
    `;
  }

  renderNumberField(key, label, value, min, max) {
    return `
      <label class="field">
        <span>${label}</span>
        <input type="number" inputmode="numeric" data-config="${key}" min="${min}" max="${max}" value="${value}" />
      </label>
    `;
  }

  renderProfiles() {
    const selectedProfile = '';

    return `
      <section class="profile-panel" aria-label="${this.t('profiles')}">
        <label class="field">
          <span>${this.t('profiles')}</span>
          <select data-profile-select value="${escapeHtml(this.state.selectedProfileId)}">
            <option value="">${this.t('chooseProfile')}</option>
            ${this.state.profiles
              .map(
                (profile) => `
                  <option value="${profile.id}" ${profile.id === this.state.selectedProfileId ? 'selected' : ''}>
                    ${escapeHtml(profile.name)}
                  </option>
                `
              )
              .join('')}
          </select>
        </label>
        <label class="field grow">
          <span>${this.t('profileName')}</span>
          <input type="text" data-profile-name value="${escapeHtml(this.state.draftProfileName)}" maxlength="40" />
        </label>
        <button class="save-profile" type="button" data-action="save-profile">${this.t('saveProfile')}</button>
      </section>
    `;
  }

  renderCounterModeSelector() {
    return `
      <label class="field">
        <span>${this.t('counterMode')}</span>
        <select data-counter-mode>
          ${COUNTER_MODES.map((mode) => `
            <option value="${mode}" ${this.state.settings.counterMode === mode ? 'selected' : ''}>${this.t(mode)}</option>
          `).join('')}
        </select>
      </label>
    `;
  }

  renderStatus(metrics) {
    if (this.state.activeMode === 'exam') {
      return StatusGrid([
        {
          label: this.t('currentQuestion'),
          value: `${metrics.currentQuestion}/${metrics.totalQuestions}`,
        },
        {
          label: this.t('expectedQuestion'),
          value: `${metrics.expectedQuestion}/${metrics.totalQuestions}`,
        },
        {
          label: this.t('difference'),
          value: formatDeltaNumber(metrics.difference),
          tone: metrics.difference > 0 ? 'ahead' : metrics.difference < 0 ? 'behind' : 'neutral',
        },
        {
          label: this.t('elapsed'),
          value: formatClock(this.state.elapsedMs),
        },
        {
          label: this.t('remaining'),
          value: formatClock(metrics.remainingMs),
        },
        {
          label: this.t('remainingQuestions'),
          value: metrics.remainingQuestions,
        },
        {
          label: this.t('estimatedFinish'),
          value: formatTimeOfDay(metrics.estimatedFinishTimestamp),
        },
        {
          label: this.t('timeBank'),
          value: formatDeltaMs(metrics.timeBankMs),
          tone: metrics.timeBankMs > 0 ? 'ahead' : metrics.timeBankMs < 0 ? 'behind' : 'neutral',
        },
      ]);
    }

    if (this.state.activeMode === 'emom') {
      return StatusGrid([
        {
          label: this.t('currentRound'),
          value: `${metrics.currentRound}/${metrics.rounds}`,
        },
        {
          label: this.t('countdown'),
          value: formatClock(metrics.countdownMs),
        },
        {
          label: this.t('remainingRounds'),
          value: metrics.remainingRounds,
        },
        {
          label: this.t('elapsed'),
          value: formatClock(this.state.elapsedMs),
        },
        {
          label: this.t('remaining'),
          value: formatClock(Math.max(0, metrics.durationMs - this.state.elapsedMs)),
        },
      ]);
    }

    if (this.state.activeMode === 'intervals') {
      return StatusGrid([
        {
          label: this.t('currentCycle'),
          value:
            metrics.targetCycles > 0
              ? `${metrics.currentCycle}/${metrics.targetCycles}`
              : String(metrics.currentCycle),
        },
        {
          label: this.t('countdown'),
          value: formatClock(metrics.countdownMs),
        },
        {
          label: this.t('completedCycles'),
          value: metrics.completedCycles,
        },
        {
          label: this.t('remainingCycles'),
          value: metrics.remainingCycles ?? this.t('unlimited'),
        },
        {
          label: this.t('elapsed'),
          value: formatClock(this.state.elapsedMs),
        },
      ]);
    }

    return StatusGrid([
      {
        label: this.t('elapsed'),
        value: formatPreciseClock(this.state.elapsedMs),
      },
      {
        label: this.t('events'),
        value: this.state.count,
      },
    ]);
  }

  renderSettings() {
    const settings = this.state.settings;

    return `
      <aside class="settings-panel" aria-label="${this.t('settings')}">
        <label class="setting-control">
          <span>${this.t('theme')}</span>
          <select data-setting="theme">
            <option value="system" ${settings.theme === 'system' ? 'selected' : ''}>${this.t('system')}</option>
            <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>${this.t('light')}</option>
            <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>${this.t('dark')}</option>
          </select>
        </label>
        ${this.renderCheckboxSetting('sound', this.t('sound'), settings.sound)}
        <label class="setting-control">
          <span>${this.t('volume')}</span>
          <input type="range" min="0" max="1" step="0.05" data-setting="volume" value="${settings.volume}" />
          <output>${percent(settings.volume)}</output>
        </label>
        <label class="setting-control">
          <span>${this.t('beepFrequency')}</span>
          <input type="range" min="220" max="1760" step="20" data-setting="beepFrequency" value="${settings.beepFrequency}" />
          <output>${settings.beepFrequency} Hz</output>
        </label>
        ${this.renderCheckboxSetting('vibration', this.t('vibration'), settings.vibration)}
        ${this.renderCheckboxSetting('flash', this.t('flash'), settings.flash)}
        ${this.renderCheckboxSetting('keepAwake', this.t('keepAwake'), settings.keepAwake)}
        ${this.renderCheckboxSetting('keyboardShortcuts', this.t('keyboardShortcuts'), settings.keyboardShortcuts)}
        <label class="setting-control">
          <span>${this.t('language')}</span>
          <select data-setting="language">
            <option value="es" ${settings.language === 'es' ? 'selected' : ''}>Español</option>
            <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
          </select>
        </label>
      </aside>
    `;
  }

  renderCheckboxSetting(key, label, checked) {
    return `
      <label class="setting-control inline">
        <span>${label}</span>
        <input type="checkbox" data-setting="${key}" ${checked ? 'checked' : ''} />
      </label>
    `;
  }

  handlePointerDown(event) {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
      return;
    }

    if (this.state.activeMode === 'pspo-1-edit' && event.target.closest('.pspo-screen')) {
      this.incrementPspoEditCount();
      return;
    }

    const actionButton = event.target.closest('[data-action]');

    if (actionButton) {
      this.handleClick(event);
    }
  }

  handleClick(event) {
    if (this.state.activeMode === 'pspo-1-edit' && event.target.closest('.pspo-screen')) {
      this.incrementPspoEditCount();
      return;
    }

    const modeButton = event.target.closest('[data-mode]');

    if (modeButton) {
      this.selectMode(modeButton.dataset.mode);
      return;
    }

    const actionButton = event.target.closest('[data-action]');

    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;

    if (action === 'go-home') {
      this.goHome();
    }

    if (action === 'toggle-settings') {
      this.state.settingsOpen = !this.state.settingsOpen;
      this.render();
    }

    if (action === 'start') {
      this.startSession();
    }

    if (action === 'pause') {
      this.pauseSession();
    }

    if (action === 'resume') {
      this.resumeSession();
    }

    if (action === 'reset') {
      this.resetSession();
    }

    if (action === 'increment') {
      this.changeCount(1);
    }

    if (action === 'decrement') {
      this.changeCount(-1);
    }

    if (action === 'save-profile') {
      this.saveProfile();
    }
  }

  handleChange(event) {
    const target = event.target;

    if (target.matches('[data-config]')) {
      this.updateConfig(target.dataset.config, target.value);
      return;
    }

    if (target.matches('[data-profile-select]')) {
      if (target.value) {
        this.loadProfile(target.value);
      } else {
        this.state.selectedProfileId = '';
        this.saveState();
        this.render();
      }
      return;
    }

    if (target.matches('[data-counter-mode]')) {
      this.updateSetting('counterMode', normalizeCounterMode(target.value));
      return;
    }

    if (target.matches('[data-setting]')) {
      this.updateSetting(target.dataset.setting, this.getInputValue(target));
    }
  }

  handleInput(event) {
    const target = event.target;

    if (target.matches('[data-profile-name]')) {
      this.state.draftProfileName = target.value;
      return;
    }

    if (target.matches('[data-setting="volume"], [data-setting="beepFrequency"]')) {
      const value = this.getInputValue(target);
      this.state.settings[target.dataset.setting] = value;
      this.saveState();
      const output = target.closest('.setting-control')?.querySelector('output');

      if (output) {
        output.textContent = target.dataset.setting === 'volume' ? percent(value) : `${value} Hz`;
      }
    }
  }

  handleKeydown(event) {
    if (this.state.activeMode === 'pspo-1-edit') {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        this.incrementPspoEditCount();
      }

      return;
    }

    if (this.isPspoMode(this.state.activeMode)) {
      return;
    }

    if (!this.state.activeMode || !this.state.settings.keyboardShortcuts) {
      return;
    }

    const interactiveTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];

    if (interactiveTags.includes(event.target.tagName)) {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
      this.handleCounterInput(this.state.settings.counterMode === 'automatic' ? 1 : 1);
    }

    if (event.code === 'Backspace') {
      event.preventDefault();
      this.handleCounterInput(-1);
    }
  }

  handleTick(snapshot) {
    this.state.elapsedMs = snapshot.elapsedMs;
    this.state.timerState = snapshot.state;

    if (this.isPspoMode(this.state.activeMode)) {
      this.updatePspoCount(snapshot.elapsedMs);
      this.render();
      return;
    }

    if (this.state.activeMode !== 'stopwatch') {
      this.intervalEngine.update(snapshot.elapsedMs);
    }

    this.render();
  }

  handleComplete() {
    this.syncWakeLock();
  }

  handleInterval() {
    const settings = this.state.settings;
    playBeep({
      enabled: settings.sound,
      frequency: settings.beepFrequency,
      volume: settings.volume,
    });
    triggerVibration(settings.vibration);
    flashScreen(settings.flash);
  }

  handleCounterInput(delta) {
    if (this.state.settings.counterMode === 'automatic') {
      const nextValue = this.state.count + delta;
      const max = this.getCounterLimit();
      this.state.count = clamp(nextValue, 0, max);
      this.render();
      return;
    }

    this.changeCount(delta);
  }

  selectMode(mode) {
    if (!this.isKnownMode(mode)) {
      return;
    }

    this.state.activeMode = mode;
    this.state.lastMode = mode;
    this.state.selectedProfileId = '';
    this.resetSession({ render: false });
    this.configureEngines();
    this.saveState();
    this.syncUrl();

    if (this.isPspoMode(mode)) {
      this.startPspoSession();
      return;
    }

    this.render();
  }

  goHome() {
    this.state.activeMode = null;
    this.state.lastMode = null;
    this.state.selectedProfileId = '';
    this.resetSession({ render: false });
    this.saveState();
    this.syncUrl();
    this.render();
  }

  async startSession() {
    await primeAudio();
    this.state.count = 0;
    this.configureEngines();
    this.intervalEngine.reset(0);
    this.timer.start();
    this.syncWakeLock();
    this.render();
  }

  pauseSession() {
    this.timer.pause();
    this.syncWakeLock();
    this.render();
  }

  resumeSession() {
    this.timer.resume();
    this.syncWakeLock();
    this.render();
  }

  resetSession({ render = true } = {}) {
    this.state.elapsedMs = 0;
    this.state.count = 0;
    this.state.pspoAutoIncrements = 0;
    this.state.timerState = 'idle';
    this.timer.reset({ emit: false });
    this.intervalEngine.reset(0);
    this.syncWakeLock();

    if (render) {
      this.render();
    }
  }

  changeCount(delta) {
    const limit = this.getCounterLimit();
    const nextCount = this.state.count + delta;
    this.state.count = clamp(nextCount, 0, limit);
    this.render();
  }

  startPspoSession() {
    this.state.elapsedMs = 0;
    this.state.count = 1;
    this.state.pspoAutoIncrements = 0;
    this.state.pspoLastIncrementAtMs = 0;
    this.state.timerState = 'idle';
    this.timer.reset({ emit: false });
    this.configureEngines();
    this.timer.start();
    this.syncWakeLock();
  }

  updatePspoCount(elapsedMs) {
    if (this.state.activeMode === 'pspo-1') {
      const updated = getPspoCountForElapsed({
        elapsedMs,
        lastIncrementAtMs: this.state.pspoLastIncrementAtMs,
        currentCount: this.state.count,
        intervalMs: PSPO_CONFIG.intervalMs,
        totalQuestions: PSPO_CONFIG.totalQuestions,
      });

      this.state.count = updated.count;
      this.state.pspoLastIncrementAtMs = updated.lastIncrementAtMs;
      this.state.pspoAutoIncrements = updated.count - 1;
      return;
    }

    const updated = getPspoCountForElapsed({
      elapsedMs,
      lastIncrementAtMs: this.state.pspoLastIncrementAtMs,
      currentCount: this.state.count,
      intervalMs: PSPO_CONFIG.intervalMs,
      totalQuestions: PSPO_CONFIG.totalQuestions,
    });

    if (updated.count > this.state.count) {
      this.state.count = updated.count;
      this.state.pspoLastIncrementAtMs = updated.lastIncrementAtMs;
      this.state.pspoAutoIncrements = updated.count - 1;
    }
  }

  incrementPspoEditCount() {
    if (this.state.timerState === 'complete') {
      return;
    }

    const updated = getPspoCountForElapsed({
      elapsedMs: this.state.elapsedMs,
      lastIncrementAtMs: this.state.pspoLastIncrementAtMs,
      currentCount: this.state.count,
      intervalMs: PSPO_CONFIG.intervalMs,
      totalQuestions: PSPO_CONFIG.totalQuestions,
    });

    this.state.count = Math.min(PSPO_CONFIG.totalQuestions, updated.count + 1);
    this.state.pspoLastIncrementAtMs = this.state.elapsedMs;
    this.state.pspoAutoIncrements = this.state.count - 1;
    this.render();
  }

  updateConfig(key, value) {
    const mode = this.state.activeMode;
    const current = {
      ...this.state.configs[mode],
      [key]: value,
    };

    if (mode === 'exam') {
      this.state.configs.exam = normalizeExamConfig(current);
    }

    if (mode === 'emom') {
      this.state.configs.emom = normalizeEmomConfig(current);
    }

    if (mode === 'intervals') {
      this.state.configs.intervals = normalizeIntervalConfig(current);
    }

    this.resetSession({ render: false });
    this.configureEngines();
    this.saveState();
    this.render();
  }

  updateSetting(key, value) {
    this.state.settings[key] = value;
    this.applyTheme();
    this.syncWakeLock();
    this.saveState();
    this.render();
  }

  loadProfile(profileId) {
    const profile = this.state.profiles.find((item) => item.id === profileId);

    if (!profile) {
      return;
    }

    this.state.activeMode = profile.mode;
    this.state.lastMode = profile.mode;
    this.state.selectedProfileId = profile.id;
    this.state.configs[profile.mode] = this.normalizeConfig(profile.mode, profile.config);
    this.resetSession({ render: false });
    this.configureEngines();
    this.saveState();
    this.syncUrl();
    this.render();
  }

  saveProfile() {
    const name = this.state.draftProfileName.trim();

    if (!name || !this.state.activeMode) {
      return;
    }

    this.state.profiles = [
      ...this.state.profiles,
      {
        id: createId(name),
        name,
        mode: this.state.activeMode,
        config: this.getConfig(),
      },
    ];
    this.state.selectedProfileId = this.state.profiles[this.state.profiles.length - 1].id;
    this.state.draftProfileName = '';
    this.saveState();
    this.render();
  }

  configureEngines() {
    this.timer.setDurationMs(this.getModeDurationMs());
    this.intervalEngine.setIntervalMs(this.getModeIntervalMs());
    this.intervalEngine.reset(this.state.elapsedMs);
  }

  getActiveMode() {
    return MODES.find((mode) => mode.id === this.state.activeMode);
  }

  getRouteForMode(mode) {
    if (!mode) {
      return '#/home';
    }

    if (mode === 'pspo-1') {
      return '#/timePSPO';
    }

    if (mode === 'pspo-1-edit') {
      return '#/editPSPO';
    }

    return `#/${mode}`;
  }

  getModeFromPath(pathname = window.location.pathname, hash = window.location.hash) {
    const path = hash ? hash.slice(1) : pathname;
    const normalized = path.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '').toLowerCase();

    if (!normalized || normalized === 'home') {
      return null;
    }

    if (normalized === 'timepspo') {
      return 'pspo-1';
    }

    if (normalized === 'editpspo') {
      return 'pspo-1-edit';
    }

    return this.isKnownMode(normalized) ? normalized : null;
  }

  syncUrl({ replace = false } = {}) {
    const nextRoute = this.getRouteForMode(this.state.activeMode);
    const currentHash = window.location.hash || '#/home';

    if (currentHash === nextRoute) {
      return;
    }

    if (replace) {
      window.location.replace(nextRoute);
      return;
    }

    window.location.hash = nextRoute.slice(1);
  }

  handleLocationChange() {
    const nextMode = this.getModeFromPath(window.location.pathname, window.location.hash);

    if (nextMode === this.state.activeMode) {
      this.render();
      return;
    }

    this.state.activeMode = nextMode;
    this.state.lastMode = nextMode;
    this.resetSession({ render: false });
    this.configureEngines();
    this.saveState();

    if (this.isPspoMode(this.state.activeMode)) {
      this.startPspoSession();
      return;
    }

    this.render();
  }

  isKnownMode(mode) {
    return MODES.some((item) => item.id === mode) || this.isPspoMode(mode);
  }

  isPspoMode(mode) {
    return PSPO_MODES.some((item) => item.id === mode);
  }

  getPspoCount() {
    return clamp(this.state.count || 1, 1, PSPO_CONFIG.totalQuestions);
  }

  getConfig() {
    return this.normalizeConfig(this.state.activeMode, this.state.configs[this.state.activeMode] ?? {});
  }

  normalizeConfig(mode, config) {
    if (mode === 'exam') {
      return normalizeExamConfig(config);
    }

    if (mode === 'emom') {
      return normalizeEmomConfig(config);
    }

    if (mode === 'intervals') {
      return normalizeIntervalConfig(config);
    }

    return {};
  }

  getModeDurationMs() {
    const config = this.getConfig();

    if (this.state.activeMode === 'exam') {
      return getExamDurationMs(config);
    }

    if (this.state.activeMode === 'emom') {
      return getEmomDurationMs(config);
    }

    if (this.state.activeMode === 'intervals') {
      return getIntervalDurationMs(config);
    }

    if (this.isPspoMode(this.state.activeMode)) {
      return PSPO_CONFIG.durationMs;
    }

    return null;
  }

  getModeIntervalMs() {
    const config = this.getConfig();

    if (this.state.activeMode === 'exam') {
      return getExamIntervalMs(config);
    }

    if (this.state.activeMode === 'emom') {
      return getEmomIntervalMs(config);
    }

    if (this.state.activeMode === 'intervals') {
      return getIntervalMs(config);
    }

    return null;
  }

  getMetrics() {
    const payload = {
      config: this.getConfig(),
      elapsedMs: this.state.elapsedMs,
      completedEvents: this.state.count,
    };

    if (this.state.activeMode === 'exam') {
      return getExamMetrics(payload);
    }

    if (this.state.activeMode === 'emom') {
      return getEmomMetrics(payload);
    }

    if (this.state.activeMode === 'intervals') {
      return getIntervalMetrics(payload);
    }

    return getStopwatchMetrics(payload);
  }

  getCounterLimit() {
    const config = this.getConfig();

    if (this.state.activeMode === 'exam') {
      return config.totalQuestions;
    }

    if (this.state.activeMode === 'emom') {
      return config.rounds;
    }

    if (this.state.activeMode === 'intervals' && config.targetCycles > 0) {
      return config.targetCycles;
    }

    if (this.isPspoMode(this.state.activeMode)) {
      return PSPO_CONFIG.totalQuestions;
    }

    return 9999;
  }

  getInputValue(input) {
    if (input.type === 'checkbox') {
      return input.checked;
    }

    if (input.type === 'range' || input.type === 'number') {
      return Number(input.value);
    }

    return input.value;
  }

  applyTheme() {
    const theme = this.state.settings.theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.lang = this.state.settings.language;
  }

  async syncWakeLock() {
    const shouldLock = this.state.settings.keepAwake && this.timer.isRunning();

    if (!shouldLock && this.wakeLock) {
      await this.wakeLock.release().catch(() => {});
      this.wakeLock = null;
      return;
    }

    if (!shouldLock || this.wakeLock || !('wakeLock' in navigator)) {
      return;
    }

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      this.wakeLock.addEventListener('release', () => {
        this.wakeLock = null;
      });
    } catch {
      this.wakeLock = null;
    }
  }

  saveState() {
    saveAppState({
      settings: this.state.settings,
      configs: this.state.configs,
      profiles: this.state.profiles,
      lastMode: this.state.lastMode,
      selectedProfileId: this.state.selectedProfileId,
    });
  }
}

function createId(value) {
  const suffix =
    'crypto' in window && 'randomUUID' in window.crypto
      ? window.crypto.randomUUID().slice(0, 8)
      : String(Date.now()).slice(-8);
  return `${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${suffix}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
