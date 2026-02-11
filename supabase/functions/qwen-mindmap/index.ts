import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AI_MINDMAP_PROMPT = `你是一位专业的一年级语文老师和儿童教育专家，是汉字探险向导兼脑图魔术师。
你的任务是为一个汉字生成适合6-8岁儿童理解的、有趣的知识脑图。

请严格按照以下 Markdown 格式输出：

# [汉字]的奇妙世界

## 1. 汉字身份证 📋
- **汉字**: [汉字]
- **拼音**: [拼音]
- **笔画**: [数字]画
- **部首**: [部首名称]
- **结构**: [结构类型，如：左右结构、上下结构]

## 2. 变身魔术 🎭（组词）
- [词语1] - [简单解释]
- [词语2] - [简单解释]
- [词语3] - [简单解释]

## 3. 孪生兄弟 🔄（形近字）
- [形近字1] - [区分方法]
- [形近字2] - [区分方法]

## 4. 词语森林 🌳（拓展词语）
- [词语1] - [意思]
- [词语2] - [意思]

## 5. 多音字魔法 🎵（如果是多音字）
- **读音1** [拼音] - [使用场景/词语举例]
- **读音2** [拼音] - [使用场景/词语举例]
*（如果不是多音字，请写：这个字只有一个读音）*

## 6. 记忆小妙招 💡
[用有趣的顺口溜、故事或形象比喻帮助记忆这个汉字]

---

要求：
- 语言要生动有趣，适合小朋友理解
- 记忆小妙招要有创意，最好用押韵的方式
- 每个部分不少于3个例子（多音字部分除外）
- 解释要简短易懂
- 多音字部分要简单明了，用例子帮助小朋友理解什么时候读哪个音`;

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

    console.log(`Generating AI mindmap for: ${character}`);

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
        model: 'qwen-turbo',  // 更快的模型
        input: {
          messages: [
            {
              role: 'system',
              content: AI_MINDMAP_PROMPT
            },
            {
              role: 'user',
              content: `请为汉字"${character}"生成知识脑图`
            }
          ]
        },
        parameters: {
          result_format: 'message',
          temperature: 0.7,
          max_tokens: 1500  // 减少生成长度
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

    const content = data.output?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('API 返回数据格式异常');
    }

    console.log(`Successfully generated mindmap for: ${character}`);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in qwen-mindmap:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '生成 AI 脑图失败' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
