import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thedark8.com";

export const metadata: Metadata = {
  title: "TheDark8 Tech | Digital Growth x Technology x Automation",
  description:
    "TheDark8 Tech builds connected digital systems that attract, convert and retain customers.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TheDark8 Tech",
    description: "Digital Growth x Technology x Automation.",
    url: siteUrl,
    siteName: "TheDark8 Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TheDark8 Tech",
    description: "Digital Growth x Technology x Automation.",
  },
  icons: {
    icon: [
      { url: "/Fav icon.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/Fav icon.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/Fav icon.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/Fav icon.png?v=3", type: "image/png", sizes: "180x180" }],
  },
  other: {
    "application-name": "TheDark8 Tech",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TheDark8 Tech",
  url: siteUrl,
  description: "Digital growth, technology and automation for connected customer acquisition systems.",
  areaServed: ["Coimbatore", "Tamil Nadu", "India"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <AnalyticsProvider />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
