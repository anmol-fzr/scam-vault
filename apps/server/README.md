# ScamVault API Server

The serverless backend for ScamVault, built with **Hono** and deployed via **Cloudflare Workers**.

### 📚 Features

- API key-based access (via Better Auth)
- Scam report APIs
- Category metadata
- Scalar-powered OpenAPI UI
- Rate-limited usage tracking

### 🛠 Tech Stack

- Hono (Cloudflare Worker)
- Drizzle ORM
- Turso (SQLite-based edge DB)
- Better Auth (GitHub OAuth + API keys)
- Bun + Turborepo
