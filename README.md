# SystemMindz — Official Website

Modern agency website for SystemMindz built with React 18, Vite, Tailwind CSS, and Framer Motion. Features a smart navbar, full-screen animated menu, six routed pages, and a contact form powered by Zepto Mail via an Express backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router DOM v6 |
| Styling | Tailwind CSS v3, Custom CSS variables |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Build Tool | Vite 5 |
| Backend | Express 4 (API server) |
| Email | Zepto Mail via Axios |
| Fonts | Inter (body), Space Grotesk (brand logo) |

---

## Project Structure

```
systemmindz/
├── public/
│   ├── favicon.png
│   └── about.png
├── server/                         # Express API server (CommonJS)
│   ├── package.json                # Forces CommonJS for server files
│   ├── index.js                    # Entry point — POST /api/contact
│   ├── emailService.js             # Zepto Mail sender (dynamic config)
│   ├── config.js                   # Reads env vars for auth service
│   └── utils/
│       └── buildHttpsAgent.js      # HTTPS agent factory
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Router with all routes
│   ├── index.css                   # Tailwind directives + global styles
│   ├── components/
│   │   ├── About/                  # About section (home page)
│   │   ├── Blog/                   # Blog/Publications section
│   │   ├── BrandSlider/            # Partner logos carousel
│   │   ├── Footer/                 # Site footer with nav links
│   │   ├── MenuOverlay/            # Full-screen animated menu
│   │   ├── Navbar/                 # Fixed smart navbar (hide/show on scroll)
│   │   ├── Polytope/               # 3D animated wireframe decoration
│   │   ├── Preloader/              # Initial page load animation
│   │   ├── ScrollIndicator/        # Circular scroll indicator
│   │   ├── Services/               # Services section (home page)
│   │   ├── Team/                   # Team section (home page)
│   │   ├── Testimonials/           # Testimonials carousel
│   │   └── ui/                     # Reusable UI: Button, Card, Badge, Input
│   ├── context/
│   │   └── ThemeContext.jsx        # Theme provider and hook
│   ├── hooks/
│   │   ├── useMediaQuery.js        # Responsive breakpoint hook
│   │   └── useToggle.js            # Boolean toggle hook
│   ├── layouts/
│   │   └── RootLayout.jsx          # Shared layout: Navbar + Outlet + Footer
│   ├── pages/
│   │   ├── Home.jsx                # Landing page (/)
│   │   ├── Portfolio.jsx           # Portfolio page (/portfolio)
│   │   ├── Services.jsx            # Services page (/services)
│   │   ├── Projects.jsx            # Projects / case studies (/projects)
│   │   ├── OurClients.jsx          # Clients + testimonials (/our-clients)
│   │   ├── Contact.jsx             # Contact form (/contact)
│   │   ├── About.jsx               # About page (/about)
│   │   └── NotFound.jsx            # 404 page
│   └── utils/
│       └── helpers.js              # cn(), formatNumber(), truncate(), sleep()
├── .env                            # Environment variables (not committed)
├── index.html                      # HTML shell + Google Fonts
├── vite.config.mjs                 # Vite config with path aliases + proxy
├── tailwind.config.js              # Custom colors, fonts, animations
├── postcss.config.js
└── package.json
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero, About, Services, Team, Testimonials, Blog |
| `/portfolio` | Portfolio | Filterable project cards (All / Web / AI / Mobile) |
| `/services` | Services | Service list with tech stacks + 4-step process |
| `/projects` | Projects | Featured case study + numbered project list |
| `/our-clients` | Our Clients | Stats, client grid, testimonials |
| `/contact` | Contact | Contact form with Zepto Mail integration |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### 1. Clone and Install

```bash
git clone https://github.com/your-org/systemmindz.git
cd systemmindz
npm install
```

### 2. Configure Environment Variables

Copy the example and fill in your values:

```bash
cp .env .env.local
```

Edit `.env` (or `.env.local`):

```env
# Express API server port
SERVER_PORT=4000

# Zepto Mail — direct config (required for contact form)
ZEPTO_API_KEY=Zoho-enczapikey xxxxxxxxxxxxxxxxxxxxxxxx
ZEPTO_FROM_EMAIL=noreply@systemmindz.com
ZEPTO_FROM_NAME=SystemMindz
ZEPTO_API_URL=https://api.zeptomail.in/v1.1/email

# Inbox that receives contact form submissions
CONTACT_RECIPIENT_EMAIL=hello@systemmindz.com

# Optional: fetch Zepto config from a superadmin backend instead of env vars
# AUTH_SERVICE_URL=https://your-backend.com
# INTERNAL_SERVICE_TOKEN=your-internal-token
```

> Get your Zepto Mail API key from [zeptomail.com](https://www.zeptomail.com) → Settings → API Tokens.
> The `ZEPTO_FROM_EMAIL` must be a verified sender domain in your Zepto account.

---

## Commands

### Development

```bash
# Run frontend only (Vite on port 3000)
npm run dev

# Run API server only (Express on port 4000)
npm run server

# Run both together (recommended)
npm run dev:full
```

> The Vite dev server proxies all `/api/*` requests to `http://localhost:4000`
> so the contact form works seamlessly in development.

### Production Build

```bash
# Build frontend for production
npm run build

# Preview the production build locally
npm run preview
```

Output is in the `dist/` folder.

### Linting

```bash
npm run lint
```

---

## Email — How It Works

The contact form (`/contact`) sends a POST request to `/api/contact` which is handled by the Express server.

```
Browser  →  POST /api/contact  →  Vite proxy  →  Express :4000  →  Zepto Mail API
```

**Email config priority:**
1. If `ZEPTO_API_KEY` + `ZEPTO_FROM_EMAIL` are set in `.env` → uses them directly.
2. If `AUTH_SERVICE_URL` is set → fetches config dynamically from your Superadmin backend (`GET /superadmin/settings/email`).

The contact email is sent to `CONTACT_RECIPIENT_EMAIL` with the enquirer CC'd automatically.

---

## Path Aliases

Configured in `vite.config.mjs` for clean imports:

| Alias | Resolves To |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@pages` | `src/pages/` |
| `@hooks` | `src/hooks/` |
| `@utils` | `src/utils/` |
| `@assets` | `src/assets/` |
| `@layouts` | `src/layouts/` |
| `@context` | `src/context/` |

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `orange-500` | `#f97316` | Primary accent, CTAs, active states |
| `white` | `#ffffff` | Text on dark sections |
| `black` | `#000000` | Dark section backgrounds |
| `white/40` | `rgba(255,255,255,0.4)` | Muted text on dark |
| `black/40` | `rgba(0,0,0,0.4)` | Muted text on light |

### Typography

- **Body:** Inter (300–900 weight)
- **Brand Logo:** Space Grotesk 700
- **Headings:** Mix of `font-bold` + `font-extralight` with `tracking-tight`
- **Labels:** 10–11px, `uppercase`, `tracking-widest`

### Section Pattern

Pages alternate between dark and light sections:

```
Dark  → bg-black, text-white, accent orange-500
Light → bg-white, text-black, accent orange-500
```

---

## Key Features

- **Smart Navbar** — hides on scroll down, reappears on scroll up with `cubic-bezier` easing
- **Dynamic Nav Color** — switches between white/black based on the section currently in view via `IntersectionObserver`
- **Full-Screen Menu** — clip-path circle animation with staggered nav item reveals (Framer Motion)
- **Active Route Highlighting** — menu uses `useLocation()` to highlight current page in orange
- **Scroll-Aware** — all page sections use `whileInView` animations that trigger once on scroll
- **3D Polytope** — animated wireframe decoration used as background element across all pages
- **Contact Form** — real-time validation, budget selector, loading/success/error states, Zepto Mail delivery

---

## Deployment

### Frontend (Vercel / Netlify)

```bash
npm run build
# deploy the dist/ folder
```

Set these environment variables in your hosting dashboard — they are only needed by the Express server, not Vite.

### API Server

The Express server (`server/index.js`) must be deployed separately as a Node.js service (Railway, Render, Fly.io, VPS, etc.):

```bash
node server/index.js
```

Then update the Vite proxy target in `vite.config.mjs` (dev) and your frontend's fetch URL (prod) to point to the deployed server URL.

---

## Browser Support

Targets modern browsers (Chrome, Firefox, Safari, Edge — latest 2 versions). No IE support.

---

## License

Private — All rights reserved. © 2025 SystemMindz.
