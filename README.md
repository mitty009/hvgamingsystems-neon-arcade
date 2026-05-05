# High Voltage Gaming Systems — neon arcade React rebuild

A deployment-ready React + TypeScript + Tailwind rebuild of the High Voltage Gaming Systems website for Netlify.

This version is configured as a **pnpm-first** project and styled as a brighter **neon arcade** experience that stays aligned with the live site’s core tone: bold machine imagery, aqua / purple lighting, venue entertainment, veteran-owned service, and Murray / Riverina regional support.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Netlify Functions
- Mailgun
- pnpm 10.28.0

## Production baseline

This repo is pinned for consistent local and Netlify builds.

- Node `20`
- pnpm `10.28.0`
- Build command: `pnpm build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

Pinning is provided through:

- `packageManager` in `package.json`
- `engines` in `package.json`
- `.nvmrc`
- `.node-version`
- `NODE_VERSION` in `netlify.toml`

## Local development

Enable Corepack once if needed, then install with pnpm.

```bash
corepack enable
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

## Local preview

```bash
pnpm preview
```

## Mailgun domain and environment variables

Recommended Mailgun sending domain:

```text
mg.hvgamingsystems.com.au
```

Use a Mailgun subdomain rather than the root domain so the website domain and any normal inbox/email provider records can stay cleanly separated.

Create the domain in Mailgun under **Sending > Domains > Add new domain**, then add the DNS records Mailgun provides in the DNS host that will manage `hvgamingsystems.com.au` records. If Netlify DNS is managing the domain, add the Mailgun TXT, MX, and CNAME records in Netlify DNS.

Set these values locally in `.env` and in Netlify site environment variables. In Netlify, give them the **Functions** scope because the contact form sends email from a Netlify Function.

```bash
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_API_BASE=https://api.mailgun.net/v3
MAILGUN_DOMAIN=mg.hvgamingsystems.com.au
CONTACT_TO=info@hvgamingsystems.com.au
CONTACT_FROM=Website Enquiry <website@mg.hvgamingsystems.com.au>
```

Use `https://api.eu.mailgun.net/v3` for `MAILGUN_API_BASE` if the Mailgun domain is created in the EU region. Keep the API key out of `netlify.toml`; Netlify does not expose `netlify.toml` environment variables to serverless functions at runtime.

## Netlify deployment

This project is ready to deploy on Netlify with pnpm.

### Recommended setup

- Base directory: project root
- Build command: `pnpm build`
- Publish directory: `dist`

Netlify should detect `pnpm-lock.yaml`. The repo is already configured for that workflow in `netlify.toml`.

## Contact form

The form posts to the Netlify function at:

```text
/.netlify/functions/contact
```

That function forwards the enquiry through Mailgun using the environment variables above.

## File structure

```text
.
├── netlify/
│   └── functions/
│       └── contact.mjs
├── .env.example
├── public/
│   └── assets/
│       └── hv/
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── .node-version
├── .nvmrc
├── .npmrc
├── index.html
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## Troubleshooting

### Reset dependencies cleanly

```bash
rm -rf node_modules
pnpm store prune
pnpm install
pnpm build
```

### Make sure pnpm is the package manager in use

```bash
corepack enable
pnpm --version
node -v
```

Expected versions for this repo:

- Node 20.x
- pnpm 10.28.0

## Notes

- This is a native React site, not an iframe wrapper around a mirrored website.
- The loader animation uses an original arcade claw / alien-style sequence, not third-party character artwork.
- Live site messaging and public service positioning were used as the basis for copy direction and structure.
