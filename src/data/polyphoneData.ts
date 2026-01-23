/**
 * 多音字练习数据
 * 格式：汉字、读音列表、例词、练习句子
 */

export interface PolyphoneReading {
  pinyin: string;
  examples: string[];
}

export interface PolyphoneExercise {
  character: string;
  readings: PolyphoneReading[];
  sentence: string;
  blanks: number[]; // 空格位置索引
  answers: string[]; // 每个空格的正确答案
}

export const POLYPHONE_EXERCISES: PolyphoneExercise[] = [
  {
    character: "地",
    readings: [
      {
        pinyin: "de",
        examples: ["顽皮地说", "高兴地跳"],
      },
      {
        pinyin: "dì",
        examples: ["天地", "土地", "地上"],
      },
    ],
    sentence: "站在雪地（  ）上的雪人顽皮地（  ）大肚子一挺。",
    blanks: [0, 1],
    answers: ["dì", "de"],
  },
  {
    character: "着",
    readings: [
      {
        pinyin: "zhe",
        examples: ["向着", "望着", "跟着"],
      },
      {
        pinyin: "zháo",
        examples: ["着急", "喝着水了", "睡着了"],
      },
    ],
    sentence: "乌鸦望着（  ）面前的瓶子努力思考，终于想出办法喝着（  ）水了。",
    blanks: [0, 1],
    answers: ["zhe", "zháo"],
  },
  {
    character: "数",
    readings: [
      {
        pinyin: "shǔ",
        examples: ["数一数", "数数"],
      },
      {
        pinyin: "shù",
        examples: ["数学", "数量", "数字"],
      },
    ],
    sentence: "我的数（  ）学很好，我会数（  ）数（  ）。",
    blanks: [0, 1, 2],
    answers: ["shù", "shǔ", "shù"],
  },
  {
    character: "长",
    readings: [
      {
        pinyin: "cháng",
        examples: ["长短", "长的", "长城"],
      },
      {
        pinyin: "zhǎng",
        examples: ["生长", "长出", "长大"],
      },
    ],
    sentence: "哥哥长（  ）大后，能跳长（  ）长（  ）的绳子。",
    blanks: [0, 1, 2],
    answers: ["zhǎng", "cháng", "cháng"],
  },
  {
    character: "只",
    readings: [
      {
        pinyin: "zhī",
        examples: ["一只", "只有", "只是"],
      },
      {
        pinyin: "zhǐ",
        examples: ["只好", "只是", "只能"],
      },
    ],
    sentence: "家里只（  ）有一只（  ）小猫。",
    blanks: [0, 1],
    answers: ["zhǐ", "zhī"],
  },
  {
    character: "觉",
    readings: [
      {
        pinyin: "jiào",
        examples: ["睡觉", "午觉"],
      },
      {
        pinyin: "jué",
        examples: ["觉得", "感觉"],
      },
    ],
    sentence: "我觉得（  ）很累了，想去睡一觉（  ）。",
    blanks: [0, 1],
    answers: ["jué", "jiào"],
  },
  {
    character: "种",
    readings: [
      {
        pinyin: "zhǒng",
        examples: ["种子", "种类"],
      },
      {
        pinyin: "zhòng",
        examples: ["种地", "种花"],
      },
    ],
    sentence: "农民伯伯把种（  ）子种（  ）在地里。",
    blanks: [0, 1],
    answers: ["zhǒng", "zhòng"],
  },
  {
    character: "为",
    readings: [
      {
        pinyin: "wèi",
        examples: ["因为", "为了"],
      },
      {
        pinyin: "wéi",
        examples: ["为人", "称为"],
      },
    ],
    sentence: "我为（  ）了（  ）学习而努力。",
    blanks: [0, 1],
    answers: ["wèi", "wéi"],
  },
  {
    character: "分",
    readings: [
      {
        pinyin: "fēn",
        examples: ["分开", "十分"],
      },
      {
        pinyin: "fèn",
        examples: ["水分", "成分"],
      },
    ],
    sentence: "把这个苹果分（  ）成两半，留下一分（  ）给别人。",
    blanks: [0, 1],
    answers: ["fēn", "fèn"],
  },
  {
    character: "没",
    readings: [
      {
        pinyin: "méi",
        examples: ["没有", "没人"],
      },
      {
        pinyin: "mò",
        examples: ["淹没", "沉没"],
      },
    ],
    sentence: "河里没（  ）有水，房子被淹没（  ）了。",
    blanks: [0, 1],
    answers: ["méi", "mò"],
  },
  {
    character: "得",
    readings: [
      {
        pinyin: "de",
        examples: ["跑得快", "高兴得跳"],
      },
      {
        pinyin: "dé",
        examples: ["得到", "得分"],
      },
      {
        pinyin: "děi",
        examples: ["得走", "得用"],
      },
    ],
    sentence: "我得（  ）努力学习，才能得（  ）到好成绩，跑得（  ）更快。",
    blanks: [0, 1, 2],
    answers: ["děi", "dé", "de"],
  },
  {
    character: "还",
    readings: [
      {
        pinyin: "hái",
        examples: ["还有", "还是"],
      },
      {
        pinyin: "huán",
        examples: ["还书", "还给"],
      },
    ],
    sentence: "我还（  ）有一本书要还（  ）给图书馆。",
    blanks: [0, 1],
    answers: ["hái", "huán"],
  },
  {
    character: "干",
    readings: [
      {
        pinyin: "gān",
        examples: ["干净", "干燥"],
      },
      {
        pinyin: "gàn",
        examples: ["干活", "干劲"],
      },
    ],
    sentence: "妈妈把干（  ）净的衣服拿出来，继续干（  ）活。",
    blanks: [0, 1],
    answers: ["gān", "gàn"],
  },
  {
    character: "都",
    readings: [
      {
        pinyin: "dōu",
        examples: ["都是", "都有"],
      },
      {
        pinyin: "dū",
        examples: ["首都", "都城"],
      },
    ],
    sentence: "我们都是（  ）中国人，首都（  ）是北京。",
    blanks: [0, 1],
    answers: ["dōu", "dū"],
  },
  {
    character: "乐",
    readings: [
      {
        pinyin: "lè",
        examples: ["快乐", "乐趣"],
      },
      {
        pinyin: "yuè",
        examples: ["音乐", "乐器"],
      },
    ],
    sentence: "听到快乐的（  ）音乐（  ），我感到很快乐（  ）。",
    blanks: [0, 1, 2],
    answers: ["yuè", "lè"],
  },
  {
    character: "好",
    readings: [
      {
        pinyin: "hǎo",
        examples: ["好人", "很好"],
      },
      {
        pinyin: "hào",
        examples: ["好学", "好奇"],
      },
    ],
    sentence: "这是一个好（  ）孩子，很好（  ）学。",
    blanks: [0, 1],
    answers: ["hǎo", "hào"],
  },
  {
    character: "空",
    readings: [
      {
        pinyin: "kōng",
        examples: ["天空", "空气"],
      },
      {
        pinyin: "kòng",
        examples: ["空白", "空地"],
      },
    ],
    sentence: "天空中（  ）有一只鸟飞过空（  ）地。",
    blanks: [0, 1],
    answers: ["kōng", "kòng"],
  },
  {
    character: "相",
    readings: [
      {
        pinyin: "xiāng",
        examples: ["相信", "相互"],
      },
      {
        pinyin: "xiàng",
        examples: ["相片", "长相"],
      },
    ],
    sentence: "我们相信（  ）这张相（  ）片是真的。",
    blanks: [0, 1],
    answers: ["xiāng", "xiàng"],
  },
  {
    character: "行",
    readings: [
      {
        pinyin: "xíng",
        examples: ["行走", "行动"],
      },
      {
        pinyin: "háng",
        examples: ["银行", "一行"],
      },
    ],
    sentence: "我们一行（  ）人开始行走（  ）去银行（  ）。",
    blanks: [0, 1, 2],
    answers: ["háng", "xíng", "háng"],
  },
  {
    character: "少",
    readings: [
      {
        pinyin: "shǎo",
        examples: ["很少", "多少"],
      },
      {
        pinyin: "shào",
        examples: ["少年", "老少"],
      },
    ],
    sentence: "少年（  ）儿童很不少（  ）。",
    blanks: [0, 1],
    answers: ["shào", "shǎo"],
  },
  {
    character: "背",
    readings: [
      {
        pinyin: "bēi",
        examples: ["背着", "背包"],
      },
      {
        pinyin: "bèi",
        examples: ["后背", "背景"],
      },
    ],
    sentence: "他背（  ）着书包，后背（  ）都湿了。",
    blanks: [0, 1],
    answers: ["bēi", "bèi"],
  },
  // 新增多音字
  {
    character: "当",
    readings: [
      {
        pinyin: "dāng",
        examples: ["当作", "当时"],
      },
      {
        pinyin: "dàng",
        examples: ["恰当", "上当"],
      },
    ],
    sentence: "当（  ）我上当（  ）的时候，才明白真相。",
    blanks: [0, 1],
    answers: ["dāng", "dàng"],
  },
  {
    character: "看",
    readings: [
      {
        pinyin: "kàn",
        examples: ["看书", "看见"],
      },
      {
        pinyin: "kān",
        examples: ["看守", "看门"],
      },
    ],
    sentence: "爷爷在看（  ）守大门，我看（  ）书陪着他。",
    blanks: [0, 1],
    answers: ["kān", "kàn"],
  },
  {
    character: "处",
    readings: [
      {
        pinyin: "chù",
        examples: ["到处", "住处"],
      },
      {
        pinyin: "chǔ",
        examples: ["处理", "相处"],
      },
    ],
    sentence: "到处（  ）都要好好处（  ）理人际关系。",
    blanks: [0, 1],
    answers: ["chù", "chǔ"],
  },
  {
    character: "传",
    readings: [
      {
        pinyin: "chuán",
        examples: ["传说", "传达"],
      },
      {
        pinyin: "zhuàn",
        examples: ["传记", "自传"],
      },
    ],
    sentence: "这本传记（  ）讲述了一个传（  ）奇的故事。",
    blanks: [0, 1],
    answers: ["zhuàn", "chuán"],
  },
  {
    character: "弹",
    readings: [
      {
        pinyin: "dàn",
        examples: ["子弹", "炸弹"],
      },
      {
        pinyin: "tán",
        examples: ["弹琴", "弹跳"],
      },
    ],
    sentence: "子弹（  ）打中了弹（  ）琴的人。",
    blanks: [0, 1],
    answers: ["dàn", "tán"],
  },
  {
    character: "觉",
    readings: [
      {
        pinyin: "jiào",
        examples: ["睡觉", "午觉"],
      },
      {
        pinyin: "jué",
        examples: ["感觉", "察觉"],
      },
    ],
    sentence: "我觉（  ）得困了，想去睡一觉（  ）。",
    blanks: [0, 1],
    answers: ["jué", "jiào"],
  },
  {
    character: "会",
    readings: [
      {
        pinyin: "huì",
        examples: ["学会", "开会"],
      },
      {
        pinyin: "kuài",
        examples: ["会计", "财会"],
      },
    ],
    sentence: "我学不会计（  ），因为不怎么会（  ）算术。",
    blanks: [0, 1],
    answers: ["kuài", "huì"],
  },
  {
    character: "朝",
    readings: [
      {
        pinyin: "cháo",
        examples: ["朝向", "朝阳"],
      },
      {
        pinyin: "zhāo",
        examples: ["朝阳", "朝夕"],
      },
    ],
    sentence: "朝（  ）着朝（  ）阳的方向前进。",
    blanks: [0, 1],
    answers: ["cháo", "zhāo"],
  },
  {
    character: "转",
    readings: [
      {
        pinyin: "zhuàn",
        examples: ["转动", "旋转"],
      },
      {
        pinyin: "zhuǎn",
        examples: ["转身", "转弯"],
      },
    ],
    sentence: "车轮不停地转（  ）动，车子开始转（  ）弯了。",
    blanks: [0, 1],
    answers: ["zhuàn", "zhuǎn"],
  },
  {
    character: "血",
    readings: [
      {
        pinyin: "xuè",
        examples: ["血液", "血压"],
      },
      {
        pinyin: "xiě",
        examples: ["流血", "鸡血"],
      },
    ],
    sentence: "流了一点血（  ），需要验血（  ）。",
    blanks: [0, 1],
    answers: ["xiě", "xuè"],
  },
  {
    character: "假",
    readings: [
      {
        pinyin: "jiǎ",
        examples: ["真假", "假如"],
      },
      {
        pinyin: "jià",
        examples: ["放假", "暑假"],
      },
    ],
    sentence: "假如（  ）在放暑假（  ），我可以去看电影。",
    blanks: [0, 1],
    answers: ["jiǎ", "jià"],
  },
  {
    character: "难",
    readings: [
      {
        pinyin: "nán",
        examples: ["困难", "难过"],
      },
      {
        pinyin: "nàn",
        examples: ["灾难", "难民"],
      },
    ],
    sentence: "这场灾难（  ）太难（  ）了。",
    blanks: [0, 1],
    answers: ["nàn", "nán"],
  },
  {
    character: "量",
    readings: [
      {
        pinyin: "liàng",
        examples: ["数量", "重量"],
      },
      {
        pinyin: "liáng",
        examples: ["测量", "量体温"],
      },
    ],
    sentence: "我们要测量（  ）这个物体的数量（  ）。",
    blanks: [0, 1],
    answers: ["liáng", "liàng"],
  },
  {
    character: "盛",
    readings: [
      {
        pinyin: "shèng",
        examples: ["茂盛", "盛大"],
      },
      {
        pinyin: "chéng",
        examples: ["盛饭", "盛水"],
      },
    ],
    sentence: "盛（  ）大的宴会上，大家都在盛（  ）饭吃。",
    blanks: [0, 1],
    answers: ["shèng", "chéng"],
  },
  {
    character: "教",
    readings: [
      {
        pinyin: "jiāo",
        examples: ["教书", "教给"],
      },
      {
        pinyin: "jiào",
        examples: ["教师", "教室"],
      },
    ],
    sentence: "教（  ）师在教（  ）我们写字。",
    blanks: [0, 1],
    answers: ["jiào", "jiāo"],
  },
  {
    character: "漂",
    readings: [
      {
        pinyin: "piào",
        examples: ["漂亮"],
      },
      {
        pinyin: "piāo",
        examples: ["漂流", "漂浮"],
      },
    ],
    sentence: "漂亮（  ）的小船在漂（  ）流。",
    blanks: [0, 1],
    answers: ["piào", "piāo"],
  },
  {
    character: "奇",
    readings: [
      {
        pinyin: "qí",
        examples: ["奇怪", "好奇"],
      },
      {
        pinyin: "jī",
        examples: ["奇数", "奇偶"],
      },
    ],
    sentence: "真奇怪（  ），为什么三是奇（  ）数。",
    blanks: [0, 1],
    answers: ["qí", "jī"],
  },
  {
    character: "兴",
    readings: [
      {
        pinyin: "xìng",
        examples: ["高兴", "兴趣"],
      },
      {
        pinyin: "xīng",
        examples: ["兴奋", "兴旺"],
      },
    ],
    sentence: "我兴（  ）奋地说，这件事让我很高兴（  ）。",
    blanks: [0, 1],
    answers: ["xīng", "xìng"],
  },
  {
    character: "重",
    readings: [
      {
        pinyin: "zhòng",
        examples: ["沉重", "重要"],
      },
      {
        pinyin: "chóng",
        examples: ["重新", "重复"],
      },
    ],
    sentence: "重（  ）新做一件重（  ）要的事。",
    blanks: [0, 1],
    answers: ["chóng", "zhòng"],
  },
  {
    character: "降",
    readings: [
      {
        pinyin: "jiàng",
        examples: ["降落", "下降"],
      },
      {
        pinyin: "xiáng",
        examples: ["投降", "降服"],
      },
    ],
    sentence: "敌军投降（  ）后，飞机开始降（  ）落。",
    blanks: [0, 1],
    answers: ["xiáng", "jiàng"],
  },
  {
    character: "差",
    readings: [
      {
        pinyin: "chà",
        examples: ["差不多", "差劲"],
      },
      {
        pinyin: "chā",
        examples: ["差别", "相差"],
      },
      {
        pinyin: "chāi",
        examples: ["出差", "公差"],
      },
    ],
    sentence: "出差（  ）的时候，我发现差别（  ）差不（  ）多。",
    blanks: [0, 1, 2],
    answers: ["chāi", "chā", "chà"],
  },
  {
    character: "参",
    readings: [
      {
        pinyin: "cān",
        examples: ["参加", "参观"],
      },
      {
        pinyin: "shēn",
        examples: ["人参", "海参"],
      },
    ],
    sentence: "我去参（  ）观了人参（  ）种植基地。",
    blanks: [0, 1],
    answers: ["cān", "shēn"],
  },
  {
    character: "和",
    readings: [
      {
        pinyin: "hé",
        examples: ["和平", "和谐"],
      },
      {
        pinyin: "hè",
        examples: ["附和", "唱和"],
      },
      {
        pinyin: "huó",
        examples: ["和面", "和泥"],
      },
    ],
    sentence: "大家和（  ）气地附和（  ）他，他去和（  ）面了。",
    blanks: [0, 1, 2],
    answers: ["hé", "hè", "huó"],
  },
];

// 导出类型
export type { PolyphoneReading, PolyphoneExercise };
