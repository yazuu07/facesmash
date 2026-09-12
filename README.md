# FaceSmash

React + Vite, frontend-only. Elo-rated head-to-head voting.

## Run
npm install
npm run dev

## Build
npm run build   # outputs dist/

## Deploy
- Netlify / Vercel: point at repo, build command `npm run build`, publish dir `dist`
- GitHub Pages: `npm run build`, push `dist/` to `gh-pages` (or use `vite-plugin-gh-pages`)