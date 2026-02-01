import { PhonicsRule } from './types';

// 拼读规则数据
export const PHONICS_RULES: PhonicsRule[] = [
  {
    id: 'short-vowels',
    name: '短元音规则',
    pattern: 'CVC',
    sound: 'æ, e, ɪ, ɒ, ʌ',
    description: '在CVC（辅音-元音-辅音）结构中，元音发短音',
    examples: [
      { word: 'cat', phonetic: '/kæt/', translation: '猫' },
      { word: 'bed', phonetic: '/bed/', translation: '床' },
      { word: 'pig', phonetic: '/pɪɡ/', translation: '猪' },
      { word: 'dog', phonetic: '/dɒɡ/', translation: '狗' },
      { word: 'bus', phonetic: '/bʌs/', translation: '公共汽车' },
    ],
  },
  {
    id: 'magic-e',
    name: 'Magic E 规则',
    pattern: 'a_e, i_e, o_e, u_e',
    sound: 'eɪ, aɪ, əʊ, juː',
    description: '当元音字母后跟辅音字母再加不发音的 e 时，元音发长音',
    examples: [
      { word: 'cake', phonetic: '/keɪk/', translation: '蛋糕' },
      { word: 'kite', phonetic: '/kaɪt/', translation: '风筝' },
      { word: 'home', phonetic: '/həʊm/', translation: '家' },
      { word: 'cute', phonetic: '/kjuːt/', translation: '可爱' },
    ],
  },
  {
    id: 'long-vowel-teams',
    name: '长元音组合',
    pattern: 'ee, ea, ai, ay, oa',
    sound: 'iː, iː, eɪ, eɪ, əʊ',
    description: '两个元音字母在一起，通常第一个发长音',
    examples: [
      { word: 'feet', phonetic: '/fiːt/', translation: '脚（复数）' },
      { word: 'team', phonetic: '/tiːm/', translation: '队伍' },
      { word: 'rain', phonetic: '/reɪn/', translation: '雨' },
      { word: 'day', phonetic: '/deɪ/', translation: '天' },
      { word: 'boat', phonetic: '/bəʊt/', translation: '船' },
    ],
  },
  {
    id: 'r-controlled',
    name: 'R 控制元音',
    pattern: 'ar, or, er, ir, ur',
    sound: 'ɑː, ɔː, ə, ɜː, ɜː',
    description: '当元音字母后跟 r 时，r 控制元音的发音',
    examples: [
      { word: 'car', phonetic: '/kɑː(r)/', translation: '汽车' },
      { word: 'fork', phonetic: '/fɔːk/', translation: '叉子' },
      { word: 'her', phonetic: '/hɜː(r)/', translation: '她' },
      { word: 'bird', phonetic: '/bɜːd/', translation: '鸟' },
      { word: 'burn', phonetic: '/bɜːn/', translation: '燃烧' },
    ],
  },
  {
    id: 'digraphs',
    name: '双辅音字母',
    pattern: 'sh, ch, th, ph, wh',
    sound: 'ʃ, tʃ, θ/ð, f, w/h',
    description: '两个辅音字母组合在一起，发一个新的音',
    examples: [
      { word: 'ship', phonetic: '/ʃɪp/', translation: '船' },
      { word: 'chat', phonetic: '/tʃæt/', translation: '聊天' },
      { word: 'thin', phonetic: '/θɪn/', translation: '薄的' },
      { word: 'this', phonetic: '/ðɪs/', translation: '这个' },
      { word: 'phone', phonetic: '/fəʊn/', translation: '电话' },
    ],
  },
  {
    id: 'blends',
    name: '辅音组合',
    pattern: 'bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sc, sk, sl, sm, sn, sp, st, sw, tr, tw',
    sound: '分别发音',
    description: '两个或三个辅音字母组合在一起，各自保持发音',
    examples: [
      { word: 'blue', phonetic: '/bluː/', translation: '蓝色' },
      { word: 'tree', phonetic: '/triː/', translation: '树' },
      { word: 'frog', phonetic: '/frɒɡ/', translation: '青蛙' },
      { word: 'star', phonetic: '/stɑː(r)/', translation: '星星' },
    ],
  },
  {
    id: 'double-letters',
    name: '双写字母',
    pattern: 'ff, ll, ss, zz',
    sound: 'f, l, s, z',
    description: '在短元音后，f、l、s、z 通常双写',
    examples: [
      { word: 'off', phonetic: '/ɒf/', translation: '关闭' },
      { word: 'bell', phonetic: '/bel/', translation: '铃' },
      { word: 'mess', phonetic: '/mes/', translation: '混乱' },
      { word: 'buzz', phonetic: '/bʌz/', translation: '嗡嗡声' },
    ],
  },
  {
    id: 'silent-letters',
    name: '不发音字母',
    pattern: 'kn, wr, gn, mb',
    sound: 'n, r, n, m',
    description: '某些字母在特定位置不发音',
    examples: [
      { word: 'knee', phonetic: '/niː/', translation: '膝盖' },
      { word: 'write', phonetic: '/raɪt/', translation: '写' },
      { word: 'gnat', phonetic: '/næt/', translation: '蚋' },
      { word: 'lamb', phonetic: '/læm/', translation: '羊羔' },
    ],
  },
  {
    id: 'soft-c-g',
    name: '软 C 和软 G',
    pattern: 'ce, ci, cy / ge, gi',
    sound: 's / dʒ',
    description: 'c 和 g 在 e、i、y 前发软音',
    examples: [
      { word: 'city', phonetic: '/ˈsɪti/', translation: '城市' },
      { word: 'cent', phonetic: '/sent/', translation: '分' },
      { word: 'gym', phonetic: '/dʒɪm/', translation: '健身房' },
      { word: 'giant', phonetic: '/ˈdʒaɪənt/', translation: '巨人' },
    ],
  },
  {
    id: 'diphthongs',
    name: '双元音',
    pattern: 'oo, ou, ow, oi, oy',
    sound: 'uː/ʊ, aʊ, aʊ, ɔɪ, ɔɪ',
    description: '两个元音字母组合发一个滑动的音',
    examples: [
      { word: 'moon', phonetic: '/muːn/', translation: '月亮' },
      { word: 'book', phonetic: '/bʊk/', translation: '书' },
      { word: 'house', phonetic: '/haʊs/', translation: '房子' },
      { word: 'cow', phonetic: '/kaʊ/', translation: '牛' },
      { word: 'coin', phonetic: '/kɔɪn/', translation: '硬币' },
    ],
  },
];

// 获取所有规则类别
export const getRuleCategories = () => {
  return [
    { id: 'basic', name: '基础规则', rules: ['short-vowels', 'magic-e'] },
    { id: 'vowel-teams', name: '元音组合', rules: ['long-vowel-teams', 'r-controlled', 'diphthongs'] },
    { id: 'consonants', name: '辅音规则', rules: ['digraphs', 'blends', 'double-letters'] },
    { id: 'special', name: '特殊规则', rules: ['silent-letters', 'soft-c-g'] },
  ];
};

// 根据类别获取规则
export const getRulesByCategory = (categoryId: string): PhonicsRule[] => {
  const category = getRuleCategories().find(c => c.id === categoryId);
  if (!category) return [];
  return PHONICS_RULES.filter(rule => category.rules.includes(rule.id));
};
