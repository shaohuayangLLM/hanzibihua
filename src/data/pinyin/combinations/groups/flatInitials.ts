/**
 * 平舌音声母组合数据
 * 声母: z, c, s
 * 只能与开口呼和合口呼韵母组合(不含uang)
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const flatInitialsData: CombinationData = {
  // 开口呼韵母
  a: [
    { initial: "z", final: "a", tones: [createTone("zā", 1, "扎", "扎辫子", "zā biàn zi"), createTone("zá", 2, "砸", "砸破", "zá pò")] },
    { initial: "c", final: "a", tones: [createTone("cā", 1, "擦", "擦桌子", "cā zhuō zi"), createTone("cà", 4, "擦", "摩擦", "mó cà")] },
    { initial: "s", final: "a", tones: [createTone("sā", 1, "撒", "撒种", "sā zhǒng"), createTone("sǎ", 3, "洒", "洒水", "sǎ shuǐ")] },
  ],
  o: [],  // 平舌音 + o 无效
  e: [
    { initial: "z", final: "e", tones: [createTone("zé", 2, "泽", "光泽", "guāng zé"), createTone("zé", 2, "责", "责任", "zé rèn")] },
    { initial: "c", final: "e", tones: [createTone("cè", 4, "策", "政策", "zhèng cè")] },
    { initial: "s", final: "e", tones: [createTone("sè", 4, "色", "颜色", "yán sè")] },
  ],
  ai: [
    { initial: "z", final: "ai", tones: [createTone("zāi", 1, "灾", "灾害", "zāi hài"), createTone("zài", 4, "在", "现在", "xiàn zài"), createTone("zài", 4, "再", "再见", "zài jiàn")] },
    { initial: "c", final: "ai", tones: [createTone("cāi", 1, "猜", "猜测", "cāi cè"), createTone("cái", 2, "才", "刚才", "gāng cái"), createTone("cài", 4, "菜", "买菜", "mǎi cài")] },
    { initial: "s", final: "ai", tones: [createTone("sāi", 1, "腮", "腮帮", "sāi bāng")] },
  ],
  ao: [
    { initial: "z", final: "ao", tones: [createTone("zāo", 1, "遭", "遭遇", "zāo yù"), createTone("zǎo", 3, "早", "早晨", "zǎo chén"), createTone("zào", 4, "造", "制造", "zhì zào")] },
    { initial: "c", final: "ao", tones: [createTone("cāo", 1, "操", "早操", "zǎo cāo"), createTone("cáo", 2, "槽", "水槽", "shuǐ cáo"), createTone("cào", 4, "糙", "粗糙", "cū cào")] },
    { initial: "s", final: "ao", tones: [createTone("sāo", 1, "骚", "骚扰", "sāo rǎo"), createTone("sǎo", 3, "扫", "扫地", "sǎo dì")] },
  ],
  ou: [
    { initial: "z", final: "ou", tones: [createTone("zōu", 1, "走", "走路", "zǒu lù"), createTone("zòu", 4, "奏", "演奏", "yǎn zòu")] },
    { initial: "c", final: "ou", tones: [createTone("còu", 4, "凑", "凑巧", "còu qiǎo")] },
    { initial: "s", final: "ou", tones: [createTone("sōu", 1, "搜", "搜索", "sōu suǒ"), createTone("sǒu", 3, "叟", "叟使", "sōu shǐ")] },
  ],
  an: [
    { initial: "z", final: "an", tones: [createTone("zān", 1, "簪", "簪子", "zān zi"), createTone("zǎn", 3, "攒", "攒钱", "zǎn qián"), createTone("zàn", 4, "赞", "称赞", "chēng zàn")] },
    { initial: "c", final: "an", tones: [createTone("cān", 1, "餐", "餐厅", "cān tīng"), createTone("cán", 2, "蚕", "蚕宝宝", "cán bǎo bao"), createTone("càn", 4, "灿", "灿烂", "càn làn")] },
    { initial: "s", final: "an", tones: [createTone("sān", 1, "三", "三个", "sān gè"), createTone("sǎn", 3, "伞", "雨伞", "yǔ sǎn"), createTone("sàn", 4, "散", "散步", "sàn bù")] },
  ],
  en: [
    { initial: "z", final: "en", tones: [createTone("zēn", 1, "怎", "怎么", "zěn me")] },
    { initial: "c", final: "en", tones: [createTone("cèn", 4, "岑", "岑寂", "cén jì")] },
    { initial: "s", final: "en", tones: [createTone("sēn", 1, "森", "森林", "sēn lín")] },
  ],
  ang: [
    { initial: "z", final: "ang", tones: [createTone("zāng", 1, "脏", "肮脏", "āng zāng"), createTone("zàng", 4, "藏", "躲藏", "duǒ cáng")] },
    { initial: "c", final: "ang", tones: [createTone("cāng", 1, "仓", "仓库", "cāng kù"), createTone("cáng", 2, "藏", "珍藏", "zhēn cáng")] },
    { initial: "s", final: "ang", tones: [createTone("sāng", 1, "桑", "桑树", "sāng shù"), createTone("sàng", 4, "丧", "丧事", "sāng shì")] },
  ],
  eng: [
    { initial: "z", final: "eng", tones: [createTone("zēng", 1, "增", "增加", "zēng jiā"), createTone("zèng", 4, "赠", "赠送", "zèng sòng")] },
    { initial: "c", final: "eng", tones: [createTone("cēng", 1, "噌", "噌啦", "cēng lā")] },
    { initial: "s", final: "eng", tones: [createTone("sēng", 1, "僧", "僧人", "sēng rén")] },
  ],
  ong: [
    { initial: "z", final: "ong", tones: [createTone("zōng", 1, "宗", "祖宗", "zǔ zong"), createTone("zǒng", 3, "总", "总共", "zǒng gòng")] },
    { initial: "c", final: "ong", tones: [createTone("cōng", 1, "匆", "匆忙", "cōng máng"), createTone("còng", 4, "从", "从来", "cóng lái")] },
    { initial: "s", final: "ong", tones: [createTone("sōng", 1, "松", "松树", "sōng shù"), createTone("sòng", 4, "送", "送礼", "sòng lǐ")] },
  ],
  er: [],  // er 不与声母组合

  // 齐齿呼韵母 - 平舌音无效
  i: [], ia: [], ie: [], iao: [], iu: [], ian: [], in: [], iang: [], ing: [], iong: [],

  // 合口呼韵母
  u: [
    { initial: "z", final: "u", tones: [createTone("zū", 1, "租", "租房", "zū fáng"), createTone("zú", 2, "族", "民族", "mín zú"), createTone("zǔ", 3, "组", "小组", "xiǎo zǔ"), createTone("zù", 4, "阻", "阻挡", "zǔ dǎng")] },
    { initial: "c", final: "u", tones: [createTone("cū", 1, "粗", "粗细", "cū xì")] },
    { initial: "s", final: "u", tones: [createTone("sū", 1, "苏", "苏州", "sū zhōu"), createTone("sù", 4, "速", "速度", "sù dù"), createTone("sù", 4, "素", "朴素", "pǔ sù")] },
  ],
  ua: [],  // 平舌音 + ua 无效
  uo: [
    { initial: "z", final: "uo", tones: [createTone("zuō", 1, "作", "作坊", "zuō fang"), createTone("zuǒ", 3, "左", "左边", "zuǒ biān"), createTone("zuò", 4, "坐", "坐下", "zuò xià")] },
    { initial: "c", final: "uo", tones: [createTone("cuō", 1, "搓", "搓手", "cuō shǒu"), createTone("cuò", 4, "错", "错误", "cuò wù")] },
    { initial: "s", final: "uo", tones: [createTone("suō", 1, "梭", "穿梭", "chuān suō"), createTone("suǒ", 3, "琐", "琐碎", "suǒ suì")] },
  ],
  uai: [],  // 平舌音 + uai 无效
  ui: [
    { initial: "z", final: "ui", tones: [createTone("zuī", 1, "嘴", "嘴巴", "zuǐ bā"), createTone("zuì", 4, "最", "最好", "zuì hǎo")] },
    { initial: "c", final: "ui", tones: [createTone("cuī", 1, "催", "催促", "cuī cù"), createTone("cuì", 4, "脆", "脆弱", "cuì ruò")] },
    { initial: "s", final: "ui", tones: [createTone("suī", 1, "虽", "虽然", "suī rán"), createTone("suí", 2, "随", "跟随", "gēn suí"), createTone("suì", 4, "岁", "岁月", "suì yuè")] },
  ],
  uan: [
    { initial: "z", final: "uan", tones: [createTone("zuān", 1, "钻", "钻研", "zuān yán"), createTone("zuàn", 4, "赚", "赚钱", "zhuàn qián")] },
    { initial: "c", final: "uan", tones: [createTone("cuān", 1, "窜", "窜改", "cuàn gǎi")] },
    { initial: "s", final: "uan", tones: [createTone("suān", 1, "酸", "酸味", "suān wèi"), createTone("suàn", 4, "蒜", "大蒜", "dà suàn")] },
  ],
  un: [
    { initial: "z", final: "un", tones: [createTone("zūn", 1, "尊", "尊敬", "zūn jìng")] },
    { initial: "c", final: "un", tones: [createTone("cūn", 1, "村", "村子", "cūn zi"), createTone("cùn", 4, "寸", "一寸", "yī cùn")] },
    { initial: "s", final: "un", tones: [createTone("sūn", 1, "孙", "孙子", "sūn zi")] },
  ],
  uang: [],  // 平舌音 + uang 无效

  // 撮口呼韵母 - 平舌音无效
  ü: [], üe: [], üan: [], ün: [],
};
