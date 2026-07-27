const PRIMARY_ACTIONS = {
  idle: { action: 'start', key: 'start' },
  running: { action: 'pause', key: 'pause' },
  paused: { action: 'resume', key: 'resume' },
  complete: { action: 'start', key: 'startAgain' },
};

export function Controls({ state, t }) {
  const primary = PRIMARY_ACTIONS[state] ?? PRIMARY_ACTIONS.idle;

  return `
    <div class="controls" aria-label="${t('timerControls')}">
      <button class="control-button primary" type="button" data-action="${primary.action}">
        ${t(primary.key)}
      </button>
      <button class="control-button" type="button" data-action="reset">
        ${t('reset')}
      </button>
    </div>
  `;
}
