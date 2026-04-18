# FashionHub

A mobile-first fashion e-commerce app featuring a full product-detail flow — browse products, select size and colour, add to cart, and place an order.

**Stack:** React 19 · Next.js 16 · TypeScript 5 · Tailwind CSS 4

**🎥 Demo Video:** [Watch the demo screencast here](https://drive.google.com/file/d/1FpRkX_GPqz9JAZ5NHSj8IlIuW9AqpnI7/view?usp=sharing)

---

## Run Locally

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Clone the repo
git clone https://github.com/chamod-malindu/fashionhub.git
cd fashionhub

# 2. Install dependencies
npm install

# 3. Copy env template
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open **http://localhost:3000** — the app is built for a 390 px mobile viewport.  
Use Chrome DevTools → **iPhone 14 Pro** for the intended experience.

---

## Build

```bash
npm run build   # Compile production bundle
npm start       # Start the production server
```

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at **vercel.com/new** — Vercel auto-detects Next.js and deploys with zero config.

> **Note:** The app uses an in-memory store. Vercel serverless functions are stateless, so the cart resets between cold starts. To persist data, swap `src/lib/store.ts` for a lightweight DB (e.g. Vercel KV / Upstash Redis).

---

## Environment Variables

Copy `.env.example` to `.env.local` before running locally.

```bash
cp .env.example .env.local
```

No external API keys or database URLs are required — see `.env.example` for details.

---

## Data Seeding

Products are seeded automatically at server start in [`src/lib/store.ts`](./src/lib/store.ts).  
No migration scripts or manual steps are needed.

**Seeded products:**

| ID | Name | Price | Category |
|---|---|---|---|
| `prod_001` | Tagerine Shirt | $240.32 | Men |
| `prod_002` | Leather Coart | $325.36 | Women |
| `prod_003` | Tagerine Shirt | $126.47 | Men |
| `prod_004` | Leather Coart | $257.85 | Men |
| `prod_005` | Premium Tagerine Shirt | $257.85 | Men |

**Seeded user:** `MOCK_USER_ID = "user_test_001"` (in `src/lib/mock-auth.ts`) — no login required.

---

## API Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | All products; supports `?category=Men` filter |
| `GET` | `/api/products/:id` | Single product by ID |
| `GET` | `/api/cart` | Current cart for the seeded user |
| `POST` | `/api/cart` | Add item to cart (merges duplicates by product+size+colour) |
| `POST` | `/api/orders` | Create order from cart, simulate payment, clear cart |

### Quick test

```bash
# Add to cart
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"prod_005","name":"Premium Tagerine Shirt","image":"/images/shirt-2.jpg","color":"Yellow","size":"L","price":257.85,"quantity":1}'

# Place order
curl -X POST http://localhost:3000/api/orders
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                   # Splash / landing screen
│   ├── layout.tsx                 # Root layout — Nunito font, mobile container
│   ├── globals.css                # Tailwind v4 import + global resets
│   ├── explore/page.tsx           # Product grid with category filter
│   ├── products/[id]/page.tsx     # Product detail — image, size, colour, Add To Cart
│   ├── cart/page.tsx              # My Orders — cart items + order summary
│   ├── checkout/page.tsx          # Checkout — address, payment, Pay Now
│   └── api/
│       ├── products/route.ts      # GET /api/products
│       ├── products/[id]/route.ts # GET /api/products/:id
│       ├── cart/route.ts          # GET + POST /api/cart
│       └── orders/route.ts        # POST /api/orders
├── components/
│   ├── BottomNav.tsx              # Tab bar with live cart badge
│   ├── ProductCard.tsx            # Grid card with quick-add button
│   ├── SizeSelector.tsx           # Size pill selector
│   ├── ColorSwatch.tsx            # Colour dot selector
│   └── OrderSummary.tsx           # Total Items / Delivery / Total Payment
├── lib/
│   ├── store.ts                   # In-memory products, cart, and orders
│   └── mock-auth.ts               # Seeded MOCK_USER_ID
└── types/
    └── index.ts                   # Product, Cart, CartItem, Order, ApiResponse<T>
```

---

## Decisions & Shortcuts

| Decision | Rationale |
|---|---|
| **In-memory store** | No external DB needed; easy to swap by replacing `store.ts` |
| **Seeded mock user** | Simulates an authenticated user without OAuth complexity |
| **Lucide React icons** | Consistent, clean icons matching the Figma design with minimal code |
| **Nunito font** | Matches the design's rounded, friendly sans-serif style via `next/font/google` |
| **Tailwind CSS v4** | Uses `@import "tailwindcss"` (v4 syntax) — the `@tailwind` directives are deprecated |
| **Carousel dots static** | One image per product in the data — swipe logic omitted as out of scope |
| **No session cookies** | Single seeded user demo; adding `iron-session` would be the next step for multi-user support |
