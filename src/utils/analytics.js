import { v4 as uuidv4 } from 'uuid';

const postEvent = (data) =>
  fetch('api/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

const getSessionId = () => {
  let sId = sessionStorage.getItem('sessionId');
  if (!sId) {
    sId = uuidv4();
    sessionStorage.setItem('sessionId', sId);
  }

  return sId;
}

export const trackPageView = page_path => {
  if (isTracking) {
    const sessionId = getSessionId();
    const details = { page_path };
    postEvent({ type: 'page_view', details, sessionId });
    gtag('config', 'G-83KNBLJ583', details);
  }
};

export const trackEvent = (action, category, label, value) => {
  if (isTracking) {
    const sessionId = getSessionId();
    const details = {
      event_category: category,
      event_label: label,
      value: value,
    };
    postEvent({ type: action, details, sessionId });
    gtag('event', action, details);
  }
};
