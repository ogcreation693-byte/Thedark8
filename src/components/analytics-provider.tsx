"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsConfig, isAnalyticsConfigured } from "@/lib/analytics";

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setConsent(window.localStorage.getItem("thedark8-analytics-consent")), 0);
    const handleConsent = (event: Event) => setConsent((event as CustomEvent<string>).detail);
    window.addEventListener("thedark8-consent", handleConsent);
    return () => { window.clearTimeout(timer); window.removeEventListener("thedark8-consent", handleConsent); };
  }, []);

  if (!isAnalyticsConfigured() || consent !== "accepted") return null;

  return (
    <>
      {analyticsConfig.gtmId ? (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      ) : null}
      {analyticsConfig.gaMeasurementId ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`}
          strategy="afterInteractive"
        />
      ) : null}
      {analyticsConfig.gaMeasurementId ? (
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.gaMeasurementId}');
          `}
        </Script>
      ) : null}
    </>
  );
}
