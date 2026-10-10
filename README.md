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

The homepage is a Persian RTL narrative for B2B employee welfare and credit
services. Descriptions use the supplied brief, without invented metrics.

- The rectangular teal/gold identity is traced from the supplied raster reference,
  including its crescent, frame, wordmark, and colors. It is not a new logo.
  The original vector file can replace this tracing for exact typography.
- The hero is an animated geographic globe with three orbiting brand-color
  ribbons. Hero graphics are separate from the official identity.
- The desktop brand journey translates vertical page scroll into eight horizontal
  chapters. Direct navigation and arrow keys work. Mobile uses native horizontal
  scrolling and snap points. Reduced motion renders all chapters in normal flow.
- The collaboration form requires name, organization, and phone, with optional
  service selection. Iranian/Persian digits are normalized on both client/server.

## Lead registration and email

`POST /api/leads` validates submissions and stores a private JSON record per
request ID. Duplicate submissions are idempotent. Storage failures are reported
as failures. Contact records are ignored by Git and have no public read endpoint.

For a persistent Node host, set `LEAD_STORAGE_DIR` to a private persistent volume.
The local default is `.data/leads`. This filesystem adapter is not suitable for
an ephemeral/serverless filesystem; use a persistent backend before that deployment.
Backups, retention, and restricted operator access belong to the production host.

Email notifications go to `info@ordibehesht.group` using Resend:

1. Verify the sending domain in Resend.
2. Add `RESEND_API_KEY` securely in environment settings (never Git or chat).
3. Set `LEAD_FROM_EMAIL` to the verified sender, such as
   `Ordibehesht Group <info@ordibehesht.group>`.
4. Allow HTTPS to `api.resend.com` and restart the application after configuration
   is applied. Requirements are saved in the cloud configuration draft.

Without working email settings, registration still saves the lead but reports
that email has not been sent and offers direct email/telephone follow-up. Provider
acceptance is recorded as `accepted`; inbox delivery is not independently verified.
If the provider fails, the saved record remains `pending`. Reposting the same
request ID retries the notification using the provider's idempotency key. There
is no automatic background email retry worker.

Contact: `info@ordibehesht.group`, `+98 21 92005001`.

## Verification

`npm test` runs seven lead-handler tests covering persistence, Persian digits,
validation, same-origin checks, body limits, duplicate submissions, provider
success/failure/retry, and storage failure. Mail requests in tests are mocked;
no test messages are sent to the group's mailbox.

Chromium checks cover the globe, horizontal scroll, keyboard and mobile controls,
form validation/actual local storage, responsive overflow, reduced motion, and
WCAG automated accessibility checks. Also run `npm run lint`, `npm run typecheck`,
and `npm run build`.
