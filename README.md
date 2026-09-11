<p align="center">
  <img src="public/profile.jpg" width="160" height="160" alt="sl4de" />
</p>

<h1 align="center">sl4de</h1>

<p align="center">Backend Dev &amp; Web Pentester</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/WebGL-shader-990000?style=flat-square&logo=webgl&logoColor=white" alt="WebGL" />
</p>

---

## About

A single-page personal portfolio built as a fully static site. No backend, no database, no
analytics, no third-party tracking — the production build is a folder of plain HTML, CSS and
JavaScript that can be dropped on any static host or served over Tor as an onion site.

The page is deliberately minimal: a profile card on a live WebGL fog background, and two
actions — contact and GitHub. Contact opens a modal that exposes a PGP-backed email address
and the public key itself.

## Features

**Animated WebGL fog background**  
A custom GLSL shader ([`src/lib/fog/`](src/lib/fog/)) renders a drifting fog field behind the
page. It degrades gracefully — [`capability.ts`](src/lib/fog/capability.ts) disables the shader
entirely on coarse-pointer devices and viewports under 900px, so phones get the flat black
background instead of a battery-draining render loop.

**Modal presence system**  
[`modalPresence.ts`](src/lib/modalPresence.ts) is a tiny pub/sub store that counts open modals.
The fog subscribes to it and dampens itself while any modal is up, so the background never
competes with foreground content.

**PGP contact flow**  
The contact modal ships the full public key inline — copy the address, copy the key, or hand
off to the system mail client. Nothing round-trips through a server.

**Reduced-motion aware**  
[`respectMotionPreference()`](src/lib/motion.ts) rewrites every Framer Motion variant down to a
plain opacity fade when `prefers-reduced-motion: reduce` is set, with a `WeakMap` cache so the
transform happens once per variant object.

**Custom cursors**  
Classic `.cur` files for the default, pointer and text cursors, wired up in
[`globals.css`](src/app/globals.css).

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 — App Router, static export |
| UI | React 19, TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 4 — CSS-first `@theme`, no JS config |
| Animation | Framer Motion 12 |
| Graphics | Raw WebGL + GLSL |
| Icons | lucide-react, react-icons |
| Font | Space Grotesk via `next/font/google` |

## Getting Started

Requires Node.js 20.9 or newer (developed on 24).

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with hot reload (build cache in `.next-dev/`) |
| `npm run build` | Static export to `dist/` |

To preview a production build, serve the exported folder with any static file server —
`next start` does not apply to a statically exported site:

```bash
npm run build
npx serve@latest dist
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          Root layout, metadata, font
│   ├── page.tsx            The page — profile card + actions
│   └── globals.css         Tailwind @theme, cursors, aurora effects
├── components/
│   ├── Profile/
│   │   └── ProfileCard.tsx Avatar, name, tagline
│   ├── Contact/
│   │   └── EmailModal.tsx  Email + PGP public key
│   └── UI/
│       ├── FogBackground.tsx  Full-page fog canvas
│       ├── FogSurface.tsx     Fog clipped to a modal panel
│       └── ModalShell.tsx     Shared modal: ARIA dialog, veil, blur-in
├── hooks/
│   └── useSecurity.ts      Context menu / devtools / copy guards
└── lib/
    ├── fog/
    │   ├── capability.ts   Should the shader run at all?
    │   ├── glsl.ts         Vertex + fragment shader source
    │   └── renderer.ts     WebGL setup, RAF loop, teardown
    ├── modalPresence.ts    Global open-modal counter
    └── motion.ts           Shared easings, springs, variants
```

## Deployment

`npm run build` produces a static `dist/` directory — see
[`next.config.mjs`](next.config.mjs), which sets `output: 'export'`. Upload it anywhere that
serves files:

```bash
npm run build
# then rsync/scp/upload dist/ to your host
```

There is no server component, so there is nothing to keep running and nothing to patch.

## Contact

**Email** — `sl4desec@proton.me` (PGP preferred; key is in the contact modal)  
**GitHub** — [@sl4de0day](https://github.com/sl4de0day)
