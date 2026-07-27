export function StatusCard({ label, value, tone = 'neutral' }) {
  return `
    <article class="status-card tone-${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `;
}

export function StatusGrid(items) {
  return `
    <section class="status-grid" aria-label="Session status">
      ${items.map((item) => StatusCard(item)).join('')}
    </section>
  `;
}
