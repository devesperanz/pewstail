# Paws & Tail Boutique

A modern pet boutique storefront built with React, TypeScript, and Tailwind CSS. Features a full shopping experience with cart, checkout, and order confirmation emails.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **EmailJS** for order confirmation emails
- **Vite** for bundling

---

## Features

- Shop page with category filtering and search
- Product grid with add-to-cart
- Slide-out cart drawer
- Full checkout form (contact, shipping, payment)
- Order confirmation email sent via EmailJS
- Our Mission page
- Privacy, Legal Terms, and Carbon Report pages
- Fully responsive — mobile, tablet, and desktop
- Lazy-loaded pages and code-split vendor chunks

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`

---

## Project Structure

```
src/
├── App.tsx                  # Root layout, routing, state
├── constants.ts             # Product data
├── types.ts                 # TypeScript interfaces
└── components/
    ├── HeroSection.tsx
    ├── ProductGrid.tsx
    ├── ProductCard.tsx
    ├── CartDrawer.tsx
    ├── CheckoutPage.tsx     # EmailJS integration
    ├── RealisticPet.tsx
    ├── MissionPage.tsx
    ├── PrivacyPage.tsx
    ├── LegalPage.tsx
    └── CarbonPage.tsx
```

---

## Email Setup (EmailJS)

Order confirmation emails are sent through [EmailJS](https://emailjs.com). Credentials live in `CheckoutPage.tsx`:

```ts
const SERVICE_ID  = 'service_m8ob9mb';
const TEMPLATE_ID = 'template_mdt8i75';
const PUBLIC_KEY  = 'K9gyxDoAN6WCEcbFl';
```

Template variables used:

| Variable | Description |
|---|---|
| `{{to_email}}` | Customer email address |
| `{{first_name}}` / `{{last_name}}` | Customer name |
| `{{order_items}}` | Line items, one per row |
| `{{subtotal}}` / `{{shipping}}` / `{{tax}}` / `{{total}}` | Order totals |
| `{{address}}` / `{{city}}` / `{{state}}` / `{{zip}}` / `{{country}}` | Shipping address |

---

## Build

```bash
npm run build   # production build → dist/
npm run preview # preview the production build locally
```
