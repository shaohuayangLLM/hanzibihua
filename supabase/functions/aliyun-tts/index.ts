// 阿里云 Qwen-TTS 语音合成 API
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const API_KEY = 'sk-02ec9469925d458f87276961356a0a10';

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    });
  }

  try {
    // 解析请求体
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Missing text parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 调用阿里云 Qwen-TTS API
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3-tts-flash',
        input: { text },
        voice: 'Aixia',
        language_type: 'Chinese',
      }),
    });

    const data = await response.json();

    // 返回音频 URL
    return new Response(
      JSON.stringify({
        audio_url: data.output?.audio?.url,
        audio_id: data.output?.audio?.id,
      }),
      { headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }}
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
