declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

let initialized = false;

function loadScript(src: string, id: string): void {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initGA(): void {
  if (!GA_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
  });

  loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`,
    "lexaudit-ga4",
  );
}

function initClarity(): void {
  if (!CLARITY_ID) return;

  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

  if (!window.clarity) {
    const stub: ClarityFn = (...args: unknown[]) => {
      stub.q = stub.q || [];
      stub.q.push(args);
    };
    window.clarity = stub;
  }

  loadScript(
    `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`,
    "lexaudit-clarity",
  );
}

export function trackPageView(
  path = window.location.pathname + window.location.search,
  title = document.title,
): void {
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {},
): void {
  window.gtag?.("event", name, parameters);
}

export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  initGA();
  initClarity();
  trackPageView();

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const element = target?.closest<HTMLElement>("[data-analytics-event]");
    if (!element) return;

    trackEvent(element.dataset.analyticsEvent ?? "cta_click", {
      page_path: window.location.pathname,
      page_language: document.documentElement.lang || "unknown",
      cta_location: element.dataset.analyticsLocation ?? "unknown",
      destination:
        element instanceof HTMLAnchorElement ? element.href : "button",
    });
  });
}