export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
};

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;

  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer ?? [];
  dataLayer.push({ event: eventName, ...params });
  (window as typeof window & { dataLayer?: unknown[] }).dataLayer = dataLayer;
}

export function isAnalyticsConfigured() {
  return Boolean(analyticsConfig.gaMeasurementId || analyticsConfig.gtmId);
}
