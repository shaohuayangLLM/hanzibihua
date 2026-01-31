/**
 * 舌根音声母组合数据
 * 声母: g, k, h
 * 只能与开口呼和合口呼韵母组合
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const rootInitialsData: CombinationData = {
  // 开口呼韵母
  a: [
    { initial: "g", final: "a", tones: [createTone("gā", 1, "嘎", "嘎嘎", "gā gā"), createTone("gǎ", 3, "尬", "尴尬", "gān gà")] },
    { initial: "k", final: "a", tones: [createTone("kǎ", 3, "卡", "卡片", "kǎ piàn")] },
    { initial: "h", final: "a", tones: [createTone("hā", 1, "哈", "哈哈", "hā hā")] },
  ],
  o: [],  // 舌根音 + o 无效
  e: [
    { initial: "g", final: "e", tones: [createTone("gē", 1, "哥", "哥哥", "gē ge"), createTone("gè", 4, "个", "一个", "yī gè")] },
    { initial: "k", final: "e", tones: [createTone("kè", 4, "课", "上课", "shàng kè")] },
    { initial: "h", final: "e", tones: [createTone("hé", 2, "河", "河水", "hé shuǐ"), createTone("hè", 4, "贺", "祝贺", "zhù hè")] },
  ],
  ai: [
    { initial: "g", final: "ai", tones: [createTone("gāi", 1, "该", "应该", "yīng gāi"), createTone("gǎi", 3, "改", "改正", "gǎi zhèng")] },
    { initial: "k", final: "ai", tones: [createTone("kāi", 1, "开", "开门", "kāi mén")] },
    { initial: "h", final: "ai", tones: [createTone("hǎi", 3, "海", "大海", "dà hǎi")] },
  ],
  ei: [
    { initial: "g", final: "ei", tones: [createTone("gěi", 3, "给", "给你", "gěi nǐ")] },
    { initial: "k", final: "ei", tones: [] },
    { initial: "h", final: "ei", tones: [createTone("hēi", 1, "黑", "黑色", "hēi sè")] },
  ],
  ao: [
    { initial: "g", final: "ao", tones: [createTone("gāo", 1, "高", "高兴", "gāo xìng"), createTone("gǎo", 3, "搞", "搞好", "gǎo hǎo")] },
    { initial: "k", final: "ao", tones: [createTone("kǎo", 3, "考", "考试", "kǎo shì")] },
    { initial: "h", final: "ao", tones: [createTone("hǎo", 3, "好", "好人", "hǎo rén"), createTone("hào", 4, "号", "号数", "hào shù")] },
  ],
  ou: [
    { initial: "g", final: "ou", tones: [createTone("gōu", 1, "沟", "水沟", "shuǐ gōu"), createTone("gǒu", 3, "狗", "小狗", "xiǎo gǒu"), createTone("gòu", 4, "够", "足够", "zú gòu")] },
    { initial: "k", final: "ou", tones: [createTone("kǒu", 3, "口", "人口", "rén kǒu")] },
    { initial: "h", final: "ou", tones: [createTone("hóu", 2, "猴", "猴子", "hóu zi")] },
  ],
  an: [
    { initial: "g", final: "an", tones: [createTone("gān", 1, "干", "干净", "gān jìng"), createTone("gǎn", 3, "敢", "勇敢", "yǒng gǎn"), createTone("gàn", 4, "干", "干活", "gàn huó")] },
    { initial: "k", final: "an", tones: [createTone("kàn", 4, "看", "看书", "kàn shū")] },
    { initial: "h", final: "an", tones: [createTone("hán", 2, "寒", "寒冷", "hán lěng")] },
  ],
  en: [
    { initial: "g", final: "en", tones: [createTone("gēn", 1, "根", "树根", "shù gēn"), createTone("gèn", 4, "亘", "亘古", "gèn gǔ")] },
    { initial: "k", final: "en", tones: [] },
    { initial: "h", final: "en", tones: [createTone("hén", 2, "痕", "痕迹", "hén jì")] },
  ],
  ang: [
    { initial: "g", final: "ang", tones: [createTone("gāng", 1, "钢", "钢铁", "gāng tiě"), createTone("gāng", 1, "刚", "刚才", "gāng cái")] },
    { initial: "k", final: "ang", tones: [createTone("kāng", 1, "康", "健康", "jiàn kāng")] },
    { initial: "h", final: "ang", tones: [createTone("hāng", 1, "夯", "夯实", "hāng shí")] },
  ],
  eng: [
    { initial: "g", final: "eng", tones: [createTone("gēng", 1, "更", "更多", "gèng duō"), createTone("gèng", 4, "更", "更加", "gèng jiā")] },
    { initial: "k", final: "eng", tones: [] },
    { initial: "h", final: "eng", tones: [createTone("hēng", 1, "哼", "哼哼", "hēng hēng")] },
  ],
  ong: [
    { initial: "g", final: "ong", tones: [createTone("gōng", 1, "工", "工作", "gōng zuò"), createTone("gǒng", 3, "拱", "拱桥", "gǒng qiáo"), createTone("gòng", 4, "共", "共同", "gòng tóng")] },
    { initial: "k", final: "ong", tones: [] },
    { initial: "h", final: "ong", tones: [createTone("hōng", 1, "轰", "轰炸", "hōng zhà"), createTone("hóng", 2, "红", "红色", "hóng sè"), createTone("hǒng", 3, "哄", "哄人", "hǒng rén")] },
  ],
  er: [],  // er 不与声母组合

  // 齐齿呼韵母 - 舌根音无效
  i: [], ia: [], ie: [], iao: [], iu: [], ian: [], in: [], iang: [], ing: [], iong: [],

  // 合口呼韵母
  u: [
    { initial: "g", final: "u", tones: [createTone("gū", 1, "姑", "姑娘", "gū niang"), createTone("gǔ", 3, "古", "古代", "gǔ dài"), createTone("gù", 4, "故", "故乡", "gù xiāng")] },
    { initial: "k", final: "u", tones: [createTone("kū", 1, "枯", "枯萎", "kū wěi"), createTone("kǔ", 3, "苦", "辛苦", "xīn kǔ")] },
    { initial: "h", final: "u", tones: [createTone("hū", 1, "呼", "呼叫", "hū jiào"), createTone("hú", 2, "壶", "水壶", "shuǐ hú"), createTone("hù", 4, "护", "保护", "bǎo hù")] },
  ],
  ua: [
    { initial: "g", final: "ua", tones: [createTone("guā", 1, "瓜", "西瓜", "xī guā"), createTone("guǎ", 3, "剐", "剐蹭", "guǎ cèng")] },
    { initial: "h", final: "ua", tones: [createTone("huā", 1, "花", "花朵", "huā duǒ"), createTone("huá", 2, "划", "划算", "huá suàn"), createTone("huà", 4, "画", "画画", "huà huà")] },
  ],
  uo: [
    { initial: "g", final: "uo", tones: [createTone("guō", 1, "锅", "铁锅", "tiě guō"), createTone("guǒ", 3, "果", "水果", "shuǐ guǒ"), createTone("guò", 4, "过", "过去", "guò qù")] },
    { initial: "h", final: "uo", tones: [createTone("huǒ", 3, "火", "火车", "huǒ chē"), createTone("huò", 4, "货", "货物", "huò wù")] },
  ],
  uai: [
    { initial: "g", final: "uai", tones: [createTone("guāi", 1, "乖", "乖巧", "guāi qiǎo"), createTone("guài", 4, "怪", "奇怪", "qí guài")] },
    { initial: "h", final: "uai", tones: [createTone("huái", 2, "怀", "怀念", "huái niàn")] },
  ],
  ui: [
    { initial: "g", final: "ui", tones: [createTone("guī", 1, "归", "回归", "huí guī"), createTone("guǐ", 3, "鬼", "小鬼", "xiǎo guǐ"), createTone("guì", 4, "贵", "富贵", "fù guì")] },
    { initial: "h", final: "ui", tones: [createTone("huī", 1, "灰", "灰色", "huī sè"), createTone("huí", 2, "回", "回来", "huí lái"), createTone("huì", 4, "会", "开会", "kāi huì")] },
  ],
  uan: [
    { initial: "g", final: "uan", tones: [createTone("guān", 1, "关", "关门", "guān mén"), createTone("guǎn", 3, "管", "管理", "guǎn lǐ"), createTone("guàn", 4, "惯", "习惯", "xí guàn")] },
    { initial: "h", final: "uan", tones: [createTone("huān", 1, "欢", "欢乐", "huān lè"), createTone("huàn", 4, "换", "交换", "jiāo huàn")] },
  ],
  un: [
    { initial: "g", final: "un", tones: [createTone("gǔn", 3, "辊", "辊子", "gǔn zi"), createTone("gùn", 4, "棍", "棍子", "gùn zi")] },
    { initial: "h", final: "un", tones: [createTone("hūn", 1, "昏", "昏暗", "hūn àn"), createTone("hùn", 4, "混", "混乱", "hùn luàn")] },
  ],
  uang: [
    { initial: "g", final: "uang", tones: [createTone("guāng", 1, "光", "光明", "guāng míng"), createTone("guǎng", 3, "广", "广大", "guǎng dà")] },
    { initial: "h", final: "uang", tones: [createTone("huāng", 1, "慌", "慌张", "huāng zhāng"), createTone("huáng", 2, "黄", "黄色", "huáng sè"), createTone("huǎng", 3, "晃", "晃眼", "huǎng yǎn"), createTone("huàng", 4, "晃", "摇晃", "yáo huàng")] },
  ],

  // 撮口呼韵母 - 舌根音无效
  ü: [], üe: [], üan: [], ün: [],
};
