import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log(`Fetching character info for: ${character}`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `请为汉字"${character}"提供以下信息，用于一年级小学生学习。请严格按照JSON格式返回，不要有任何其他文字：

{
  "character": "${character}",
  "pinyin": "主要读音（带声调，如 dà、xiǎo）",
  "meaning": "简单易懂的解释，适合一年级学生，不超过50字",
  "strokeCount": 笔画数（数字），
  "radicalInfo": "部首：X",
  "structure": "结构类型，如：独体字、左右结构、上下结构、半包围结构、全包围结构等",
  "words": [
    {"word": "组词1", "pinyin": "拼音", "meaning": "简单释义"},
    {"word": "组词2", "pinyin": "拼音", "meaning": "简单释义"},
    {"word": "组词3", "pinyin": "拼音", "meaning": "简单释义"},
    {"word": "组词4", "pinyin": "拼音", "meaning": "简单释义"}
  ],
  "sentences": ["简单例句1（10-15字）", "简单例句2（10-15字）"],
  "additionalReadings": [
    {
      "pinyin": "其他读音（带声调）",
      "meaning": "这个读音的含义",
      "words": [
        {"word": "组词", "pinyin": "拼音", "meaning": "释义"}
      ]
    }
  ]
}

要求：
1. 拼音必须带声调标记
2. 解释要简单，适合6-7岁儿童
3. 组词选择常用词，尽量与儿童生活相关
4. 例句要短小简单
5. 如果这个字是多音字，请在additionalReadings中列出其他读音及对应的组词
6. 如果不是多音字，additionalReadings可以是空数组[]
7. 只返回JSON，不要有任何其他说明文字`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: '你是一个专业的汉语教育助手，专门为一年级小学生提供汉字学习资料。你的回答必须是纯JSON格式，不要包含任何markdown代码块标记或其他文字。' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: '请求过于频繁，请稍后再试' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: '服务额度不足，请联系管理员' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI服务暂时不可用');
    }

    const aiResponse = await response.json();
    console.log('AI response received');

    const content = aiResponse.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('AI返回内容为空');
    }

    // Clean up the response - remove markdown code blocks if present
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    // Parse JSON
    let characterInfo;
    try {
      characterInfo = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', cleanedContent);
      throw new Error('解析汉字信息失败');
    }

    console.log(`Successfully got info for: ${character}`);

    return new Response(
      JSON.stringify(characterInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-character-info:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '获取汉字信息失败' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
