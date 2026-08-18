This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Copy `.env.example` to `.env.local` and provide deployment-specific values.

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
RESEND_API_KEY=re_your_sending_key
```

`NEXT_PUBLIC_POSTHOG_KEY` is the browser project token. `RESEND_API_KEY` is server-only and must never be exposed to client code or committed with a real value.

## Analytics

PostHog initializes in `instrumentation-client.ts` before hydration. The integration captures standard client analytics, page leave events, browser exceptions, and supports explicit conversion events through `lib/analytics.ts`. Analytics is fail-open: missing analytics configuration must never prevent the MORPH experience from loading.

## Validation

Pull requests to `main` run the release validation pipeline:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
```
