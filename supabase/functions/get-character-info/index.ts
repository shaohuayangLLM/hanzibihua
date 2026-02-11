import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHARACTER_INFO_PROMPT = `你是一位专业的汉语文字学者和一年级语文老师。
你的任务是为给定的汉字提供详细的信息，以 JSON 格式返回。

请严格按照以下 JSON 格式输出（不要包含其他文字）：

{
  "character": "汉字",
  "pinyin": "拼音（带声调）",
  "meaning": "简明释义",
  "strokeCount": 笔画数（数字）,
  "radicalInfo": "部首：部首名称",
  "structure": "结构类型（如：左右结构、上下结构、独体字等）",
  "words": [
    {"word": "词语1", "pinyin": "pīnyīn", "meaning": "释义"},
    {"word": "词语2", "pinyin": "pīnyīn", "meaning": "释义"},
    {"word": "词语3", "pinyin": "pīnyīn", "meaning": "释义"}
  ],
  "sentences": [
    "例句1（使用该汉字）",
    "例句2（使用该汉字）"
  ],
  "additionalReadings": [
    {"reading": "多音字读音1", "condition": "使用条件"},
    {"reading": "多音字读音2", "condition": "使用条件"}
  ]
}

注意：
1. 如果不是多音字，additionalReadings 返回空数组 []
2. words 至少返回 3 个常用词语
3. sentences 至少返回 2 个例句
4. 确保返回的是纯 JSON，不要有 markdown 格式`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { character } = await req.json();

    if (!character) {
      return new Response(
        JSON.stringify({ error: '请提供汉字' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Getting character info for: ${character}`);

    const ALIYUN_API_KEY = Deno.env.get('VITE_ALIYUN_API_KEY');
    if (!ALIYUN_API_KEY) {
      throw new Error('VITE_ALIYUN_API_KEY is not configured');
    }

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ALIYUN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-max',
        input: {
          messages: [
            {
              role: 'system',
              content: CHARACTER_INFO_PROMPT
            },
            {
              role: 'user',
              content: `请提供汉字"${character}"的详细信息`
            }
          ]
        },
        parameters: {
          result_format: 'message',
          temperature: 0.3,
          max_tokens: 1500
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Qwen API error:', response.status, errorText);
      throw new Error(`Qwen API 请求失败: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    let content = data.output?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('API 返回数据格式异常');
    }

    // 清理可能的 markdown 格式
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const result = JSON.parse(content);

    console.log(`Successfully got info for: ${character}`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-character-info:', error);

    // 如果是 JSON 解析错误，尝试提供更多信息
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ error: 'AI 返回的数据格式有误，请重试' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '获取汉字信息失败' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
