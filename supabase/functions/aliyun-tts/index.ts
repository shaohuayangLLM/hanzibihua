// 阿里云 Qwen3-TTS 语音合成 API
// 使用 Model Studio API (基于 HTTP 调用)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const API_KEY = Deno.env.get('ALIYUN_API_KEY') || '';

// CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, model = 'cosyvoice-v1', voice = 'longxiaochun', speed = 1.0 } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Missing text parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 调用阿里云 Model Studio API
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/audio/tts-generation';

    const requestBody = {
      model,
      input: {
        text,
      },
      parameters: {
        text_type: 'PlainText',
        voice,
        speed_rate: speed,
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Aliyun TTS API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'TTS API failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // 返回音频 URL 或 base64 数据
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
