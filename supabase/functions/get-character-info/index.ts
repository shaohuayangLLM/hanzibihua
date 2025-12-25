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
  "structure": "结构类型",
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
7. 只返回JSON，不要有任何其他说明文字

【重要】关于"结构"字段，请务必准确判断：
- 独体字：不能拆分的字，如"一、人、大、小、山、水、日、月、火"等
- 左右结构：左右两部分组成，如"行（彳+亍）、好（女+子）、明（日+月）、林（木+木）"等
- 上下结构：上下两部分组成，如"思（田+心）、花（艹+化）、草（艹+早）"等
- 左中右结构：三部分左右排列，如"做、辩"等
- 上中下结构：三部分上下排列，如"莫、暴"等
- 半包围结构：如"问、闪、边、过、风"等
- 全包围结构：如"国、回、园"等
- 品字结构：如"森、品、晶"等

请仔细分析汉字的组成部分，不要把合体字误判为独体字。`;

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
            content: '你是一个专业的汉语教育助手，专门为一年级小学生提供汉字学习资料。你精通汉字结构分析，能准确判断汉字的结构类型。你的回答必须是纯JSON格式，不要包含任何markdown代码块标记或其他文字。' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
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
