/**
 * 形近字数据
 * 形状相似但意义不同的汉字
 */

export interface SimilarCharGroup {
  id: string;
  characters: {
    char: string;
    pinyin: string;
    meaning: string;
    example: string;
  }[];
  hint: string; // 区分提示
}

export const SIMILAR_CHAR_GROUPS: SimilarCharGroup[] = [
  {
    id: "ren-ru",
    characters: [
      { char: "人", pinyin: "rén", meaning: "人类", example: "一个人" },
      { char: "入", pinyin: "rù", meaning: "进来", example: "出门入口" }
    ],
    hint: "人的撇在左上，入的撇在左下"
  },
  {
    id: "tu-shi",
    characters: [
      { char: "土", pinyin: "tǔ", meaning: "泥土", example: "土地" },
      { char: "士", pinyin: "shì", meaning: "士兵", example: "士兵" }
    ],
    hint: "土的下横长，士的上横长"
  },
  {
    id: "ri-mu",
    characters: [
      { char: "日", pinyin: "rì", meaning: "太阳", example: "太阳" },
      { char: "目", pinyin: "mù", meaning: "眼睛", example: "目光" }
    ],
    hint: "日是瘦的，目是胖的（目里有两横）"
  },
  {
    id: "tian-fu",
    characters: [
      { char: "天", pinyin: "tiān", meaning: "天空", example: "蓝天" },
      { char: "夫", pinyin: "fū", meaning: "丈夫", example: "农夫" }
    ],
    hint: "天的上横短，夫的上横出头"
  },
  {
    id: "bei-jian",
    characters: [
      { char: "贝", pinyin: "bèi", meaning: "宝贝", example: "贝壳" },
      { char: "见", pinyin: "jiàn", meaning: "看见", example: "看见" }
    ],
    hint: "贝下面是点，见下面是竖弯钩"
  },
  {
    id: "wei-mo",
    characters: [
      { char: "未", pinyin: "wèi", meaning: "未来", example: "未来" },
      { char: "末", pinyin: "mò", meaning: "末尾", example: "期末" }
    ],
    hint: "未上横短下横长，末上横长下横短"
  },
  {
    id: "you-yu",
    characters: [
      { char: "由", pinyin: "yóu", meaning: "理由", example: "理由" },
      { char: "甲", pinyin: "jiǎ", meaning: "甲虫", example: "甲骨" }
    ],
    hint: "由的竖向上出头，甲的竖向下出头"
  },
  {
    id: "da-tai",
    characters: [
      { char: "大", pinyin: "dà", meaning: "大小", example: "大人" },
      { char: "太", pinyin: "tài", meaning: "太平", example: "太太" }
    ],
    hint: "大的笔画少，太多一点"
  },
  {
    id: "wang-yu",
    characters: [
      { char: "王", pinyin: "wáng", meaning: "国王", example: "王子" },
      { char: "玉", pinyin: "yù", meaning: "玉石", example: "玉米" }
    ],
    hint: "王没有点，玉有一点"
  },
  {
    id: "shi-gan",
    characters: [
      { char: "石", pinyin: "shí", meaning: "石头", example: "石子" },
      { char: "右", pinyin: "yòu", meaning: "右边", example: "左右" }
    ],
    hint: "石撇长，右撇短"
  },
  {
    id: "mian-mian",
    characters: [
      { char: "免", pinyin: "miǎn", meaning: "免费", example: "免票" },
      { char: "兔", pinyin: "tù", meaning: "兔子", example: "小兔" }
    ],
    hint: "免没有点，兔有一点"
  },
  {
    id: "qing-jing",
    characters: [
      { char: "请", pinyin: "qǐng", meaning: "请客", example: "请坐" },
      { char: "情", pinyin: "qíng", meaning: "感情", example: "友情" }
    ],
    hint: "请是言字旁，情是竖心旁"
  },
  {
    id: "xi-xi",
    characters: [
      { char: "西", pinyin: "xī", meaning: "东西", example: "西瓜" },
      { char: "酉", pinyin: "yǒu", meaning: "地支第十位", example: "酉时" }
    ],
    hint: "西的框是斜的，酉的框是方的"
  },
  {
    id: "zhi-zhi",
    characters: [
      { char: "只", pinyin: "zhī", meaning: "只有", example: "只是" },
      { char: "兄", pinyin: "xiōng", meaning: "兄弟", example: "兄弟" }
    ],
    hint: "只下面是八，兄下面是儿"
  },
  {
    id: "huang-huang",
    characters: [
      { char: "丸", pinyin: "wán", meaning: "药丸", example: "弹丸" },
      { char: "九", pinyin: "jiǔ", meaning: "数字九", example: "九月" }
    ],
    hint: "丸有一点，九没有点"
  },
  {
    id: "ci-xi",
    characters: [
      { char: "刺", pinyin: "cì", meaning: "刺刀", example: "刺刀" },
      { char: "剌", pinyin: "là", meaning: "剌那", example: "剌那" }
    ],
    hint: "刺中间是一束，剌中间是一刀"
  },
  {
    id: "hou-hou-2",
    characters: [
      { char: "侯", pinyin: "hóu", meaning: "侯爵", example: "王侯" },
      { char: "候", pinyin: "hòu", meaning: "等候", example: "时候" }
    ],
    hint: "侯没有竖，候有一竖"
  },
  // 新增形近字
  {
    id: "wan-wang",
    characters: [
      { char: "万", pinyin: "wàn", meaning: "一万", example: "百万" },
      { char: "方", pinyin: "fāng", meaning: "方形", example: "方向" }
    ],
    hint: "万上面没有点，方上面有一点"
  },
  {
    id: "hou-hou-3",
    characters: [
      { char: "厚", pinyin: "hòu", meaning: "厚道", example: "忠厚" },
      { char: "原", pinyin: "yuán", meaning: "原来", example: "原因" }
    ],
    hint: "厚厂字头，原厂字头但里面不同"
  },
  {
    id: "li-mian",
    characters: [
      { char: "李", pinyin: "lǐ", meaning: "李子", example: "桃李" },
      { char: "季", pinyin: "jì", meaning: "季节", example: "春季" }
    ],
    hint: "李是木子，季是禾子"
  },
  {
    id: "zhou-zhou",
    characters: [
      { char: "州", pinyin: "zhōu", meaning: "州县", example: "神州" },
      { char: "洲", pinyin: "zhōu", meaning: "绿洲", example: "绿洲" }
    ],
    hint: "州是三点水，洲是两点水"
  },
  {
    id: "qiu-bing",
    characters: [
      { char: "丘", pinyin: "qiū", meaning: "山丘", example: "丘陵" },
      { char: "兵", pinyin: "bīng", meaning: "士兵", example: "陆军" }
    ],
    hint: "丘下面一横，兵下面两横"
  },
  {
    id: "yu-gan",
    characters: [
      { char: "于", pinyin: "yú", meaning: "于是", example: "于是" },
      { char: "干", pinyin: "gān", meaning: "干净", example: "干净" }
    ],
    hint: "于上面一横，干上面两横"
  },
  {
    id: "ji-yi",
    characters: [
      { char: "己", pinyin: "jǐ", meaning: "自己", example: "自己" },
      { char: "已", pinyin: "yǐ", meaning: "已经", example: "已经" },
      { char: "巳", pinyin: "sì", meaning: "巳时", example: "巳时" }
    ],
    hint: "己半开口，已半封口，巳全封口"
  },
  {
    id: "wu-niao",
    characters: [
      { char: "乌", pinyin: "wū", meaning: "乌鸦", example: "乌黑" },
      { char: "鸟", pinyin: "niǎo", meaning: "小鸟", example: "飞鸟" }
    ],
    hint: "乌没有点，鸟有一点"
  },
  {
    id: "huan-chui",
    characters: [
      { char: "欢", pinyin: "huān", meaning: "欢乐", example: "喜欢" },
      { char: "吹", pinyin: "chuī", meaning: "吹气", example: "吹风" }
    ],
    hint: "欢又字旁，吹口字旁"
  },
  {
    id: "zhu-zhu",
    characters: [
      { char: "住", pinyin: "zhù", meaning: "住处", example: "居住" },
      { char: "注", pinyin: "zhù", meaning: "注意", example: "关注" }
    ],
    hint: "住是单人旁，注是三点水"
  },
  {
    id: "xiu-ti",
    characters: [
      { char: "休", pinyin: "xiū", meaning: "休息", example: "午休" },
      { char: "体", pinyin: "tǐ", meaning: "体育", example: "身体" }
    ],
    hint: "休单人旁，体单人旁"
  },
  {
    id: "yuan-yuan-2",
    characters: [
      { char: "元", pinyin: "yuán", meaning: "一元", example: "元旦" },
      { char: "园", pinyin: "yuán", meaning: "公园", example: "校园" }
    ],
    hint: "元无框，园有框"
  },
  {
    id: "lan-yang",
    characters: [
      { char: "兰", pinyin: "lán", meaning: "兰花", example: "兰花" },
      { char: "羊", pinyin: "yáng", meaning: "山羊", example: "羊毛" }
    ],
    hint: "兰上面是三横，羊上面是两点"
  },
  {
    id: "shu-mi",
    characters: [
      { char: "述", pinyin: "shù", meaning: "讲述", example: "描述" },
      { char: "迷", pinyin: "mí", meaning: "迷路", example: "迷路" }
    ],
    hint: "述走之旁，迷走之旁"
  },
  {
    id: "qing-qing-2",
    characters: [
      { char: "清", pinyin: "qīng", meaning: "清楚", example: "清洁" },
      { char: "晴", pinyin: "qíng", meaning: "晴天", example: "晴朗" }
    ],
    hint: "清是三点水，晴是日字旁"
  },
  {
    id: "yu-mang",
    characters: [
      { char: "育", pinyin: "yù", meaning: "教育", example: "体育" },
      { char: "盲", pinyin: "máng", meaning: "盲人", example: "盲人" }
    ],
    hint: "育上面有横，盲上面有点"
  },
  {
    id: "jia-zhong",
    characters: [
      { char: "家", pinyin: "jiā", meaning: "家庭", example: "回家" },
      { char: "冢", pinyin: "zhǒng", meaning: "坟墓", example: "荒冢" }
    ],
    hint: "家有点，冢没点"
  },
  {
    id: "zhen-zhi",
    characters: [
      { char: "真", pinyin: "zhēn", meaning: "真实", example: "真的" },
      { char: "直", pinyin: "zhí", meaning: "直线", example: "直的" }
    ],
    hint: "真里面是三横，直里面是两横"
  },
  {
    id: "zhuo-kan",
    characters: [
      { char: "着", pinyin: "zhe", meaning: "说着", example: "看着" },
      { char: "看", pinyin: "kàn", meaning: "看见", example: "看书" }
    ],
    hint: "着目字旁，看目字底"
  },
  {
    id: "jian-wen",
    characters: [
      { char: "间", pinyin: "jiān", meaning: "房间", example: "房间" },
      { char: "问", pinyin: "wèn", meaning: "问题", example: "问题" }
    ],
    hint: "间是日，问是口"
  },
  {
    id: "che-dong",
    characters: [
      { char: "车", pinyin: "chē", meaning: "汽车", example: "火车" },
      { char: "东", pinyin: "dōng", meaning: "东方", example: "东西" }
    ],
    hint: "车有横，东无横"
  },
  {
    id: "shan-shan-2",
    characters: [
      { char: "杉", pinyin: "shān", meaning: "杉树", example: "杉树" },
      { char: "衫", pinyin: "shān", meaning: "衣衫", example: "衬衫" }
    ],
    hint: "杉是木字旁，衫是衣字旁"
  },
  {
    id: "liang-liang-2",
    characters: [
      { char: "凉", pinyin: "liáng", meaning: "凉爽", example: "凉快" },
      { char: "景", pinyin: "jǐng", meaning: "风景", example: "景色" }
    ],
    hint: "凉是两点水，景是日字旁"
  },
  {
    id: "ping-ping-2",
    characters: [
      { char: "坪", pinyin: "píng", meaning: "草坪", example: "草坪" },
      { char: "评", pinyin: "píng", meaning: "评论", example: "批评" }
    ],
    hint: "坪是土字旁，评是言字旁"
  },
  {
    id: "ban-ban-2",
    characters: [
      { char: "板", pinyin: "bǎn", meaning: "板凳", example: "黑板" },
      { char: "版", pinyin: "bǎn", meaning: "出版", example: "版本" }
    ],
    hint: "板是木字旁，版是片字旁"
  },
  {
    id: "cheng-cheng",
    characters: [
      { char: "城", pinyin: "chéng", meaning: "城市", example: "长城" },
      { char: "诚", pinyin: "chéng", meaning: "诚实", example: "真诚" }
    ],
    hint: "城是土字旁，诚是言字旁"
  },
  {
    id: "wan-wan-2",
    characters: [
      { char: "挽", pinyin: "wǎn", meaning: "挽回", example: "挽回" },
      { char: "晚", pinyin: "wǎn", meaning: "晚上", example: "早晚" }
    ],
    hint: "挽是提手旁，晚是日字旁"
  },
  {
    id: "dian-dian-2",
    characters: [
      { char: "店", pinyin: "diàn", meaning: "商店", example: "书店" },
      { char: "惦", pinyin: "diàn", meaning: "惦记", example: "惦记" }
    ],
    hint: "店是广字头，惦是竖心旁"
  },
  {
    id: "yang-yang-2",
    characters: [
      { char: "扬", pinyin: "yáng", meaning: "表扬", example: "表扬" },
      { char: "杨", pinyin: "yáng", meaning: "杨树", example: "杨树" }
    ],
    hint: "扬是提手旁，杨是木字旁"
  },
  {
    id: "you-you-2",
    characters: [
      { char: "忧", pinyin: "yōu", meaning: "忧愁", example: "忧虑" },
      { char: "优", pinyin: "yōu", meaning: "优秀", example: "优秀" }
    ],
    hint: "忧是竖心旁，优是单人旁"
  },
  {
    id: "lian-lian-2",
    characters: [
      { char: "连", pinyin: "lián", meaning: "连着", example: "连接" },
      { char: "莲", pinyin: "lián", meaning: "莲花", example: "莲叶" }
    ],
    hint: "连是车字旁，莲是草字头"
  },
  {
    id: "shen-tan",
    characters: [
      { char: "深", pinyin: "shēn", meaning: "深浅", example: "深海" },
      { char: "探", pinyin: "tàn", meaning: "探索", example: "探路" }
    ],
    hint: "深是三点水，探是提手旁"
  },
  {
    id: "xiao-shao",
    characters: [
      { char: "消", pinyin: "xiāo", meaning: "消失", example: "消灭" },
      { char: "哨", pinyin: "shào", meaning: "哨子", example: "口哨" }
    ],
    hint: "消是三点水，哨是口字旁"
  },
  {
    id: "zhen-shen",
    characters: [
      { char: "镇", pinyin: "zhèn", meaning: "城镇", example: "城镇" },
      { char: "慎", pinyin: "shèn", meaning: "慎重", example: "谨慎" }
    ],
    hint: "镇是金字旁，慎是竖心旁"
  },
  {
    id: "lou-lou",
    characters: [
      { char: "楼", pinyin: "lóu", meaning: "楼房", example: "楼房" },
      { char: "搂", pinyin: "lǒu", meaning: "搂抱", example: "搂抱" }
    ],
    hint: "楼是木字旁，搂是提手旁"
  },
  {
    id: "yao-yao",
    characters: [
      { char: "摇", pinyin: "yáo", meaning: "摇头", example: "摇摆" },
      { char: "遥", pinyin: "yáo", meaning: "遥远", example: "遥远" }
    ],
    hint: "摇是提手旁，遥是走之旁"
  },
  {
    id: "si-si",
    characters: [
      { char: "思", pinyin: "sī", meaning: "思考", example: "思念" },
      { char: "恩", pinyin: "ēn", meaning: "恩情", example: "恩人" }
    ],
    hint: "思心字底，恩心字底"
  },
  {
    id: "tao-tao",
    characters: [
      { char: "桃", pinyin: "táo", meaning: "桃子", example: "桃树" },
      { char: "逃", pinyin: "táo", meaning: "逃跑", example: "逃跑" }
    ],
    hint: "桃是木字旁，逃是走之旁"
  },
  {
    id: "ge-ge",
    characters: [
      { char: "歌", pinyin: "gē", meaning: "歌曲", example: "唱歌" },
      { char: "哥", pinyin: "gē", meaning: "哥哥", example: "大哥" }
    ],
    hint: "歌有欠，哥没有欠"
  },
  {
    id: "ji-ji-2",
    characters: [
      { char: "技", pinyin: "jì", meaning: "技术", example: "技术" },
      { char: "枝", pinyin: "zhī", meaning: "树枝", example: "树枝" }
    ],
    hint: "技是提手旁，枝是木字旁"
  },
  {
    id: "lan-lan-2",
    characters: [
      { char: "拦", pinyin: "lán", meaning: "阻拦", example: "拦截" },
      { char: "栏", pinyin: "lán", meaning: "栏杆", example: "栏杆" }
    ],
    hint: "拦是提手旁，栏是木字旁"
  },
  {
    id: "pu-pu",
    characters: [
      { char: "铺", pinyin: "pū", meaning: "铺路", example: "店铺" },
      { char: "脯", pinyin: "pú", meaning: "胸脯", example: "果脯" }
    ],
    hint: "铺是金字旁，脯是月字旁"
  },
  {
    id: "zuo-zuo",
    characters: [
      { char: "座", pinyin: "zuò", meaning: "座位", example: "满座" },
      { char: "坐", pinyin: "zuò", meaning: "坐下", example: "请坐" }
    ],
    hint: "座下面有广，坐下面有土"
  },
  {
    id: "bian-bian",
    characters: [
      { char: "遍", pinyin: "biàn", meaning: "遍地", example: "遍地" },
      { char: "编", pinyin: "biān", meaning: "编织", example: "编写" }
    ],
    hint: "遍是走之旁，编是绞丝旁"
  },
  {
    id: "yang-yang-3",
    characters: [
      { char: "洋", pinyin: "yáng", meaning: "海洋", example: "大洋" },
      { char: "样", pinyin: "yàng", meaning: "样子", example: "样子" }
    ],
    hint: "洋是三点水，样是木字旁"
  }
];
