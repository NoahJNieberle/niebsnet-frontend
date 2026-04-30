# NiebsNet Frontend

Public Angular portfolio frontend for NiebsNet.

## Development

```bash
npm ci
npm start
```

The local development server runs at `http://localhost:4200/`.

## Production Build

```bash
npm run build:prod
```

The production output is written to `dist/niebsnet/browser`.

## GitHub Pages

This repository includes a GitHub Actions workflow that builds the Angular app and deploys `dist/niebsnet/browser` to GitHub Pages.
