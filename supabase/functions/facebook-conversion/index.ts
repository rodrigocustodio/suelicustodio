import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Allowed Facebook event names to prevent arbitrary event injection
const ALLOWED_EVENTS = new Set([
  'Lead',
  'CompleteRegistration',
  'Contact',
  'ViewContent',
  'PageView',
  'InitiateCheckout',
  'Purchase',
  'Subscribe',
]);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization header (anon key present via supabase.functions.invoke)
    const authHeader = req.headers.get('authorization');
    const apiKey = req.headers.get('apikey');
    if (!authHeader && !apiKey) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { eventName, eventData, userData } = await req.json();

    // Validate eventName
    if (!eventName || typeof eventName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid event name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!ALLOWED_EVENTS.has(eventName)) {
      return new Response(
        JSON.stringify({ error: 'Event not allowed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate userData is an object if provided
    if (userData && typeof userData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid user data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const pixelId = Deno.env.get('FACEBOOK_PIXEL_ID');
    const accessToken = Deno.env.get('FACEBOOK_CONVERSION_API_TOKEN');

    if (!pixelId || !accessToken) {
      throw new Error('Facebook configuration missing');
    }

    // Get client IP from various possible headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip')
      || req.headers.get('cf-connecting-ip');

    // Build user_data object, only including fields that have values
    const user_data: Record<string, string> = {};
    
    if (userData?.email && typeof userData.email === 'string') {
      user_data.em = await hashValue(userData.email);
    }
    if (userData?.phone && typeof userData.phone === 'string') {
      user_data.ph = await hashValue(userData.phone);
    }
    if (clientIp) {
      user_data.client_ip_address = clientIp;
    }
    const userAgent = req.headers.get('user-agent');
    if (userAgent) {
      user_data.client_user_agent = userAgent;
    }

    // Prepare the conversion event
    const payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: (userData?.event_source_url && typeof userData.event_source_url === 'string') ? userData.event_source_url : '',
        user_data,
        custom_data: eventData || {},
      }],
    };

    console.log('Sending conversion event to Facebook:', eventName);

    // Send to Facebook Conversion API
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Facebook API error:', result);
      throw new Error('Facebook API error');
    }

    console.log('Facebook conversion sent successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in facebook-conversion function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Hash function for user data (Facebook requires SHA-256)
async function hashValue(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim();
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
