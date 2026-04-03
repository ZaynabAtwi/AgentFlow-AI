# AgentFlow AI

AgentFlow AI is a full-stack SaaS MVP for AI agencies to discover leads, generate business-specific AI chat agents, launch outreach campaigns, and track conversions.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn-inspired components
- Prisma + PostgreSQL
- NextAuth (credentials + Google OAuth)
- OpenAI API for agent generation and enrichment
- SerpAPI for leads, Resend/Twilio for outreach
- BullMQ-ready job queue abstraction

## Quick start
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start dev server: `npm run dev`

## Security highlights
- JWT sessions with NextAuth
- RBAC and tenant checks on API routes
- Zod request validation
- API rate limiting middleware
- Audit logging table

## Notes
- This repository provides an MVP foundation with production-minded architecture.
- External integrations gracefully fallback when API keys are missing.
