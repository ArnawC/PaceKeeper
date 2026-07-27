import './styles/main.css';
import { createApp } from './app.js';

const root = document.querySelector('#app');
const app = createApp(root);

app.init();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {
      // The app still works online if a browser refuses service workers.
    });
  });
}
