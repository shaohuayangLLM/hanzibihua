/**
 * 偏旁部首消消乐数据
 * 按偏旁分组，每组包含多个汉字
 */

export interface RadicalGroup {
  id: string;
  radical: string;        // 偏旁部首
  radicalName: string;    // 偏旁名称
  color: string;          // 显示颜色
  characters: {
    char: string;
    pinyin: string;
    meaning: string;
  }[];
  hint: string;          // 偏旁含义提示
}

// 偏旁部首数据
export const RADICAL_GROUPS: RadicalGroup[] = [
  {
    id: "water",
    radical: "氵",
    radicalName: "三点水",
    color: "bg-blue-500",
    characters: [
      { char: "江", pinyin: "jiāng", meaning: "江河" },
      { char: "河", pinyin: "hé", meaning: "河流" },
      { char: "湖", pinyin: "hú", meaning: "湖泊" },
      { char: "海", pinyin: "hǎi", meaning: "大海" },
      { char: "洋", pinyin: "yáng", meaning: "海洋" },
      { char: "流", pinyin: "liú", meaning: "流动" },
      { char: "洗", pinyin: "xǐ", meaning: "洗东西" },
      { char: "澡", pinyin: "zǎo", meaning: "洗澡" }
    ],
    hint: "与水有关"
  },
  {
    id: "wood",
    radical: "木",
    radicalName: "木字旁",
    color: "bg-green-600",
    characters: [
      { char: "林", pinyin: "lín", meaning: "树林" },
      { char: "树", pinyin: "shù", meaning: "树木" },
      { char: "森", pinyin: "sēn", meaning: "森林" },
      { char: "桥", pinyin: "qiáo", meaning: "桥梁" },
      { char: "梯", pinyin: "tī", meaning: "梯子" },
      { char: "桌", pinyin: "zhuō", meaning: "桌子" },
      { char: "椅", pinyin: "yǐ", meaning: "椅子" },
      { char: "柜", pinyin: "guì", meaning: "柜子" }
    ],
    hint: "与树木有关"
  },
  {
    id: "person",
    radical: "亻",
    radicalName: "单人旁",
    color: "bg-orange-500",
    characters: [
      { char: "人", pinyin: "rén", meaning: "人类" },
      { char: "你", pinyin: "nǐ", meaning: "你" },
      { char: "他", pinyin: "tā", meaning: "他" },
      { char: "们", pinyin: "men", meaning: "复数标记" },
      { char: "休", pinyin: "xiū", meaning: "休息" },
      { char: "体", pinyin: "tǐ", meaning: "身体" },
      { char: "住", pinyin: "zhù", meaning: "居住" },
      { char: "位", pinyin: "wèi", meaning: "位置" }
    ],
    hint: "与人有关"
  },
  {
    id: "heart",
    radical: "忄",
    radicalName: "竖心旁",
    color: "bg-red-500",
    characters: [
      { char: "心", pinyin: "xīn", meaning: "心脏" },
      { char: "情", pinyin: "qíng", meaning: "感情" },
      { char: "想", pinyin: "xiǎng", meaning: "想念" },
      { char: "思", pinyin: "sī", meaning: "思考" },
      { char: "忙", pinyin: "máng", meaning: "忙碌" },
      { char: "快", pinyin: "kuài", meaning: "快乐" },
      { char: "怕", pinyin: "pà", meaning: "害怕" },
      { char: "惊", pinyin: "jīng", meaning: "惊讶" }
    ],
    hint: "与心理、情感有关"
  },
  {
    id: "mouth",
    radical: "口",
    radicalName: "口字旁",
    color: "bg-pink-500",
    characters: [
      { char: "口", pinyin: "kǒu", meaning: "嘴巴" },
      { char: "吃", pinyin: "chī", meaning: "吃" },
      { char: "喝", pinyin: "hē", meaning: "喝" },
      { char: "唱", pinyin: "chàng", meaning: "唱歌" },
      { char: "叫", pinyin: "jiào", meaning: "叫喊" },
      { char: "听", pinyin: "tīng", meaning: "听" },
      { char: "说", pinyin: "shuō", meaning: "说话" },
      { char: "问", pinyin: "wèn", meaning: "问问题" }
    ],
    hint: "与嘴巴、说话有关"
  },
  {
    id: "grass",
    radical: "艹",
    radicalName: "草字头",
    color: "bg-green-500",
    characters: [
      { char: "草", pinyin: "cǎo", meaning: "花草" },
      { char: "花", pinyin: "huā", meaning: "花朵" },
      { char: "树", pinyin: "shù", meaning: "树木" },
      { char: "叶", pinyin: "yè", meaning: "叶子" },
      { char: "苗", pinyin: "miáo", meaning: "禾苗" },
      { char: "茶", pinyin: "chá", meaning: "茶叶" },
      { char: "莲", pinyin: "lián", meaning: "莲花" },
      { char: "荷", pinyin: "hé", meaning: "荷花" }
    ],
    hint: "与花草植物有关"
  },
  {
    id: "hand",
    radical: "扌",
    radicalName: "提手旁",
    color: "bg-yellow-600",
    characters: [
      { char: "手", pinyin: "shǒu", meaning: "手" },
      { char: "打", pinyin: "dǎ", meaning: "打" },
      { char: "拿", pinyin: "ná", meaning: "拿取" },
      { char: "提", pinyin: "tí", meaning: "提东西" },
      { char: "推", pinyin: "tuī", meaning: "推" },
      { char: "拉", pinyin: "lā", meaning: "拉" },
      { char: "抱", pinyin: "bào", meaning: "拥抱" },
      { char: "捉", pinyin: "zhuō", meaning: "捉住" }
    ],
    hint: "与手的动作有关"
  },
  {
    id: "fire",
    radical: "火",
    radicalName: "火字旁",
    color: "bg-orange-600",
    characters: [
      { char: "火", pinyin: "huǒ", meaning: "火" },
      { char: "灯", pinyin: "dēng", meaning: "灯光" },
      { char: "烧", pinyin: "shāo", meaning: "烧" },
      { char: "烤", pinyin: "kǎo", meaning: "烧烤" },
      { char: "炒", pinyin: "chǎo", meaning: "炒菜" },
      { char: "炸", pinyin: "zhá", meaning: "油炸" },
      { char: "烟", pinyin: "yān", meaning: "烟雾" },
      { char: "烛", pinyin: "zhú", meaning: "蜡烛" }
    ],
    hint: "与火、光亮有关"
  },
  {
    id: "earth",
    radical: "土",
    radicalName: "土字旁",
    color: "bg-amber-700",
    characters: [
      { char: "土", pinyin: "tǔ", meaning: "泥土" },
      { char: "地", pinyin: "dì", meaning: "土地" },
      { char: "场", pinyin: "chǎng", meaning: "场地" },
      { char: "坡", pinyin: "pō", meaning: "山坡" },
      { char: "堆", pinyin: "duī", meaning: "堆积" },
      { char: "块", pinyin: "kuài", meaning: "一块" },
      { char: "坏", pinyin: "huài", meaning: "坏" },
      { char: "坐", pinyin: "zuò", meaning: "坐下" }
    ],
    hint: "与土地有关"
  },
  {
    id: "woman",
    radical: "女",
    radicalName: "女字旁",
    color: "bg-purple-500",
    characters: [
      { char: "女", pinyin: "nǚ", meaning: "女人" },
      { char: "妈", pinyin: "mā", meaning: "妈妈" },
      { char: "姐", pinyin: "jiě", meaning: "姐姐" },
      { char: "妹", pinyin: "mèi", meaning: "妹妹" },
      { char: "奶", pinyin: "nǎi", meaning: "奶奶" },
      { char: "姑", pinyin: "gū", meaning: "姑姑" },
      { char: "婆", pinyin: "pó", meaning: "婆婆" },
      { char: "好", pinyin: "hǎo", meaning: "好" }
    ],
    hint: "与女性有关"
  }
];

// 获取指定偏旁的数据
export const getRadicalGroup = (radicalId: string) => {
  return RADICAL_GROUPS.find(group => group.id === radicalId);
};

// 获取所有偏旁列表
export const getAllRadicals = () => {
  return RADICAL_GROUPS.map(group => ({
    id: group.id,
    radical: group.radical,
    name: group.radicalName,
    color: group.color,
    hint: group.hint
  }));
};
