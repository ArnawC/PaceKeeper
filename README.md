# PaceKeeper

PaceKeeper is a lightweight Progressive Web App for pacing exams, EMOM sessions, generic intervals and stopwatch sessions. It is built with Vite, HTML5, CSS3 and vanilla JavaScript modules.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

- `src/core/timer.js`: UI-independent timer with start, pause, resume and reset.
- `src/core/intervalEngine.js`: reusable interval scheduler that emits interval events from elapsed time.
- `src/core/beep.js`: Web Audio API beep plus vibration and screen flash helpers.
- `src/core/storage.js`: localStorage defaults, saved profiles, settings and last mode.
- `src/modes/*`: pure mode-specific configuration and metrics.
- `src/components/*`: small markup components used by the app shell.

## PWA

The app includes a web manifest and service worker in `public/`. The Vite config uses `base: './'` so the production build can be deployed to GitHub Pages under a project path.
