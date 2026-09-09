# TheDark8 Tech

Digital Growth x Technology x Automation.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file:
   ```bash
   copy .env.example .env.local
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Create a `.env.local` file based on `.env.example`.

Required:
- `NEXT_PUBLIC_SITE_URL`: canonical production site URL used for metadata.

Lead delivery:
- `HUBSPOT_PRIVATE_APP_TOKEN`: server-only HubSpot private app token.
- `RESEND_API_KEY`: server-only Resend API key.
- `RESEND_FROM_EMAIL`: verified sender address for Resend.
- `RESEND_TO_EMAIL`: notification recipient address.
- `CONTACT_WEBHOOK_URL`: optional additional endpoint for form submissions.

This project is intentionally set up to avoid exposing secrets in client code. The contact form validates input server-side before forwarding any submission.

## Routes

The site includes the homepage, services, industries, work, process, about, pricing, resources, blog, free growth audit, contact, and draft legal pages. Placeholder content remains where real business proof has not yet been supplied.

## Recommended production checklist

- Replace draft legal pages with reviewed legal copy before public launch.
- Add real case studies, testimonials and imagery when available.
- Add valid social media and contact links once approved.
- Use a real provider-side analytics and consent setup if you launch tracking.
- Configure a secure outbound webhook for form submissions.
