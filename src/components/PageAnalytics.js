import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from 'utils';

const PageAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export default PageAnalytics;