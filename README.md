# TP ORCA AI

**Transfer Pricing Risk & Controls Intelligence**

Generate ORCA-based transfer pricing risk, control, testing, and evidence frameworks in minutes. Purpose-built for tax, audit, and risk professionals.

---

## What is TP ORCA AI?

TP ORCA AI applies the **Objective → Risk → Control Activities → Audit/Testing** methodology to transfer pricing governance. It helps teams structure risks, controls, evidence, and testing procedures for:

- Double taxation and MAP escalation
- APA lifecycle management
- Benchmarking governance and true-ups
- Documentation readiness (local file, master file, CbCR)
- Economic substance assessment
- Intercompany agreement review

---

## Quick Start

### 1. Install dependencies

```bash
cd tp-orca-ai
npm install
```

### 2. Set up your API key (optional)

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

> **No API key?** The app runs in **demo mode** automatically — it uses high-quality built-in mock output so every page and feature still works. You will see a "Demo Mode" badge on output.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| Path | Description |
|------|-------------|
| `/` | Home page — product overview and ORCA methodology summary |
| `/agent` | Main agent — input form + generated ORCA framework output |
| `/about` | About page — methodology, use cases, and positioning |

---

## Features

- **8-section ORCA output** — Business Objective, Key Risks, Controls, Testing, Evidence, Red Flags, Monitoring, Executive Summary
- **Copy button** on every output section
- **Export as Markdown** — downloads the full framework as a `.md` file
- **Demo mode** — works without an API key using pre-built IP licensing / US-Ireland example
- **AI mode** — connects to Claude claude-opus-4-7 via the Anthropic API for scenario-specific generation

---

## Project Structure

```
tp-orca-ai/
├── app/
│   ├── page.tsx              # Home page
│   ├── agent/page.tsx        # Agent page
│   ├── about/page.tsx        # About page
│   ├── api/generate/route.ts # API route (Anthropic or mock)
│   ├── layout.tsx            # Root layout with Navbar
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── ORCAForm.tsx          # Input form component
│   ├── ORCAOutput.tsx        # Full output display component
│   ├── SectionCard.tsx       # Reusable card with copy button
│   └── Badge.tsx             # Severity / type badges
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── prompt.ts             # System prompt and user prompt builder
│   └── mockData.ts           # Demo mode output (IP licensing, US-Ireland)
├── .env.local.example        # Environment variable template
└── README.md
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Anthropic API key. If absent, demo mode is used. |

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Anthropic API** (claude-opus-4-7)

---

## Disclaimer

This tool is for workflow and control design support only. All output should be reviewed by a qualified transfer pricing professional. TP ORCA AI does not provide legal or tax advice.
