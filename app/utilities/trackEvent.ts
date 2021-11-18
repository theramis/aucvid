type GTagProperties = {
  event_category?: string;
  event_label?: string;
  value?: number;
};

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

interface WindowWithTracking {
  gtag: (name: string, action: string, properties: GTagProperties) => void;
}

const windowHasTracking = (w: unknown): w is WindowWithTracking =>
  typeof w !== "undefined" &&
  typeof (w as WindowWithTracking)?.gtag !== "undefined";

const trackEvent = ({ action, category, label, value }: GTagEvent): void => {
  if (windowHasTracking(window))
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
};

export default trackEvent;
