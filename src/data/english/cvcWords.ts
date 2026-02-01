import { CVCWord } from './types';

// CVC 单词数据
export const CVC_WORDS: CVCWord[] = [
  // Short a words
  { id: 'cat', word: 'cat', pattern: 'CVC', phonics: { first: '/k/', vowel: '/æ/', last: '/t/' }, translation: '猫', level: 1 },
  { id: 'hat', word: 'hat', pattern: 'CVC', phonics: { first: '/h/', vowel: '/æ/', last: '/t/' }, translation: '帽子', level: 1 },
  { id: 'bat', word: 'bat', pattern: 'CVC', phonics: { first: '/b/', vowel: '/æ/', last: '/t/' }, translation: '蝙蝠', level: 1 },
  { id: 'rat', word: 'rat', pattern: 'CVC', phonics: { first: '/r/', vowel: '/æ/', last: '/t/' }, translation: '老鼠', level: 1 },
  { id: 'mat', word: 'mat', pattern: 'CVC', phonics: { first: '/m/', vowel: '/æ/', last: '/t/' }, translation: '垫子', level: 1 },
  { id: 'map', word: 'map', pattern: 'CVC', phonics: { first: '/m/', vowel: '/æ/', last: '/p/' }, translation: '地图', level: 1 },
  { id: 'cap', word: 'cap', pattern: 'CVC', phonics: { first: '/k/', vowel: '/æ/', last: '/p/' }, translation: '帽子', level: 1 },
  { id: 'dad', word: 'dad', pattern: 'CVC', phonics: { first: '/d/', vowel: '/æ/', last: '/d/' }, translation: '爸爸', level: 1 },
  { id: 'pad', word: 'pad', pattern: 'CVC', phonics: { first: '/p/', vowel: '/æ/', last: '/d/' }, translation: '本子', level: 1 },

  // Short e words
  { id: 'bed', word: 'bed', pattern: 'CVC', phonics: { first: '/b/', vowel: '/e/', last: '/d/' }, translation: '床', level: 1 },
  { id: 'red', word: 'red', pattern: 'CVC', phonics: { first: '/r/', vowel: '/e/', last: '/d/' }, translation: '红色', level: 1 },
  { id: 'hen', word: 'hen', pattern: 'CVC', phonics: { first: '/h/', vowel: '/e/', last: '/n/' }, translation: '母鸡', level: 1 },
  { id: 'pen', word: 'pen', pattern: 'CVC', phonics: { first: '/p/', vowel: '/e/', last: '/n/' }, translation: '钢笔', level: 1 },
  { id: 'ten', word: 'ten', pattern: 'CVC', phonics: { first: '/t/', vowel: '/e/', last: '/n/' }, translation: '十', level: 1 },
  { id: 'net', word: 'net', pattern: 'CVC', phonics: { first: '/n/', vowel: '/e/', last: '/t/' }, translation: '网', level: 1 },
  { id: 'wet', word: 'wet', pattern: 'CVC', phonics: { first: '/w/', vowel: '/e/', last: '/t/' }, translation: '湿的', level: 1 },

  // Short i words
  { id: 'pig', word: 'pig', pattern: 'CVC', phonics: { first: '/p/', vowel: '/ɪ/', last: '/ɡ/' }, translation: '猪', level: 1 },
  { id: 'big', word: 'big', pattern: 'CVC', phonics: { first: '/b/', vowel: '/ɪ/', last: '/ɡ/' }, translation: '大的', level: 1 },
  { id: 'dig', word: 'dig', pattern: 'CVC', phonics: { first: '/d/', vowel: '/ɪ/', last: '/ɡ/' }, translation: '挖', level: 1 },
  { id: 'sit', word: 'sit', pattern: 'CVC', phonics: { first: '/s/', vowel: '/ɪ/', last: '/t/' }, translation: '坐', level: 1 },
  { id: 'hit', word: 'hit', pattern: 'CVC', phonics: { first: '/h/', vowel: '/ɪ/', last: '/t/' }, translation: '打', level: 1 },
  { id: 'fit', word: 'fit', pattern: 'CVC', phonics: { first: '/f/', vowel: '/ɪ/', last: '/t/' }, translation: '适合', level: 1 },
  { id: 'fin', word: 'fin', pattern: 'CVC', phonics: { first: '/f/', vowel: '/ɪ/', last: '/n/' }, translation: '鱼鳍', level: 1 },
  { id: 'pin', word: 'pin', pattern: 'CVC', phonics: { first: '/p/', vowel: '/ɪ/', last: '/n/' }, translation: '别针', level: 1 },
  { id: 'win', word: 'win', pattern: 'CVC', phonics: { first: '/w/', vowel: '/ɪ/', last: '/n/' }, translation: '赢', level: 1 },
  { id: 'kid', word: 'kid', pattern: 'CVC', phonics: { first: '/k/', vowel: '/ɪ/', last: '/d/' }, translation: '小孩', level: 1 },
  { id: 'lid', word: 'lid', pattern: 'CVC', phonics: { first: '/l/', vowel: '/ɪ/', last: '/d/' }, translation: '盖子', level: 1 },

  // Short o words
  { id: 'dog', word: 'dog', pattern: 'CVC', phonics: { first: '/d/', vowel: '/ɒ/', last: '/ɡ/' }, translation: '狗', level: 1 },
  { id: 'log', word: 'log', pattern: 'CVC', phonics: { first: '/l/', vowel: '/ɒ/', last: '/ɡ/' }, translation: '木头', level: 1 },
  { id: 'fog', word: 'fog', pattern: 'CVC', phonics: { first: '/f/', vowel: '/ɒ/', last: '/ɡ/' }, translation: '雾', level: 1 },
  { id: 'hot', word: 'hot', pattern: 'CVC', phonics: { first: '/h/', vowel: '/ɒ/', last: '/t/' }, translation: '热的', level: 1 },
  { id: 'pot', word: 'pot', pattern: 'CVC', phonics: { first: '/p/', vowel: '/ɒ/', last: '/t/' }, translation: '锅', level: 1 },
  { id: 'dot', word: 'dot', pattern: 'CVC', phonics: { first: '/d/', vowel: '/ɒ/', last: '/t/' }, translation: '点', level: 1 },
  { id: 'mop', word: 'mop', pattern: 'CVC', phonics: { first: '/m/', vowel: '/ɒ/', last: '/p/' }, translation: '拖把', level: 1 },
  { id: 'hop', word: 'hop', pattern: 'CVC', phonics: { first: '/h/', vowel: '/ɒ/', last: '/p/' }, translation: '跳', level: 1 },
  { id: 'top', word: 'top', pattern: 'CVC', phonics: { first: '/t/', vowel: '/ɒ/', last: '/p/' }, translation: '顶部', level: 1 },
  { id: 'box', word: 'box', pattern: 'CVC', phonics: { first: '/b/', vowel: '/ɒ/', last: '/ks/' }, translation: '盒子', level: 1 },
  { id: 'fox', word: 'fox', pattern: 'CVC', phonics: { first: '/f/', vowel: '/ɒ/', last: '/ks/' }, translation: '狐狸', level: 1 },
  { id: 'ox', word: 'ox', pattern: 'CVC', phonics: { first: '/ɒ/', vowel: '', last: '/ks/' }, translation: '牛', level: 1 },

  // Short u words
  { id: 'bus', word: 'bus', pattern: 'CVC', phonics: { first: '/b/', vowel: '/ʌ/', last: '/s/' }, translation: '公共汽车', level: 1 },
  { id: 'cup', word: 'cup', pattern: 'CVC', phonics: { first: '/k/', vowel: '/ʌ/', last: '/p/' }, translation: '杯子', level: 1 },
  { id: 'pup', word: 'pup', pattern: 'CVC', phonics: { first: '/p/', vowel: '/ʌ/', last: '/p/' }, translation: '小狗', level: 1 },
  { id: 'sun', word: 'sun', pattern: 'CVC', phonics: { first: '/s/', vowel: '/ʌ/', last: '/n/' }, translation: '太阳', level: 1 },
  { id: 'run', word: 'run', pattern: 'CVC', phonics: { first: '/r/', vowel: '/ʌ/', last: '/n/' }, translation: '跑', level: 1 },
  { id: 'fun', word: 'fun', pattern: 'CVC', phonics: { first: '/f/', vowel: '/ʌ/', last: '/n/' }, translation: '有趣的', level: 1 },
  { id: 'gun', word: 'gun', pattern: 'CVC', phonics: { first: '/ɡ/', vowel: '/ʌ/', last: '/n/' }, translation: '枪', level: 1 },
  { id: 'nut', word: 'nut', pattern: 'CVC', phonics: { first: '/n/', vowel: '/ʌ/', last: '/t/' }, translation: '坚果', level: 1 },
  { id: 'cut', word: 'cut', pattern: 'CVC', phonics: { first: '/k/', vowel: '/ʌ/', last: '/t/' }, translation: '切', level: 1 },
  { id: 'hut', word: 'hut', pattern: 'CVC', phonics: { first: '/h/', vowel: '/ʌ/', last: '/t/' }, translation: '小屋', level: 1 },
  { id: 'mud', word: 'mud', pattern: 'CVC', phonics: { first: '/m/', vowel: '/ʌ/', last: '/d/' }, translation: '泥', level: 1 },
  { id: 'bug', word: 'bug', pattern: 'CVC', phonics: { first: '/b/', vowel: '/ʌ/', last: '/ɡ/' }, translation: '虫子', level: 1 },
  { id: 'rug', word: 'rug', pattern: 'CVC', phonics: { first: '/r/', vowel: '/ʌ/', last: '/ɡ/' }, translation: '小地毯', level: 1 },
  { id: 'duck', word: 'duck', pattern: 'CVC', phonics: { first: '/d/', vowel: '/ʌ/', last: '/k/' }, translation: '鸭子', level: 1 },
];

// 获取指定难度的单词
export const getCVCWordsByLevel = (level: 1 | 2 | 3): CVCWord[] => {
  return CVC_WORDS.filter(word => word.level === level);
};

// 获取随机单词
export const getRandomCVCWords = (count: number): CVCWord[] => {
  const shuffled = [...CVC_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 按元音分组
export const getCVCWordsByVowel = (vowel: 'a' | 'e' | 'i' | 'o' | 'u'): CVCWord[] => {
  const vowelMap: Record<string, string> = {
    'a': '/æ/',
    'e': '/e/',
    'i': '/ɪ/',
    'o': '/ɒ/',
    'u': '/ʌ/',
  };
  const phonics = vowelMap[vowel];
  return CVC_WORDS.filter(word => word.phonics.vowel === phonics);
};
