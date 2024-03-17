
export const trackPageView = page_path => {
  if (isTracking) {
    const details = { page_path };
    gtag('config', 'G-83KNBLJ583', details);
  }
};

export const trackEvent = (action, category, label, value) => {
  if (isTracking) {
    const details = {
      event_category: category,
      event_label: label,
      value: value,
    };
    gtag('event', action, details);
  }
};
