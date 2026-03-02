import { supabase } from "@/integrations/supabase/client";

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (action: string, eventName: string, params?: Record<string, any>) => void;
  }
}

export const trackFacebookEvent = async (
  eventName: string,
  eventData?: Record<string, any>,
  userData?: {
    email?: string;
    phone?: string;
    event_source_url?: string;
  }
) => {
  try {
    // Track with Facebook Pixel (browser)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, eventData);
    }

    // Track with Conversion API (server-side)
    const { data, error } = await supabase.functions.invoke('facebook-conversion', {
      body: {
        eventName,
        eventData,
        userData: {
          ...userData,
          event_source_url: window.location.href,
        },
      },
    });

    if (error && import.meta.env.DEV) {
      console.error('Error tracking Facebook conversion:', error);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error in trackFacebookEvent:', error);
    }
  }
};
