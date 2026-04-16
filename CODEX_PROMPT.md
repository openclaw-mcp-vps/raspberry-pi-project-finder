# Build Task: raspberry-pi-project-finder

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: raspberry-pi-project-finder
HEADLINE: Discover Raspberry Pi projects matching your interests
WHAT: None
WHY: None
WHO PAYS: None
NICHE: maker-tools
PRICE: $$7/mo

ARCHITECTURE SPEC:
A Next.js web app that curates and recommends Raspberry Pi projects based on user preferences like skill level, components, and interests. Users can filter projects, save favorites, and access premium project collections with detailed tutorials and component lists.

PLANNED FILES:
- app/page.tsx
- app/projects/page.tsx
- app/projects/[id]/page.tsx
- app/dashboard/page.tsx
- app/api/projects/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- components/ProjectCard.tsx
- components/ProjectFilter.tsx
- components/PricingCard.tsx
- lib/database.ts
- lib/lemonsqueezy.ts
- prisma/schema.prisma

DEPENDENCIES: next, react, tailwindcss, prisma, @prisma/client, @lemonsqueezy/lemonsqueezy.js, lucide-react, next-auth, @next-auth/prisma-adapter, zod

REQUIREMENTS:
- Next.js 15 with App Router (app/ directory)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (npx shadcn@latest init, then add needed components)
- Dark theme ONLY — background #0d1117, no light mode
- Lemon Squeezy checkout overlay for payments
- Landing page that converts: hero, problem, solution, pricing, FAQ
- The actual tool/feature behind a paywall (cookie-based access after purchase)
- Mobile responsive
- SEO meta tags, Open Graph tags
- /api/health endpoint that returns {"status":"ok"}

ENVIRONMENT VARIABLES (create .env.example):
- NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID
- NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID
- LEMON_SQUEEZY_WEBHOOK_SECRET

After creating all files:
1. Run: npm install
2. Run: npm run build
3. Fix any build errors
4. Verify the build succeeds with exit code 0

Do NOT use placeholder text. Write real, helpful content for the landing page
and the tool itself. The tool should actually work and provide value.


PREVIOUS ATTEMPT FAILED WITH:
Codex exited 1: Reading additional input from stdin...
OpenAI Codex v0.121.0 (research preview)
--------
workdir: /tmp/openclaw-builds/raspberry-pi-project-finder
model: gpt-5.3-codex
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: none
reasoning summaries: none
session id: 019d9501-2bcd-78c3-9b58-6f4190acf9bc
--------
user
# Build Task: raspberry-pi-project-finder

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: raspberry-pi-project-finder
HEADLINE
Please fix the above errors and regenerate.