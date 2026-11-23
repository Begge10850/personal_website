# Treva Antony Ogwang — Personal Website

Source for [trevaogwang.com](https://trevaogwang.com), a portfolio covering data, AI, product and technology projects.

## Stack

- React and TypeScript
- vinext and Vite
- Cloudflare Workers through `@cloudflare/vite-plugin`
- Plain CSS for the site design system

The production website is hosted through Cloudflare. It does not use OpenAI Sites hosting.

## Local development

Node.js 22.13 or later is required.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm test
```

`npm test` builds the site and runs the rendered-HTML tests in `tests/`.

`npm run deploy` builds the project and deploys the generated Worker configuration to Cloudflare.

## Content structure

- `app/` — routes, shared components and styles
- `app/projects/` — concise portfolio case studies
- `public/projects/` — project images and demonstrations
- `worker/` — Cloudflare Worker entry point
- `tests/` — rendered-output checks

The website presents the problem, contribution, decisions, results and limitations for each featured project. Detailed implementation, reproduction steps and technical evidence remain in the linked project repositories.
