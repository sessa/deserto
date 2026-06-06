# Deserto

A project I'm working on with my daughter to teach her prompt engineering and AI — building a desert-themed storage app along the way.

Deserto helps manage files and assets with a calm, sparse UI inspired by arid landscapes. We're using it as a hands-on way to learn how to work with AI tools, write effective prompts, and turn ideas into real software.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS v4.

## Requirements

Use **Node.js 20.9+** (see `.nvmrc`). This matches Next.js and Tailwind CSS v4 tooling, including the `@tailwindcss/oxide` native bindings.

If you must stay on **Node 18 on Linux x64 (glibc)**, this repo includes `@tailwindcss/oxide-linux-x64-gnu` so PostCSS can load Oxide; other platforms should use Node 20+ instead of pinning another binary package.

## Getting started

Install dependencies (already done if you just cloned after a fresh scaffold):

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Edit `src/app/page.tsx` to change the home page. The app uses the `src/` directory layout.

## Scripts

| Script        | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Dev server (Turbopack)   |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | ESLint                   |

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## License

MIT
