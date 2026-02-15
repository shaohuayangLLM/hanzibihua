// 数学模块基础知识讲解

export interface KnowledgePoint {
  title: string;
  content: string;
  examples?: string[];
  tips?: string;
}

export interface ModuleKnowledge {
  moduleId: string;
  title: string;
  description: string;
  points: KnowledgePoint[];
}

// 数位与位数模块知识
const placeValueKnowledge: ModuleKnowledge = {
  moduleId: 'place-value',
  title: '数位与位数',
  description: '认识十位和个位，学会区分一位数和两位数',
  points: [
    {
      title: '什么是个位？',
      content: '个位是最右边的一位。个位上的数字表示有几个一。',
      examples: [
        '数字 5，个位是 5，表示 5 个一',
        '数字 15，个位是 5，表示 5 个一',
      ],
      tips: '记住：个位在右边！'
    },
    {
      title: '什么是十位？',
      content: '十位是从右边数的第二位。十位上的数字表示有几个十。',
      examples: [
        '数字 10，十位是 1，表示 1 个十',
        '数字 30，十位是 3，表示 3 个十',
        '数字 47，十位是 4，表示 4 个十'
      ],
      tips: '记住：十位在个位的左边！'
    },
    {
      title: '一位数是什么？',
      content: '只有一个数字的数，叫一位数。一位数只有个位，没有十位。',
      examples: ['0, 1, 2, 3, 4, 5, 6, 7, 8, 9 都是一位数'],
      tips: '一位数的范围是 0-9'
    },
    {
      title: '两位数是什么？',
      content: '有两个数字的数，叫两位数。两位数有十位和个位。',
      examples: [
        '10 是最小的两位数',
        '99 是最大的两位数',
        '23 是两位数，十位是 2，个位是 3'
      ],
      tips: '两位数的范围是 10-99'
    },
    {
      title: '如何判断一个数是几位数？',
      content: '数一数这个数有多少个数字：',
      examples: [
        '5 只有 1 个数字 → 一位数',
        '18 有 2 个数字 → 两位数',
        '100 有 3 个数字 → 三位数'
      ],
      tips: '数数字个数就对了！'
    },
    {
      title: '左边和右边',
      content: '在写数的时候，从左到右写。十位在左边，个位在右边。',
      examples: [
        '数字 25：2 在左边（十位），5 在右边（个位）',
        '你说"左边"指十位，"右边"指个位'
      ],
      tips: '左十右个，要记住哦！'
    },
    {
      title: '十位和个位怎么分清？',
      content: '关键看位置：右边是个位，左边是十位。',
      examples: [
        '数字 28：右边 8 是个位，左边 2 是十位',
        '数字 56：右边 6 是个位，左边 5 是十位'
      ],
      tips: '右左 = 个十'
    },
    {
      title: '一位数 vs 两位数快速判断',
      content: '看数字有几个：1个数字=一位数，2个数字=两位数',
      examples: [
        '8 → 只有1个数字 → 一位数',
        '19 → 有2个数字 → 两位数'
      ],
      tips: '数字个数 = 位数'
    },
    {
      title: '你的左手和右手',
      content: '写数字时，左手边是十位，右手边是个位',
      examples: [
        '伸出双手，左手对应十位，右手对应个位',
        '数字 37：左边3是十位，右边7是个位'
      ],
      tips: '用双手帮助记忆！'
    }
  ]
};

// 排队与位置模块知识
const queuePositionKnowledge: ModuleKnowledge = {
  moduleId: 'queue-position',
  title: '排队与位置',
  description: '学习排队问题、位置概念和方向认知',
  points: [
    {
      title: '从左数、从右数',
      content: '排队时，我们需要明确是从左边开始数，还是从右边开始数。',
      examples: [
        '从左数第 3 个：从左边开始数 1、2、3，第 3 个',
        '从右数第 2 个：从右边开始数 1、2，第 2 个'
      ],
      tips: '一定要看清楚是从哪边数！'
    },
    {
      title: '第几个 vs 几个',
      content: '"第几个"是指位置，"几个"是指数量。这是两个不同的概念！',
      examples: [
        '第 3 个：是指排在第 3 位置的那个人',
        '有 3 个：是指总共有 3 个人'
      ],
      tips: '第几个 = 排名，几个 = 数量'
    },
    {
      title: '前面的人走了怎么办？',
      content: '如果前面有人离开了，后面的位置会往前移动。',
      examples: [
        '小明排第 5，前面有 4 个人',
        '前面走了 2 个人，小明现在排第 3（5-2=3）'
      ],
      tips: '前面走人，位置前移！'
    },
    {
      title: '中间位置',
      content: '有时候题目会问"中间"的位置。需要计算总人数，找出中间的那个。',
      examples: [
        '5 个人排队，中间是第 3 个',
        '7 个人排队，中间是第 4 个'
      ],
      tips: '单数个才有正中间！'
    },
    {
      title: '谁在前、谁在后',
      content: '排在前面的位置数字小，排在后面的位置数字大。',
      examples: [
        '第 1 个在最前面',
        '第 10 个在最后面'
      ],
      tips: '位置数字越小越靠前！'
    },
    {
      title: '前面走了，你变第几？',
      content: '前面每走1个人，你的位置就减1',
      examples: [
        '你排第8，前面走了3个人，现在排第5',
        '计算方法：8 - 3 = 5'
      ],
      tips: '前面走人，位置减！'
    },
    {
      title: '从左数 vs 从右数 - 怎么不混淆？',
      content: '一定要看题目说的是"从左数"还是"从右数"',
      examples: [
        '从左数第4：从左边开始数1、2、3、4',
        '从右数第4：从右边开始数1、2、3、4（注意：方向相反！）'
      ],
      tips: '标记出起始方向，用箭头指示'
    },
    {
      title: '什么是"一行"？什么是"一列"？',
      content: '横着排叫"一行"，竖着排叫"一列"',
      examples: [
        '一行：👧👦👧👦 横着排列',
        '一列：👦 竖着排列',
        '       👦',
        '       👧'
      ],
      tips: '横行竖列'
    },
    {
      title: '题目中的"它"是指什么？',
      content: '多步骤题目中，"它"通常指上一步算出来的结果',
      examples: [
        '题目：小明有5个苹果，吃了2个。它的一半是多少？',
        '"它" = 吃完后剩下的苹果 = 5 - 2 = 3个',
        '"它的一半" = 3的一半 = 1.5个（或1个半）'
      ],
      tips: '遇到"它"，先想上一步算出了什么'
    }
  ]
};

// 看图列算式模块知识
const pictureOperationKnowledge: ModuleKnowledge = {
  moduleId: 'picture-operation',
  title: '看图列算式',
  description: '看图列加减法算式，学会区分加减法',
  points: [
    {
      title: '加法的信号',
      content: '看到这些关键词，要用加法：又来了、买来、收到、拿来、飞来',
      examples: [
        '原来有 3 只小鸟，又飞来 2 只',
        '算式：3 + 2 = 5'
      ],
      tips: '又来了就用加！'
    },
    {
      title: '减法的信号',
      content: '看到这些关键词，要用减法：飞走了、走了、吃了、用了、送人、拿走',
      examples: [
        '原来有 5 个苹果，吃了 2 个',
        '算式：5 - 2 = 3'
      ],
      tips: '少了、走了就用减！'
    },
    {
      title: '看图数一数',
      content: '仔细观察图片，数清楚每种物体的数量。',
      examples: [
        '左边的苹果：4 个',
        '右边的苹果：3 个',
        '一共有：4 + 3 = 7 个'
      ],
      tips: '要认真数，不能数错哦！'
    },
    {
      title: '大括号和问号',
      content: '有些图片上有大括号 { 和问号 ？，问号在哪儿，就求什么。',
      examples: [
        '? 在大括号下面：求总数，用加法',
        '? 在一部分上：求部分，用减法'
      ],
      tips: '看问号的位置很重要！'
    },
    {
      title: '把自己算进去',
      content: '有些题目需要把自己也算进去。',
      examples: [
        '从前面数你是第 5 个，后面还有 3 个人',
        '一共有：5 + 3 = 8 个人（要把你算进去）'
      ],
      tips: '别忘了把自己也算上！'
    },
    {
      title: '加法还是减法？一看关键词',
      content: '加法关键词：又来、买来、飞来、收到、拿来',
      examples: [
        '原来有3个，又来2个 → 3+2=5',
        '买来5个，原来有2个 → 5+2=7'
      ],
      tips: '记住5个加法词'
    },
    {
      title: '减法还是加法？一看关键词',
      content: '减法关键词：飞走、走了、吃了、用了、送人、拿走',
      examples: [
        '原来有5个，走了2个 → 5-2=3',
        '有8个，吃了3个 → 8-3=5'
      ],
      tips: '记住7个减法词'
    },
    {
      title: '应用题中的"我"',
      content: '题目说"从你开始数"，要把你自己算进去',
      examples: [
        '从你开始数，你是第1个',
        '你后面还有3个人，一共1+3=4人'
      ],
      tips: '你也是人，要算进去！'
    }
  ]
};

// 凑十法与破十法模块知识
const calculationKnowledge: ModuleKnowledge = {
  moduleId: 'calculation',
  title: '凑十法与破十法',
  description: '学习20以内加减法中的凑十法和破十法',
  points: [
    {
      title: '凑十法是什么？',
      content: '把一个加数拆开，先和另一个数凑成10，再加剩下的部分',
      examples: [
        '9 + 6 = ?',
        '把6拆成1和5',
        '9+1=10，10+5=15'
      ],
      tips: '见9想1，见8想2，先凑10再往上加'
    },
    {
      title: '凑十法三步走',
      content: '第一步拆数，第二步凑十，第三步再合并',
      examples: [
        '8 + 7',
        '7拆成2和5',
        '8+2=10，10+5=15'
      ],
      tips: '先看谁离10近，再拆另一个数'
    },
    {
      title: '破十法是什么？',
      content: '减法时把十几拆成10和几，先减掉个位对应部分，再减十位中的剩余',
      examples: [
        '13 - 8 = ?',
        '13拆成10和3，8拆成3和5',
        '先减掉3，还剩10，再算10-5=5'
      ],
      tips: '个位不够减，就先“破十”'
    },
    {
      title: '破十法三步走',
      content: '第一步拆被减数，第二步拆减数，第三步分步相减',
      examples: [
        '12 - 7',
        '12=10+2，7=2+5',
        '先算2-2=0，再算10-5=5'
      ],
      tips: '口诀：一看二减三要加'
    }
  ]
};

// 知识点数据映射
export const MODULE_KNOWLEDGE: Record<string, ModuleKnowledge> = {
  'place-value': placeValueKnowledge,
  'queue-position': queuePositionKnowledge,
  'picture-operation': pictureOperationKnowledge,
  'calculation': calculationKnowledge,
};

// 获取模块知识
export const getModuleKnowledge = (moduleId: string): ModuleKnowledge | undefined => {
  return MODULE_KNOWLEDGE[moduleId];
};

// 所有有知识讲解的模块ID
export const KNOWLEDGE_ENABLED_MODULES = ['place-value', 'queue-position', 'picture-operation', 'calculation'];
