# Technical candidate starter

## What this starter is

This is a deliberately small foundation for a technical candidate exercise—not a reference
solution. It removes basic setup friction while leaving the product, platform, and architecture
decisions that candidates are expected to make.

The repository proves only that the supplied SDK can be loaded in a Next.js server context,
a catalogue card can be validated and mapped to a runtime manifest, and Amazon Bedrock adapters
can be assembled behind an opt-in server endpoint.

It does **not** implement product flows, a chat experience, persistence, authentication,
checkout, creator tooling, email, infrastructure as code, or production AWS architecture.

## Run locally

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The shell does not require AWS credentials and does not invoke
a model.

## Optional Bedrock smoke test

Copy `.env.example` to `.env.local`, choose a Bedrock model enabled in your AWS account and
region, and provide credentials through the standard AWS SDK credential chain. Do not place
credentials in the environment file.

Set `ENABLE_BEDROCK_SMOKE_TEST=true`, start the app, then make one server-side request:

```bash
curl -X POST http://localhost:3000/api/smoke \
  -H "content-type: application/json" \
  -d '{"cardId":"atlas","prompt":"Reply with a one-sentence readiness check."}'
```

This endpoint is intentionally disabled by default because it makes paid Bedrock calls. It
uses ephemeral memory and a random conversation ID; it is a wiring check, not application
architecture.

## Repository map

```text
src/app/                 minimal Next.js shell and opt-in smoke route
src/lib/config.ts        validated server-side environment boundary
src/lib/catalog.ts       catalogue-card to runtime-manifest adapter
src/lib/bedrock.ts       ephemeral SDK / Bedrock runtime factory
```

## Deliberately absent

- Product flows and finished UI
- Data model and durable memory strategy
- Authentication, authorization, and tenant isolation
- Payments and creator tooling
- Infrastructure as code and deployment topology
- Rate limits, abuse controls, audit trail, telemetry, and cost controls

Those decisions are part of the exercise. The starter should reduce setup friction without
pre-solving the work used to assess a candidate.

## Checks

```bash
npm run check
```

The package uses the SDK's shipped TypeScript declarations; no separate `@types` package is
required.
