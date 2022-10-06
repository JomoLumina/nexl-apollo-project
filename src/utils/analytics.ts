import { GoogleAnalyticsData } from '../types/GoogleAnalyticsData';

declare const window: any;

const track = (...args: any[]): void => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (!window.gtag) {
    return;
  }

  window.gtag(...args);
};

const pageview = (props: any): void => {
  track('config', process.env.REACT_APP_GA_MEASUREMENT_ID, props);
};

const event = (type: string, props: Record<string, any>) => {
  track('event', type, props);
};

const  sendToAnalytics = (gad: GoogleAnalyticsData) => {
  window.gtag('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: gad.name,
    eventValue: Math.round(gad.name === 'CLS' ? gad.value * 1000 : gad.value),
    eventLabel: gad.id, 
    nonInteraction: true, 
  });
}

const analytics = {
  sendToAnalytics,
  pageview,
  event
};

export default analytics;
