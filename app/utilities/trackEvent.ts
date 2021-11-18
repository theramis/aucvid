type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

const trackEvent = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export default trackEvent;
