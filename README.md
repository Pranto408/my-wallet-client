# MyWallet — Client

**MyWallet** is an AI-powered personal finance tracker that helps you manage budgets, log transactions, and understand your spending through Gemini-powered insights. This repository contains the **frontend** (Next.js + TypeScript).

🔗 **Live App:** [https://my-wallet-client-smoky.vercel.app](https://my-wallet-client-smoky.vercel.app)

🔗 **Backend Repo:** [MyWallet-Server](https://github.com/Pranto408/my-wallet-server)

---

## ✨ Features

- **Landing page** — hero, features, how-it-works, stats, testimonials, pricing, FAQ
- **Authentication** — email/password, one-click demo login, Google OAuth
- **Dashboard** — budget-vs-spent cards, category breakdown chart (Recharts), recent transactions
- **Transactions** — add, search, filter, sort, paginate, view details, delete
- **Budgets** — set and edit monthly limits per category
- **AI Data Analyzer** — Gemini-generated spending insights, budget alerts, and savings recommendations
- **AI Auto-Classification** — transaction category suggested automatically as you type
- Fully responsive, dark-themed UI with Framer Motion animations

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Data fetching:** TanStack Query (React Query)
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP client:** Axios

## 🚀 Getting Started (Local Development)

```bash
git clone https://github.com/Pranto408/my-wallet-client.git
cd my-wallet-client
npm install
```

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`. Make sure the [backend](https://github.com/Pranto408/my-wallet-server) is running locally on port `5000` as well.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/
│   ├── ai-analyzer/
│   ├── auth/callback/
│   ├── budgets/
│   ├── contact/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── transactions/
├── components/           # Navbar, Footer, shared UI primitives
├── context/               # AuthContext (JWT + user session)
└── lib/                   # Axios API client
```

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |
