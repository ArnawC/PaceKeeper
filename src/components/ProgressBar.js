import { clamp, percent } from '../core/format.js';

export function ProgressBar({ value, label, detail = '' }) {
  const safeValue = clamp(Number(value) || 0, 0, 1);

  return `
    <div class="progress-wrap">
      <div class="progress-copy">
        <span>${label}</span>
        <strong>${percent(safeValue)}</strong>
      </div>
      <div class="progress-track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(safeValue * 100)}">
        <span class="progress-fill" style="width: ${percent(safeValue)}"></span>
      </div>
      ${detail ? `<p class="progress-detail">${detail}</p>` : ''}
    </div>
  `;
}
