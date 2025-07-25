# ScamVault API 🔐

A free, public API that collects and shares information about ongoing scams, helping developers and platforms protect users from fraud.

This project follows a monorepo architecture managed with **Turborepo**, powered by **Bun** as the package manager and runtime.

## 🛠️ Tech Stack

- ⚡ Hono (Cloudflare Workers)
- 🌎 Turso (SQLite at the edge)
- 🧠 Drizzle ORM
- 🔐 Better Auth
- 🧪 Postman for API documentation
- 🌐 React (dashboard)
- 🎨 TailwindCSS (shadcn/ui)

## 📁 Project Structure

scam-vault/
<br />
├── apps/
<br />
│ ├── api/ ← Hono server (Cloudflare Worker)
<br />
│ └── web/ ← Frontend: React dashboard
<br />
├── turbo.json ← Turborepo config
<br />
├── package.json
<br />
└── README.md


## 📦 Local Development

```bash
bun install

# Run Both API server & Dashboard
bun run dev

```
