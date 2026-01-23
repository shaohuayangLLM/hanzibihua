// Supabase Edge Function for Baidu Speech Recognition
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BAIDU_API_KEY = Deno.env.get('BAIDU_API_KEY') || '';
const BAIDU_SECRET_KEY = Deno.env.get('BAIDU_SECRET_KEY') || '';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get Baidu access token
async function getAccessToken(): Promise<string> {
  const response = await fetch(
    `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Baidu API Error: ${data.error_description}`);
  }

  return data.access_token;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { audioData, format = 'wav', rate = 16000 } = await req.json();

    if (!audioData) {
      return new Response(
        JSON.stringify({ error: 'audioData is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Call Baidu Speech Recognition API
    const apiUrl = `https://vop.baidu.com/server_api?dev_pid=1537`; // 1537 = 普通话(支持简单的英文识别)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/' + format + '; rate=' + rate,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: new Uint8Array(atob(audioData)),
    });

    const result = await response.json();

    if (result.err_no !== 0 && result.err_no !== undefined) {
      const errorMessages: Record<number, string> = {
        3301: '音频质量过差无法识别',
        3302: '鉴权失败',
        3303: '语音服务器后端问题',
        3307: '音频过长',
        3308: '音频格式问题',
        3309: '音频过短',
        3310: '音频下载失败',
        3311: '音频转码失败',
        3312: '音频上传失败',
      };

      const errorMessage = errorMessages[result.err_no] || `识别失败 (错误码: ${result.err_no})`;
      return new Response(
        JSON.stringify({ error: errorMessage, err_no: result.err_no }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return recognition result
    return new Response(
      JSON.stringify({
        transcript: result.result?.[0] || '',
        confidence: result.confidence || 0,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in baidu-speech function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
