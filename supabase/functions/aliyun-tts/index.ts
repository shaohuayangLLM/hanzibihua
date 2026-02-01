// 阿里云 Qwen-TTS 语音合成 API
// 官方文档: https://help.aliyun.com/zh/model-studio/qwen-tts-api

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
    const { text, model = 'qwen3-tts-flash', voice = 'Cherry', language_type = 'Chinese' } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Missing text parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 调用阿里云 Qwen-TTS API（正确的端点和格式）
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

    const requestBody = {
      model,
      input: { text },
      voice,
      language_type,
    };

    console.log('Calling Qwen-TTS API:', JSON.stringify(requestBody));

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
      console.error('Aliyun Qwen-TTS API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'TTS API failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // 检查响应状态
    if (data.status_code !== 200) {
      console.error('Qwen-TTS API error:', data);
      return new Response(
        JSON.stringify({ error: data.message || 'Unknown error', code: data.code }),
        { status: data.status_code, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 返回音频 URL
    return new Response(
      JSON.stringify({
        audio_url: data.output?.audio?.url,
        audio_id: data.output?.audio?.id,
        characters: data.usage?.characters,
      }),
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
