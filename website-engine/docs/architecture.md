# Website Engine Architecture

## Goals
- Generate premium, config-driven websites from a single business data file.
- Keep every section modular and reusable for future business categories.
- Support AI-assisted workflow generation later through a clean, typed schema.

## Structure
- src/app: route-level application entry points.
- src/components/sections: business-page sections such as hero, services, gallery, FAQ, and appointment.
- src/components/ui: reusable design system primitives.
- src/config: business configuration source of truth.
- src/lib: utilities and helpers.
- src/types: shared TypeScript models.

## Extension Model
1. Update the business schema in src/types/business.ts.
2. Add new values in src/config/business.json.
3. Reuse or extend sections in src/components/sections.
4. Keep category-specific logic isolated from shared layout primitives.
