# PaceKeeper

PaceKeeper is a lightweight Progressive Web App for pacing exams, EMOM sessions, interval training and stopwatch-style workouts. It is built with Vite, modern browser APIs, and vanilla JavaScript modules.

## Features

- Multiple workout and pacing modes:
  - `Exam`: timed exam pacing with custom section lengths.
  - `EMOM`: Every Minute On the Minute interval countdown.
  - `Intervals`: configurable work/rest rounds and sets.
  - `Stopwatch`: start/pause/resume timer with lap-style behavior.
- URL-driven mode navigation using hash routing (`#/home`, `#/exam`, `#/emom`, `#/intervals`, `#/stopwatch`).
- Touch-friendly controls for mobile and tablet use.
- Audio and vibration alerts for interval transitions.
- Persistent settings and saved profiles via `localStorage`.
- Progressive Web App support with manifest and service worker.

## Project structure

- `src/main.js` - App bootstrap and entry point.
- `src/app.js` - Main UI rendering, routing, event handling and app state.
- `src/core/`
  - `timer.js` - Timer logic with start/pause/resume/reset.
  - `intervalEngine.js` - Interval scheduler and elapsed-time event emitter.
  - `beep.js` - Audio, vibration and visual alert helpers.
  - `storage.js` - Local storage helpers for profiles, settings and mode state.
  - `format.js` - Time formatting and display utilities.
- `src/modes/` - Mode-specific configuration and rules.
- `src/components/` - Reusable UI component render functions.
- `src/styles/main.css` - App styling for desktop and touch devices.
- `public/` - Static PWA assets, manifest and service worker files.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local development URL shown by Vite (usually `http://127.0.0.1:5173`).

## Production build

```bash
npm run build
```

This project is configured to output production files into `docs/`, making it compatible with GitHub Pages deployment from the repository root.

## Preview production build locally

```bash
npm run preview
```

## Usage

- Open the app and select a mode from the navigation.
- Configure timing values and profiles as needed.
- Start the timer and use the on-screen buttons to pause, resume, or reset.
- The app supports touch gestures, so buttons are optimized for finger taps on mobile.
- When the app is installed as a PWA, it can run offline after the first visit.

## Deployment

To deploy on GitHub Pages:

1. Build the app with `npm run build`.
2. Make sure `docs/` is selected as the Pages source in GitHub repository settings.
3. Confirm the site URL uses the repo path, for example:
   `https://<username>.github.io/PaceKeeper/`

The current Vite config sets `base: '/PaceKeeper/'`, so asset paths will resolve correctly when published from the `docs/` folder.

## Notes

- This app uses hash-based routing so navigation works on GitHub Pages without extra server configuration.
- The manifest uses relative paths to support deployment under the repository path.
- If you add new files or change the repository name, update `vite.config.js` and GitHub Pages settings accordingly.

## License

This project is open source. Feel free to use and modify it for personal or educational projects.
