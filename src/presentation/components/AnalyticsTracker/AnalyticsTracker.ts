import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { Analytics } from 'firebase/analytics';

interface AnalyticsTrackerProps {
  analytics: Analytics;
}

export function AnalyticsTracker({ analytics }: AnalyticsTrackerProps) {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', { page_path: location.pathname });
  }, [analytics, location]);

  return null;
}
