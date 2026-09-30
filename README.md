# Time Travel Web Browser

A nostalgic web app for exploring era-curated websites, stepping through a snapshot calendar, and playing local Flash content when available.

## Features

- Snapshot calendar with a date selector that maps to an era timeline
- Curated website list by decade/era
- Browser preview pane for selected historical websites
- Local Flash (.swf) playback using the Ruffle emulator
- Clean retro-inspired interface with immersive time-travel styling

## Run locally

```bash
npm install
npm run dev -- --host
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
```

## Notes

- Some historical websites may block iframe embedding due to their own security policies.
- Flash support depends on the browser runtime and the Ruffle emulator loading successfully.
- This project is intentionally a browser-based prototype and does not ship with copyrighted flash game files.
