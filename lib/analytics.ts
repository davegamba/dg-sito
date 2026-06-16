declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export const fbqTrack = (event: string, params?: Record<string, unknown>) =>
  window.fbq?.("track", event, params);

export const gtagEvent = (event: string, params?: Record<string, unknown>) =>
  window.gtag?.("event", event, params);
