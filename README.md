# Ordibehesht-Group | گروه اردیبهشت

Persian RTL website starter using Next.js 16 App Router, React 19, TypeScript,
Tailwind CSS 4, and shadcn/ui (Radix). Vazirmatn fonts are served locally from
`@fontsource/vazirmatn`; no Google Fonts request or credentials are required.

## Development

Use Node.js 24 (`.nvmrc`) and npm. Work in the existing checkout; cloud tasks
already run in an isolated environment and do not need a Git worktree.

```bash
cd /workspace/ordibehesht-group
npm ci
npm run dev -- --hostname 0.0.0.0
```

In this cloud environment, if the default npm cache is not writable, use
`npm_config_cache=/workspace/.npm-cache npm ci`. For CLI configuration use
`XDG_CONFIG_HOME=/workspace/.config`.

## Checks and production

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Persian and RTL

- The root layout sets `lang="fa"` and `dir="rtl"`.
- The client direction provider configures Radix controls for RTL while pages
  remain Server Components.
- Prefer logical spacing (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`) over
  physical left/right styles. Set `dir="ltr"` on email addresses and other LTR
  controls when needed.
- Use `Intl.NumberFormat("fa-IR")` for Persian numbers and
  `Intl.DateTimeFormat("fa-IR-u-ca-persian")` for Persian calendar dates.
- Brand colors and light/dark tokens live in `src/app/globals.css`.

## shadcn/ui

Button, Card, Badge, Input, and Textarea are available in `src/components/ui`.
The project uses the official shadcn registry with the `new-york` style and
RTL enabled in `components.json`.

```bash
XDG_CONFIG_HOME=/workspace/.config npm_config_cache=/workspace/.npm-cache npx shadcn@latest add dialog
```

The hosted registry requires network access to `ui.shadcn.com`. That domain
has been added to the environment configuration draft; review and save the
settings to apply it. The initial components were installed through the CLI
using source from the official GitHub repository. See `THIRD_PARTY_NOTICES.md`.

## Website experience

The homepage is a Persian RTL narrative for the group’s B2B employee welfare
and credit services, with eight linked brands. Brand descriptions use the
provided brief; no unverified performance statistics are displayed.

- Three.js renders a local, procedural teal/gold sculpture, inspired by the
  supplied brand references. It is a design interpretation, not the original
  logo file. Replace the vector mark with the official asset when available.
- A sticky three-chapter story responds to scroll on desktop. Mobile presents
  the chapters in readable order without scroll locking.
- Brand filters, expandable descriptions, mobile navigation, and email/phone
  contact actions work without a backend.
- Contact: info@ordibehesht.group and +98 21 92005001, supplied by the user.
- Reduced-motion preferences disable animated transforms. WebGL failure uses
  the vector fallback. Rendering pauses outside the viewport or in a hidden tab.
- All visual/font assets are local; service links open their respective sites.

Validation: ESLint, TypeScript, production build, and Chromium checks for desktop
and mobile layouts, brand filters, descriptions, chapter changes, menu behavior,
local font loading, and reduced-motion behavior. No Vercel deployment is required.
