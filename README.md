# SDM-Tracker — Netlify preview

## Deploy to Netlify

The configured Netlify publish directory is `netlify-app/`. It contains a standalone HTML/CSS/JavaScript SDM Tracker preview and requires no build command or package installation.

1. Review and merge [Pull Request #1](https://github.com/scotthcr/SDM-Tracker/pull/1) into `main`.
2. In Netlify, choose **Add new project → Import an existing project** and connect this GitHub repository.
3. Use the `main` branch. The `netlify.toml` file sets the publish directory to `netlify-app`; leave the build command empty.
4. After deployment, open the generated Netlify URL and verify navigation, adding/editing incidents, adding projects/SDMs, filters and exports.

## What works in this preview

- Operations dashboard with incident metrics, priority watchlist, project milestones and SDM capacity.
- Incident register with search and filters, add/update incident forms, and status/priority fields.
- Project and SDM register forms.
- CSV export for incidents and JSON backup/import for all preview data.
- Browser-local persistence through `localStorage`, responsive layout and no external runtime dependencies.

## Important limitations

This is a **static prototype**. Data is stored in the current browser only; it is not shared between users or devices, and it may be cleared by browser settings. It has no production login, server-side authorization, shared database, audit trail, or backend API. The example records are illustrative and should be reviewed before use.

Do not store confidential customer information, production incident details, credentials or personal data in this preview. The `noindex` headers reduce search indexing but do not make a public URL private. For production, connect a secure backend and database, implement authentication and authorization server-side, and test access controls and data retention.

The original `09_DANIEL_PROYECTO/` files are retained for reference; Netlify now publishes the standalone preview from `netlify-app/`.
