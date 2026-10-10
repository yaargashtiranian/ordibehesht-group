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

This is a starter page; no backend, contact submission, or deployment is
configured. No secrets are required to develop or build it.
