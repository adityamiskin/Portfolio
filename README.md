# adityamiskin.com

Aditya Miskin's portfolio, built with TanStack Start, React 19, the React
Compiler, Tailwind CSS, and Vite+. The application is server-rendered by
TanStack Start and configured for Cloudflare Workers.

## Local development

Install dependencies and start the Cloudflare-backed Vite development server:

```bash
bun install
bun run dev
```

The app is available at <http://localhost:3000>.

Vite+ provides the project toolchain:

```bash
bun run check
bun run test
bun run build
bun run preview
```

## Photography environment variables

Copy `.dev.vars.example` to `.dev.vars` and add the Cloudinary credentials used
by the server-side photo loader:

```dotenv
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

The site still renders when these variables are absent; the photography route
shows its empty state.

For a deployed Worker, add the same values as encrypted Cloudflare secrets:

```bash
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY
wrangler secret put CLOUDINARY_API_SECRET
```

## Cloudflare

`wrangler.jsonc` uses TanStack Start's Worker server entry and enables
`nodejs_compat`. Test the production Worker bundle locally before deployment:

```bash
bun run build
bun run preview
```

Deployment is intentionally manual:

```bash
bun run deploy
```

No Vercel adapter or configuration is used.
