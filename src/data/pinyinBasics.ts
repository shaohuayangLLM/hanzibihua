// 拼音基础数据 - 声母、韵母、整体认读音节

// 声母数据 (23个)
export const initials: PinyinBasicItem[] = [
  { pinyin: 'b', examples: [
    { char: '八', fullPinyin: 'bā' },
    { char: '白', fullPinyin: 'bái' }
  ]},
  { pinyin: 'p', examples: [
    { char: '皮', fullPinyin: 'pí' },
    { char: '跑', fullPinyin: 'pǎo' }
  ]},
  { pinyin: 'm', examples: [
    { char: '马', fullPinyin: 'mǎ' },
    { char: '门', fullPinyin: 'mén' }
  ]},
  { pinyin: 'f', examples: [
    { char: '风', fullPinyin: 'fēng' },
    { char: '飞', fullPinyin: 'fēi' }
  ]},
  { pinyin: 'd', examples: [
    { char: '大', fullPinyin: 'dà' },
    { char: '刀', fullPinyin: 'dāo' }
  ]},
  { pinyin: 't', examples: [
    { char: '土', fullPinyin: 'tǔ' },
    { char: '天', fullPinyin: 'tiān' }
  ]},
  { pinyin: 'n', examples: [
    { char: '牛', fullPinyin: 'niú' },
    { char: '鸟', fullPinyin: 'niǎo' }
  ]},
  { pinyin: 'l', examples: [
    { char: '来', fullPinyin: 'lái' },
    { char: '路', fullPinyin: 'lù' }
  ]},
  { pinyin: 'g', examples: [
    { char: '瓜', fullPinyin: 'guā' },
    { char: '果', fullPinyin: 'guǒ' }
  ]},
  { pinyin: 'k', examples: [
    { char: '口', fullPinyin: 'kǒu' },
    { char: '开', fullPinyin: 'kāi' }
  ]},
  { pinyin: 'h', examples: [
    { char: '火', fullPinyin: 'huǒ' },
    { char: '花', fullPinyin: 'huā' }
  ]},
  { pinyin: 'j', examples: [
    { char: '家', fullPinyin: 'jiā' },
    { char: '机', fullPinyin: 'jī' }
  ]},
  { pinyin: 'q', examples: [
    { char: '七', fullPinyin: 'qī' },
    { char: '起', fullPinyin: 'qǐ' }
  ]},
  { pinyin: 'x', examples: [
    { char: '西', fullPinyin: 'xī' },
    { char: '小', fullPinyin: 'xiǎo' }
  ]},
  { pinyin: 'zh', examples: [
    { char: '纸', fullPinyin: 'zhǐ' },
    { char: '直', fullPinyin: 'zhí' }
  ]},
  { pinyin: 'ch', examples: [
    { char: '吃', fullPinyin: 'chī' },
    { char: '车', fullPinyin: 'chē' }
  ]},
  { pinyin: 'sh', examples: [
    { char: '山', fullPinyin: 'shān' },
    { char: '水', fullPinyin: 'shuǐ' }
  ]},
  { pinyin: 'r', examples: [
    { char: '日', fullPinyin: 'rì' },
    { char: '入', fullPinyin: 'rù' }
  ]},
  { pinyin: 'z', examples: [
    { char: '走', fullPinyin: 'zǒu' },
    { char: '左', fullPinyin: 'zuǒ' }
  ]},
  { pinyin: 'c', examples: [
    { char: '草', fullPinyin: 'cǎo' },
    { char: '次', fullPinyin: 'cì' }
  ]},
  { pinyin: 's', examples: [
    { char: '三', fullPinyin: 'sān' },
    { char: '四', fullPinyin: 'sì' }
  ]},
  { pinyin: 'y', examples: [
    { char: '鱼', fullPinyin: 'yú' },
    { char: '雨', fullPinyin: 'yǔ' }
  ]},
  { pinyin: 'w', examples: [
    { char: '我', fullPinyin: 'wǒ' },
    { char: '五', fullPinyin: 'wǔ' }
  ]},
];

// 韵母数据 (24个)
export const finals: PinyinBasicItem[] = [
  { pinyin: 'a', examples: [
    { char: '阿', fullPinyin: 'ā' },
    { char: '爸', fullPinyin: 'bà' }
  ]},
  { pinyin: 'o', examples: [
    { char: '我', fullPinyin: 'wǒ' },
    { char: '多', fullPinyin: 'duō' }
  ]},
  { pinyin: 'e', examples: [
    { char: '鹅', fullPinyin: 'é' },
    { char: '乐', fullPinyin: 'lè' }
  ]},
  { pinyin: 'i', examples: [
    { char: '衣', fullPinyin: 'yī' },
    { char: '机', fullPinyin: 'jī' }
  ]},
  { pinyin: 'u', examples: [
    { char: '乌', fullPinyin: 'wū' },
    { char: '书', fullPinyin: 'shū' }
  ]},
  { pinyin: 'ü', examples: [
    { char: '鱼', fullPinyin: 'yú' },
    { char: '女', fullPinyin: 'nǚ' }
  ]},
  { pinyin: 'ai', examples: [
    { char: '爱', fullPinyin: 'ài' },
    { char: '开', fullPinyin: 'kāi' }
  ]},
  { pinyin: 'ei', examples: [
    { char: '飞', fullPinyin: 'fēi' },
    { char: '北', fullPinyin: 'běi' }
  ]},
  { pinyin: 'ui', examples: [
    { char: '水', fullPinyin: 'shuǐ' },
    { char: '回', fullPinyin: 'huí' }
  ]},
  { pinyin: 'ao', examples: [
    { char: '宝', fullPinyin: 'bǎo' },
    { char: '草', fullPinyin: 'cǎo' }
  ]},
  { pinyin: 'ou', examples: [
    { char: '手', fullPinyin: 'shǒu' },
    { char: '口', fullPinyin: 'kǒu' }
  ]},
  { pinyin: 'iu', examples: [
    { char: '六', fullPinyin: 'liù' },
    { char: '九', fullPinyin: 'jiǔ' }
  ]},
  { pinyin: 'ie', examples: [
    { char: '爹', fullPinyin: 'diē' },
    { char: '姐', fullPinyin: 'jiě' }
  ]},
  { pinyin: 'üe', examples: [
    { char: '月', fullPinyin: 'yuè' },
    { char: '学', fullPinyin: 'xué' }
  ]},
  { pinyin: 'er', examples: [
    { char: '耳', fullPinyin: 'ěr' },
    { char: '二', fullPinyin: 'èr' }
  ]},
  { pinyin: 'an', examples: [
    { char: '山', fullPinyin: 'shān' },
    { char: '天', fullPinyin: 'tiān' }
  ]},
  { pinyin: 'en', examples: [
    { char: '门', fullPinyin: 'mén' },
    { char: '人', fullPinyin: 'rén' }
  ]},
  { pinyin: 'in', examples: [
    { char: '心', fullPinyin: 'xīn' },
    { char: '金', fullPinyin: 'jīn' }
  ]},
  { pinyin: 'un', examples: [
    { char: '车', fullPinyin: 'chē' },
    { char: '春', fullPinyin: 'chūn' }
  ]},
  { pinyin: 'ün', examples: [
    { char: '群', fullPinyin: 'qún' },
    { char: '军', fullPinyin: 'jūn' }
  ]},
  { pinyin: 'ang', examples: [
    { char: '光', fullPinyin: 'guāng' },
    { char: '方', fullPinyin: 'fāng' }
  ]},
  { pinyin: 'eng', examples: [
    { char: '风', fullPinyin: 'fēng' },
    { char: '灯', fullPinyin: 'dēng' }
  ]},
  { pinyin: 'ing', examples: [
    { char: '听', fullPinyin: 'tīng' },
    { char: '星', fullPinyin: 'xīng' }
  ]},
  { pinyin: 'ong', examples: [
    { char: '红', fullPinyin: 'hóng' },
    { char: '东', fullPinyin: 'dōng' }
  ]},
];

// 整体认读音节数据 (16个)
export const wholeSyllables: PinyinBasicItem[] = [
  { pinyin: 'zhi', examples: [
    { char: '纸', fullPinyin: 'zhǐ' },
    { char: '直', fullPinyin: 'zhí' }
  ]},
  { pinyin: 'chi', examples: [
    { char: '吃', fullPinyin: 'chī' },
    { char: '池', fullPinyin: 'chí' }
  ]},
  { pinyin: 'shi', examples: [
    { char: '十', fullPinyin: 'shí' },
    { char: '石', fullPinyin: 'shí' }
  ]},
  { pinyin: 'ri', examples: [
    { char: '日', fullPinyin: 'rì' },
    { char: '入', fullPinyin: 'rù' }
  ]},
  { pinyin: 'zi', examples: [
    { char: '子', fullPinyin: 'zǐ' },
    { char: '字', fullPinyin: 'zì' }
  ]},
  { pinyin: 'ci', examples: [
    { char: '次', fullPinyin: 'cì' },
    { char: '词', fullPinyin: 'cí' }
  ]},
  { pinyin: 'si', examples: [
    { char: '四', fullPinyin: 'sì' },
    { char: '丝', fullPinyin: 'sī' }
  ]},
  { pinyin: 'yi', examples: [
    { char: '一', fullPinyin: 'yī' },
    { char: '衣', fullPinyin: 'yī' }
  ]},
  { pinyin: 'wu', examples: [
    { char: '五', fullPinyin: 'wǔ' },
    { char: '无', fullPinyin: 'wú' }
  ]},
  { pinyin: 'yu', examples: [
    { char: '鱼', fullPinyin: 'yú' },
    { char: '雨', fullPinyin: 'yǔ' }
  ]},
  { pinyin: 'ye', examples: [
    { char: '爷', fullPinyin: 'yé' },
    { char: '也', fullPinyin: 'yě' }
  ]},
  { pinyin: 'yue', examples: [
    { char: '月', fullPinyin: 'yuè' },
    { char: '乐', fullPinyin: 'lè' }
  ]},
  { pinyin: 'yuan', examples: [
    { char: '元', fullPinyin: 'yuán' },
    { char: '圆', fullPinyin: 'yuán' }
  ]},
  { pinyin: 'yin', examples: [
    { char: '音', fullPinyin: 'yīn' },
    { char: '阴', fullPinyin: 'yīn' }
  ]},
  { pinyin: 'yun', examples: [
    { char: '云', fullPinyin: 'yún' },
    { char: '匀', fullPinyin: 'yún' }
  ]},
  { pinyin: 'ying', examples: [
    { char: '鹰', fullPinyin: 'yīng' },
    { char: '英', fullPinyin: 'yīng' }
  ]},
];

export interface PinyinBasicItem {
  pinyin: string;
  examples: {
    char: string;
    fullPinyin: string;
  }[];
}

export type PinyinBasicType = 'initial' | 'final' | 'whole';

// 获取指定类型的拼音数据
export const getPinyinBasics = (type: PinyinBasicType): PinyinBasicItem[] => {
  switch (type) {
    case 'initial': return initials;
    case 'final': return finals;
    case 'whole': return wholeSyllables;
    default: return [];
  }
};

// 获取类型标签
export const getPinyinTypeLabel = (type: PinyinBasicType): string => {
  switch (type) {
    case 'initial': return '声母';
    case 'final': return '韵母';
    case 'whole': return '整体认读';
    default: return '';
  }
};

// 获取类型主题色
export const getPinyinTypeColor = (type: PinyinBasicType): { bg: string; text: string; hover: string } => {
  switch (type) {
    case 'initial':
      return { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200' };
    case 'final':
      return { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' };
    case 'whole':
      return { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:bg-gray-200' };
  }
};
