/**
 * 找不同游戏数据
 * 每组包含一个目标字和一个形近字
 */

export interface FindDifferentLevel {
  id: string;
  targetChar: string; // 8个一样的字
  differentChar: string; // 1个不同的字
  hint: string; // 区分提示
  difficulty: 'easy' | 'medium' | 'hard';
}

export const FIND_DIFFERENT_LEVELS: FindDifferentLevel[] = [
  // 简单级别 - 差异明显
  {
    id: "ren-ru-easy",
    targetChar: "人",
    differentChar: "入",
    hint: "人的撇在左上，入的撇在左下",
    difficulty: "easy"
  },
  {
    id: "tu-shi-easy",
    targetChar: "土",
    differentChar: "士",
    hint: "土的下横长，士的上横长",
    difficulty: "easy"
  },
  {
    id: "ri-mu-easy",
    targetChar: "日",
    differentChar: "目",
    hint: "日是瘦的，目是胖的",
    difficulty: "easy"
  },
  {
    id: "tian-fu-easy",
    targetChar: "天",
    differentChar: "夫",
    hint: "天的上横短，夫的上横出头",
    difficulty: "easy"
  },
  {
    id: "da-tai-easy",
    targetChar: "大",
    differentChar: "太",
    hint: "大的笔画少，太多一点",
    difficulty: "easy"
  },
  {
    id: "wang-yu-easy",
    targetChar: "王",
    differentChar: "玉",
    hint: "王没有点，玉有一点",
    difficulty: "easy"
  },
  {
    id: "wan-wang-easy",
    targetChar: "万",
    differentChar: "方",
    hint: "万上面没有点，方上面有一点",
    difficulty: "easy"
  },
  {
    id: "jiu-wan-easy",
    targetChar: "九",
    differentChar: "丸",
    hint: "九没有点，丸有一点",
    difficulty: "easy"
  },
  {
    id: "wu-niao-easy",
    targetChar: "乌",
    differentChar: "鸟",
    hint: "乌没有点，鸟有一点",
    difficulty: "easy"
  },
  {
    id: "mian-mian-easy",
    targetChar: "免",
    differentChar: "兔",
    hint: "免没有点，兔有一点",
    difficulty: "easy"
  },

  // 中等难度 - 需要仔细观察
  {
    id: "bei-jian-medium",
    targetChar: "贝",
    differentChar: "见",
    hint: "贝下面是点，见下面是竖弯钩",
    difficulty: "medium"
  },
  {
    id: "wei-mo-medium",
    targetChar: "未",
    differentChar: "末",
    hint: "未上横短下横长，末上横长下横短",
    difficulty: "medium"
  },
  {
    id: "you-jia-medium",
    targetChar: "由",
    differentChar: "甲",
    hint: "由的竖向上出头，甲的竖向下出头",
    difficulty: "medium"
  },
  {
    id: "shi-gan-medium",
    targetChar: "石",
    differentChar: "右",
    hint: "石撇长，右撇短",
    difficulty: "medium"
  },
  {
    id: "xi-xi-medium",
    targetChar: "西",
    differentChar: "酉",
    hint: "西的框是斜的，酉的框是方的",
    difficulty: "medium"
  },
  {
    id: "zhi-xiong-medium",
    targetChar: "只",
    differentChar: "兄",
    hint: "只下面是八，兄下面是儿",
    difficulty: "medium"
  },
  {
    id: "hou-hou-medium",
    targetChar: "侯",
    differentChar: "候",
    hint: "侯没有竖，候有一竖",
    difficulty: "medium"
  },
  {
    id: "qing-qing-medium",
    targetChar: "请",
    differentChar: "情",
    hint: "请是言字旁，情是竖心旁",
    difficulty: "medium"
  },
  {
    id: "yu-gan-medium",
    targetChar: "于",
    differentChar: "干",
    hint: "于上面一横，干上面两横",
    difficulty: "medium"
  },
  {
    id: "zhou-zhou-medium",
    targetChar: "州",
    differentChar: "洲",
    hint: "州是三点水，洲是两点水",
    difficulty: "medium"
  },

  // 困难级别 - 非常相似
  {
    id: "ji-yi-hard",
    targetChar: "己",
    differentChar: "已",
    hint: "己半开口，已半封口",
    difficulty: "hard"
  },
  {
    id: "ci-ci-hard",
    targetChar: "刺",
    differentChar: "剌",
    hint: "刺中间是一束，剌中间是一刀",
    difficulty: "hard"
  },
  {
    id: "jia-zhong-hard",
    targetChar: "家",
    differentChar: "冢",
    hint: "家有点，冢没点",
    difficulty: "hard"
  },
  {
    id: "zhen-zhi-hard",
    targetChar: "真",
    differentChar: "直",
    hint: "真里面是三横，直里面是两横",
    difficulty: "hard"
  },
  {
    id: "jian-wen-hard",
    targetChar: "间",
    differentChar: "问",
    hint: "间是日，问是口",
    difficulty: "hard"
  },
  {
    id: "che-dong-hard",
    targetChar: "车",
    differentChar: "东",
    hint: "车有横，东无横",
    difficulty: "hard"
  },
  {
    id: "liang-liang-hard",
    targetChar: "凉",
    differentChar: "景",
    hint: "凉是两点水，景是日字旁",
    difficulty: "hard"
  },
  {
    id: "cheng-cheng-hard",
    targetChar: "城",
    differentChar: "诚",
    hint: "城是土字旁，诚是言字旁",
    difficulty: "hard"
  },
  {
    id: "zuo-zuo-hard",
    targetChar: "座",
    differentChar: "坐",
    hint: "座下面有广，坐下面有土",
    difficulty: "hard"
  },
  {
    id: "bian-bian-hard",
    targetChar: "遍",
    differentChar: "编",
    hint: "遍是走之旁，编是绞丝旁",
    difficulty: "hard"
  },

  // 额外挑战
  {
    id: "si-en-hard-2",
    targetChar: "思",
    differentChar: "恩",
    hint: "思是田+心，恩是因+心",
    difficulty: "hard"
  },
  {
    id: "ge-ge-hard",
    targetChar: "歌",
    differentChar: "哥",
    hint: "歌有欠，哥没有欠",
    difficulty: "hard"
  },
  {
    id: "tao-tao-hard",
    targetChar: "桃",
    differentChar: "逃",
    hint: "桃是木字旁，逃是走之旁",
    difficulty: "hard"
  },
  {
    id: "zhu-zhu-hard",
    targetChar: "住",
    differentChar: "注",
    hint: "住是单人旁，注是三点水",
    difficulty: "hard"
  },
  {
    id: "xiu-ti-hard",
    targetChar: "休",
    differentChar: "体",
    hint: "休单人旁右边是木，体单人旁右边是本",
    difficulty: "hard"
  },
  {
    id: "yuan-yuan-hard",
    targetChar: "元",
    differentChar: "园",
    hint: "元无框，园有框",
    difficulty: "hard"
  },
  {
    id: "shu-mi-hard",
    targetChar: "述",
    differentChar: "迷",
    hint: "述走之旁里面是术，迷走之旁里面是米",
    difficulty: "hard"
  },
  {
    id: "qing-qing-hard-2",
    targetChar: "清",
    differentChar: "晴",
    hint: "清是三点水，晴是日字旁",
    difficulty: "hard"
  },
  {
    id: "yu-mang-hard",
    targetChar: "育",
    differentChar: "盲",
    hint: "育上面有横，盲上面有点",
    difficulty: "hard"
  },
  {
    id: "zhuo-kan-hard",
    targetChar: "着",
    differentChar: "看",
    hint: "着目字旁，看目字底",
    difficulty: "hard"
  },
  {
    id: "shan-shan-hard",
    targetChar: "杉",
    differentChar: "衫",
    hint: "杉是木字旁，衫是衣字旁",
    difficulty: "hard"
  },
  {
    id: "ping-ping-hard",
    targetChar: "坪",
    differentChar: "评",
    hint: "坪是土字旁，评是言字旁",
    difficulty: "hard"
  },
  {
    id: "ban-ban-hard",
    targetChar: "板",
    differentChar: "版",
    hint: "板是木字旁，版是片字旁",
    difficulty: "hard"
  },
  {
    id: "wan-wan-hard",
    targetChar: "挽",
    differentChar: "晚",
    hint: "挽是提手旁，晚是日字旁",
    difficulty: "hard"
  },
  {
    id: "dian-dian-hard",
    targetChar: "店",
    differentChar: "惦",
    hint: "店是广字头，惦是竖心旁",
    difficulty: "hard"
  },
  {
    id: "yang-yang-hard",
    targetChar: "扬",
    differentChar: "杨",
    hint: "扬是提手旁，杨是木字旁",
    difficulty: "hard"
  },
  {
    id: "you-you-hard",
    targetChar: "忧",
    differentChar: "优",
    hint: "忧是竖心旁，优是单人旁",
    difficulty: "hard"
  },
  {
    id: "lian-lian-hard",
    targetChar: "连",
    differentChar: "莲",
    hint: "连是车字旁，莲是草字头",
    difficulty: "hard"
  },
  {
    id: "shen-tan-hard",
    targetChar: "深",
    differentChar: "探",
    hint: "深是三点水，探是提手旁",
    difficulty: "hard"
  },
  {
    id: "xiao-shao-hard",
    targetChar: "消",
    differentChar: "哨",
    hint: "消是三点水，哨是口字旁",
    difficulty: "hard"
  },
  {
    id: "zhen-shen-hard",
    targetChar: "镇",
    differentChar: "慎",
    hint: "镇是金字旁，慎是竖心旁",
    difficulty: "hard"
  },
  {
    id: "lou-lou-hard",
    targetChar: "楼",
    differentChar: "搂",
    hint: "楼是木字旁，搂是提手旁",
    difficulty: "hard"
  },
  {
    id: "yao-yao-hard",
    targetChar: "摇",
    differentChar: "遥",
    hint: "摇是提手旁，遥是走之旁",
    difficulty: "hard"
  },
  {
    id: "ji-ji-hard",
    targetChar: "技",
    differentChar: "枝",
    hint: "技是提手旁，枝是木字旁",
    difficulty: "hard"
  },
  {
    id: "lan-lan-hard",
    targetChar: "拦",
    differentChar: "栏",
    hint: "拦是提手旁，栏是木字旁",
    difficulty: "hard"
  },
  {
    id: "pu-pu-hard",
    targetChar: "铺",
    differentChar: "脯",
    hint: "铺是金字旁，脯是月字旁",
    difficulty: "hard"
  },
  {
    id: "yang-yang-hard-2",
    targetChar: "洋",
    differentChar: "样",
    hint: "洋是三点水，样是木字旁",
    difficulty: "hard"
  },
  {
    id: "huan-chui-hard",
    targetChar: "欢",
    differentChar: "吹",
    hint: "欢又字旁，吹口字旁",
    difficulty: "hard"
  },
  {
    id: "qiu-bing-hard",
    targetChar: "丘",
    differentChar: "兵",
    hint: "丘下面一横，兵下面两横",
    difficulty: "hard"
  },
  {
    id: "li-mian-hard",
    targetChar: "李",
    differentChar: "季",
    hint: "李是木子，季是禾子",
    difficulty: "hard"
  },
  {
    id: "lan-yang-hard",
    targetChar: "兰",
    differentChar: "羊",
    hint: "兰上面是三横，羊上面是两点",
    difficulty: "hard"
  },
  {
    id: "hou-yuan-hard",
    targetChar: "厚",
    differentChar: "原",
    hint: "厚厂字头，原厂字头但里面不同",
    difficulty: "hard"
  },
  {
    id: "zhen-zhi-hard-2",
    targetChar: "镇",
    differentChar: "慎",
    hint: "镇是金字旁，慎是竖心旁",
    difficulty: "hard"
  }
];

// 根据难度筛选关卡
export const getLevelsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return FIND_DIFFERENT_LEVELS.filter(level => level.difficulty === difficulty);
};

// 获取随机关卡
export const getRandomLevel = (count: number = 10) => {
  const shuffled = [...FIND_DIFFERENT_LEVELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
