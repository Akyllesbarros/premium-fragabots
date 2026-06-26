export const WHATSAPP_NUMBER = "5527988482268";

type TrackingParams = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  gclid?: string | null;
};

export function getTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    gclid: params.get("gclid"),
  };
}

function decorateMessage(message: string) {
  const t = getTrackingParams();
  const tags = Object.entries(t)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join(" | ");
  return tags ? `${message}\n\n[ref: ${tags}]` : message;
}

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(decorateMessage(message))}`;
}

export function trackConversion(location: string, message?: string) {
  try {
    const payload = {
      event: "whatsapp_click",
      location,
      whatsapp_number: WHATSAPP_NUMBER,
      ...getTrackingParams(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
    w.dataLayer.push({ event: location });
    // eslint-disable-next-line no-console
    console.log("[FragaLandingPage]", "Conversion click", { location, message });
  } catch {
    /* no-op */
  }
}
