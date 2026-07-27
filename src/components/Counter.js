export function Counter({ count, canDecrement = true, label }) {
  return `
    <section class="counter-panel" aria-labelledby="counter-heading">
      <div>
        <p class="section-kicker" id="counter-heading">${label}</p>
        <output class="counter-value" aria-live="polite">${count}</output>
      </div>
      <div class="counter-actions">
        <button class="counter-button decrement" type="button" data-action="decrement" ${canDecrement ? '' : 'disabled'} aria-label="-1">-1</button>
        <button class="counter-button increment" type="button" data-action="increment" aria-label="+1">+1</button>
      </div>
    </section>
  `;
}
