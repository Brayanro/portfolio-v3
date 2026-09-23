# Project Guide

## What this project is

This repository contains Brayan Rodriguez Montealegre's personal portfolio website. It presents his introduction, work experience, projects, skills, and biography, with Spanish and English content, light/dark themes, and responsive layouts.

## Stack and structure

- Astro renders a static site. The page entry point is `src/pages/index.astro`.
- Shared page structure and metadata live in `src/layouts/Layout.astro`.
- Page sections and reusable UI are Astro components in `src/components/`.
- Translated content is stored in `src/i18n/es.json` and `src/i18n/en.json`; locale behavior is in `src/i18n/index.ts`.
- Tailwind CSS v4 is integrated through `@tailwindcss/vite` in `astro.config.mjs`. Its CSS entry point is `src/styles/global.css`.
- Global visual styles, including the font and page background, are in the layout's global style block. Public assets are served from `public/`.

## Project conventions

- Keep page sections composable and reusable; put section-specific UI in the corresponding Astro component.
- Keep user-facing copy available in both locale files and use the existing `data-i18n` conventions when adding translatable content.
- Use Tailwind utilities for layout and component styling. With Tailwind v4, utilities are emitted in CSS cascade layers: avoid unlayered global resets or rules that override utility spacing/layout. Prefer Tailwind Preflight for base resets; put intentional custom base rules in an appropriate CSS layer.
- Preserve responsive behavior and both light and dark themes when changing styles.
- Use the existing npm scripts: `npm run dev` for local development, `npm run build` for Astro validation and a production build, and `npm run preview` to preview the built site.

## Commit messages

- Write all commit messages in English.
- Follow the Conventional Commits format: `<type>(optional-scope): <description>`.
- Use an imperative, concise description after the colon; add a body when the reason for a change needs context.

Examples: `feat(navbar): add language selector`, `fix(tailwind): restore utility styles after migration`, `chore(deps): update Astro packages`.
