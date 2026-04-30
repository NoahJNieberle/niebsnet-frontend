# Analytics Events

NiebsNet uses PostHog through `src/app/analytics/analytics.service.ts`. Keep event names stable so dashboards do not break.

## Core Events

| Event | When It Fires | Key Properties |
| --- | --- | --- |
| `$pageview` | Initial load and Angular route changes | `path`, `page_type`, `title`, `url` |
| `scroll_depth` | Visitor reaches 25%, 50%, 75%, or 100% scroll depth on a route | `depth_percent`, `path`, `page_type` |
| `section_view` | A tracked page section becomes visible | `section_id`, `section_name`, `path` |
| `navigation_click` | Top navigation section link clicked | `section_id` |
| `mobile_navigation_toggle` | Mobile menu opened or closed | `state` |
| `logo_click` | Navbar logo clicked | `destination` |

## Project Events

| Event | When It Fires | Key Properties |
| --- | --- | --- |
| `project_archive_view` | Project archive route initializes | `project_count` |
| `project_archive_click` | Homepage archive CTA clicked | `source` |
| `project_click` | Project card title or image clicked | `project_slug`, `project_title`, `source`, `interaction` |
| `project_detail_view` | A project detail route resolves successfully | `project_slug`, `project_title` |
| `project_not_found` | A bad project slug redirects to the archive | `requested_slug` |
| `report_download` | Report download link clicked | `project_slug`, `report_title` |

## Link And Error Events

| Event | When It Fires | Key Properties |
| --- | --- | --- |
| `contact_click` | Email CTA clicked | `contact_type`, `email_domain` |
| `outbound_link_click` | External project link clicked | `link_label`, `link_host` |
| `back_navigation_click` | Back link clicked from archive or detail pages | `source`, `destination` |
| `$exception` | PostHog/Angular captures a frontend exception | `source` |

## Privacy Notes

- Do not include email addresses, tokens, or backend data in event properties.
- Session replay samples 5% of sessions and masks all form inputs.
- The PostHog project token is injected from the `POSTHOG_PROJECT_TOKEN` GitHub Actions secret during deployment.
