# NiebsNet Component Skills

Use this guide when changing or adding components in this Angular portfolio frontend. The goal is to keep the public site static, predictable, and safe to deploy to GitHub Pages.

## Shared Rules

- Keep project content in `src/app/data/projects.data.ts`; components should render the data instead of duplicating project arrays or labels.
- Keep homepage copy in `src/app/data/home.data.ts`; avoid hardcoding portfolio copy directly inside templates.
- Use relative asset paths such as `nmlogo.jpg` or `reports/example/page-1.jpg` so GitHub Pages base href deployment continues to work.
- Use Angular interpolation and property bindings for user-visible content. Do not introduce `innerHTML`, sanitizer bypasses, dynamic script injection, or browser storage for secrets.
- Any external link opened in a new tab must include `rel="noopener noreferrer"`.

## App Shell

- `src/app/app.ts` owns fixed navigation, the footer, and the routed outlet.
- Keep global navigation behavior here. Page-level components should not duplicate the main nav.
- If adding a new top-level nav item, route it in `src/app/app.routes.ts` and make sure the target section or route exists.

## Home Page

- `src/app/home/home.component.ts` composes the about, experience, projects, and contact sections.
- Update home content through `homeData`, not template literals.
- Keep public contact behavior as `mailto:` only; do not add private backend calls from this public frontend.

## Project Cards

- `src/app/components/project-card/project-card.component.ts` is the reusable summary component for project lists.
- Pass a complete `Project` object through `[project]`.
- Use `getProjectStatusLabel` and `getProjectStatusClass` from `projects.data.ts`; do not recreate status switch statements in templates.

## Project Lists

- `src/app/sections/projects-section/projects-section.component.ts` is the homepage project section and should use `orderedProjects`.
- `src/app/projects-archive/projects-archive.component.ts` is the full project archive and should use `projects`.
- Track repeated projects by `project.slug`, not title, so title changes do not disturb Angular list identity.

## Project Details

- `src/app/project-detail/project-detail.component.ts` resolves the active project through `getProjectBySlug`.
- Keep optional sections guarded in the template with `@if` so incomplete project records still render cleanly.
- Reports belong under `public/reports/...` and should be referenced from the project data object.

## Security Checks Before Publishing

- Run `npm audit --omit=dev`.
- Search for `innerHTML`, `bypassSecurityTrust`, `eval`, `localStorage`, `sessionStorage`, and hardcoded secrets.
- Build with the GitHub Pages base href: `npm run build:prod -- --base-href=/niebsnet-frontend/`.
