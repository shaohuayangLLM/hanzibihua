import { LetterSound } from './types';

// 26个字母发音数据
export const LETTER_SOUNDS: LetterSound[] = [
  {
    letter: 'A',
    lowercase: 'a',
    phonics: '/æ/',
    sound: '短元音',
    examples: ['cat', 'hat', 'map', 'bat', 'rat'],
    exampleWords: [
      { word: 'cat', phonetic: '/kæt/', translation: '猫' },
      { word: 'apple', phonetic: '/ˈæpl/', translation: '苹果' },
      { word: 'ant', phonetic: '/ænt/', translation: '蚂蚁' },
    ],
  },
  {
    letter: 'B',
    lowercase: 'b',
    phonics: '/b/',
    sound: '爆破音',
    examples: ['bat', 'ball', 'book', 'bed', 'box'],
    exampleWords: [
      { word: 'ball', phonetic: '/bɔːl/', translation: '球' },
      { word: 'book', phonetic: '/bʊk/', translation: '书' },
      { word: 'bear', phonetic: '/beə(r)/', translation: '熊' },
    ],
  },
  {
    letter: 'C',
    lowercase: 'c',
    phonics: '/k/',
    sound: '爆破音（在a, o, u前）',
    examples: ['cat', 'cup', 'car', 'can', 'cot'],
    exampleWords: [
      { word: 'cat', phonetic: '/kæt/', translation: '猫' },
      { word: 'car', phonetic: '/kɑː(r)/', translation: '汽车' },
      { word: 'cup', phonetic: '/kʌp/', translation: '杯子' },
    ],
  },
  {
    letter: 'D',
    lowercase: 'd',
    phonics: '/d/',
    sound: '爆破音',
    examples: ['dog', 'dad', 'bed', 'red', 'duck'],
    exampleWords: [
      { word: 'dog', phonetic: '/dɒɡ/', translation: '狗' },
      { word: 'duck', phonetic: '/dʌk/', translation: '鸭子' },
      { word: 'door', phonetic: '/dɔː(r)/', translation: '门' },
    ],
  },
  {
    letter: 'E',
    lowercase: 'e',
    phonics: '/e/',
    sound: '短元音',
    examples: ['bed', 'pen', 'hen', 'ten', 'net'],
    exampleWords: [
      { word: 'egg', phonetic: '/eɡ/', translation: '鸡蛋' },
      { word: 'elephant', phonetic: '/ˈelɪfənt/', translation: '大象' },
      { word: 'bed', phonetic: '/bed/', translation: '床' },
    ],
  },
  {
    letter: 'F',
    lowercase: 'f',
    phonics: '/f/',
    sound: '唇齿音',
    examples: ['fish', 'fan', 'fat', 'fun', 'fit'],
    exampleWords: [
      { word: 'fish', phonetic: '/fɪʃ/', translation: '鱼' },
      { word: 'fan', phonetic: '/fæn/', translation: '风扇' },
      { word: 'frog', phonetic: '/frɒɡ/', translation: '青蛙' },
    ],
  },
  {
    letter: 'G',
    lowercase: 'g',
    phonics: '/ɡ/',
    sound: '爆破音',
    examples: ['dog', 'gas', 'goat', 'gap', 'got'],
    exampleWords: [
      { word: 'girl', phonetic: '/ɡɜːl/', translation: '女孩' },
      { word: 'goat', phonetic: '/ɡəʊt/', translation: '山羊' },
      { word: 'gun', phonetic: '/ɡʌn/', translation: '枪' },
    ],
  },
  {
    letter: 'H',
    lowercase: 'h',
    phonics: '/h/',
    sound: '声门擦音',
    examples: ['hat', 'hot', 'hen', 'hop', 'hit'],
    exampleWords: [
      { word: 'hat', phonetic: '/hæt/', translation: '帽子' },
      { word: 'house', phonetic: '/haʊs/', translation: '房子' },
      { word: 'hand', phonetic: '/hænd/', translation: '手' },
    ],
  },
  {
    letter: 'I',
    lowercase: 'i',
    phonics: '/ɪ/',
    sound: '短元音',
    examples: ['pig', 'sit', 'fin', 'pin', 'big'],
    exampleWords: [
      { word: 'pig', phonetic: '/pɪɡ/', translation: '猪' },
      { word: 'ink', phonetic: '/ɪŋk/', translation: '墨水' },
      { word: 'igloo', phonetic: '/ˈɪɡluː/', translation: '冰屋' },
    ],
  },
  {
    letter: 'J',
    lowercase: 'j',
    phonics: '/dʒ/',
    sound: '塞擦音',
    examples: ['jam', 'jet', 'job', 'jump', 'jog'],
    exampleWords: [
      { word: 'jump', phonetic: '/dʒʌmp/', translation: '跳' },
      { word: 'juice', phonetic: '/dʒuːs/', translation: '果汁' },
      { word: 'jelly', phonetic: '/ˈdʒeli/', translation: '果冻' },
    ],
  },
  {
    letter: 'K',
    lowercase: 'k',
    phonics: '/k/',
    sound: '爆破音',
    examples: ['kit', 'kite', 'key', 'kid', 'kin'],
    exampleWords: [
      { word: 'kite', phonetic: '/kaɪt/', translation: '风筝' },
      { word: 'key', phonetic: '/kiː/', translation: '钥匙' },
      { word: 'king', phonetic: '/kɪŋ/', translation: '国王' },
    ],
  },
  {
    letter: 'L',
    lowercase: 'l',
    phonics: '/l/',
    sound: '边音',
    examples: ['lap', 'lip', 'log', 'lot', 'let'],
    exampleWords: [
      { word: 'lamp', phonetic: '/læmp/', translation: '台灯' },
      { word: 'lion', phonetic: '/ˈlaɪən/', translation: '狮子' },
      { word: 'leg', phonetic: '/leɡ/', translation: '腿' },
    ],
  },
  {
    letter: 'M',
    lowercase: 'm',
    phonics: '/m/',
    sound: '双唇鼻音',
    examples: ['map', 'mat', 'man', 'mop', 'mix'],
    exampleWords: [
      { word: 'map', phonetic: '/mæp/', translation: '地图' },
      { word: 'milk', phonetic: '/mɪlk/', translation: '牛奶' },
      { word: 'moon', phonetic: '/muːn/', translation: '月亮' },
    ],
  },
  {
    letter: 'N',
    lowercase: 'n',
    phonics: '/n/',
    sound: '齿龈鼻音',
    examples: ['net', 'nut', 'nap', 'not', 'nine'],
    exampleWords: [
      { word: 'net', phonetic: '/net/', translation: '网' },
      { word: 'nose', phonetic: '/nəʊz/', translation: '鼻子' },
      { word: 'nest', phonetic: '/nest/', translation: '鸟巢' },
    ],
  },
  {
    letter: 'O',
    lowercase: 'o',
    phonics: '/ɒ/',
    sound: '短元音',
    examples: ['dog', 'hot', 'pot', 'top', 'mop'],
    exampleWords: [
      { word: 'octopus', phonetic: '/ˈɒktəpəs/', translation: '章鱼' },
      { word: 'orange', phonetic: '/ˈɒrɪndʒ/', translation: '橙子' },
      { word: 'fox', phonetic: '/fɒks/', translation: '狐狸' },
    ],
  },
  {
    letter: 'P',
    lowercase: 'p',
    phonics: '/p/',
    sound: '爆破音',
    examples: ['pan', 'pen', 'pig', 'pot', 'pat'],
    exampleWords: [
      { word: 'pen', phonetic: '/pen/', translation: '钢笔' },
      { word: 'pig', phonetic: '/pɪɡ/', translation: '猪' },
      { word: 'panda', phonetic: '/ˈpændə/', translation: '熊猫' },
    ],
  },
  {
    letter: 'Q',
    lowercase: 'q',
    phonics: '/kw/',
    sound: '与u组成 /kw/',
    examples: ['quit', 'quiz', 'quick', 'quiet', 'quilt'],
    exampleWords: [
      { word: 'queen', phonetic: '/kwiːn/', translation: '女王' },
      { word: 'quiet', phonetic: '/ˈkwaɪət/', translation: '安静的' },
      { word: 'quilt', phonetic: '/kwɪlt/', translation: '被子' },
    ],
  },
  {
    letter: 'R',
    lowercase: 'r',
    phonics: '/r/',
    sound: '近音',
    examples: ['rat', 'run', 'red', 'rib', 'rug'],
    exampleWords: [
      { word: 'rabbit', phonetic: '/ˈræbɪt/', translation: '兔子' },
      { word: 'rain', phonetic: '/reɪn/', translation: '雨' },
      { word: 'rose', phonetic: '/rəʊz/', translation: '玫瑰' },
    ],
  },
  {
    letter: 'S',
    lowercase: 's',
    phonics: '/s/',
    sound: '摩擦音（词首）',
    examples: ['sun', 'sit', 'sat', 'soap', 'sock'],
    exampleWords: [
      { word: 'sun', phonetic: '/sʌn/', translation: '太阳' },
      { word: 'star', phonetic: '/stɑː(r)/', translation: '星星' },
      { word: 'snake', phonetic: '/sneɪk/', translation: '蛇' },
    ],
  },
  {
    letter: 'T',
    lowercase: 't',
    phonics: '/t/',
    sound: '爆破音',
    examples: ['top', 'tap', 'ten', 'two', 'toy'],
    exampleWords: [
      { word: 'tiger', phonetic: '/ˈtaɪɡə(r)/', translation: '老虎' },
      { word: 'tree', phonetic: '/triː/', translation: '树' },
      { word: 'train', phonetic: '/treɪn/', translation: '火车' },
    ],
  },
  {
    letter: 'U',
    lowercase: 'u',
    phonics: '/ʌ/',
    sound: '短元音',
    examples: ['bus', 'cup', 'sun', 'nut', 'gun'],
    exampleWords: [
      { word: 'umbrella', phonetic: '/ʌmˈbrelə/', translation: '雨伞' },
      { word: 'up', phonetic: '/ʌp/', translation: '向上' },
      { word: 'duck', phonetic: '/dʌk/', translation: '鸭子' },
    ],
  },
  {
    letter: 'V',
    lowercase: 'v',
    phonics: '/v/',
    sound: '唇齿摩擦音',
    examples: ['van', 'vet', 'vase', 'vest', 'vim'],
    exampleWords: [
      { word: 'violin', phonetic: '/ˌvaɪəˈlɪn/', translation: '小提琴' },
      { word: 'vase', phonetic: '/vɑːz/', translation: '花瓶' },
      { word: 'vest', phonetic: '/vest/', translation: '背心' },
    ],
  },
  {
    letter: 'W',
    lowercase: 'w',
    phonics: '/w/',
    sound: '半元音',
    examples: ['wet', 'win', 'web', 'wig', 'wit'],
    exampleWords: [
      { word: 'water', phonetic: '/ˈwɔːtə(r)/', translation: '水' },
      { word: 'window', phonetic: '/ˈwɪndəʊ/', translation: '窗户' },
      { word: 'wolf', phonetic: '/wʊlf/', translation: '狼' },
    ],
  },
  {
    letter: 'X',
    lowercase: 'x',
    phonics: '/ks/',
    sound: '在词尾发 /ks/',
    examples: ['box', 'fox', 'mix', 'fix', 'six'],
    exampleWords: [
      { word: 'box', phonetic: '/bɒks/', translation: '盒子' },
      { word: 'fox', phonetic: '/fɒks/', translation: '狐狸' },
      { word: 'six', phonetic: '/sɪks/', translation: '六' },
    ],
  },
  {
    letter: 'Y',
    lowercase: 'y',
    phonics: '/j/',
    sound: '在词首发 /j/',
    examples: ['yes', 'yet', 'yellow', 'yak', 'yam'],
    exampleWords: [
      { word: 'yellow', phonetic: '/ˈjeləʊ/', translation: '黄色' },
      { word: 'yo-yo', phonetic: '/ˈjəʊjəʊ/', translation: '溜溜球' },
      { word: 'yacht', phonetic: '/jɒt/', translation: '游艇' },
    ],
  },
  {
    letter: 'Z',
    lowercase: 'z',
    phonics: '/z/',
    sound: '摩擦音',
    examples: ['zoo', 'zip', 'zag', 'zed', 'zig'],
    exampleWords: [
      { word: 'zoo', phonetic: '/zuː/', translation: '动物园' },
      { word: 'zebra', phonetic: '/ˈzebrə/', translation: '斑马' },
      { word: 'zip', phonetic: '/zɪp/', translation: '拉链' },
    ],
  },
];

// 按字母获取发音数据
export const getLetterSound = (letter: string): LetterSound | undefined => {
  return LETTER_SOUNDS.find(l => l.letter === letter || l.lowercase === letter);
};

// 获取所有元音字母
export const VOWELS = LETTER_SOUNDS.filter(l => ['A', 'E', 'I', 'O', 'U'].includes(l.letter));

// 获取所有辅音字母
export const CONSONANTS = LETTER_SOUNDS.filter(l => !['A', 'E', 'I', 'O', 'U'].includes(l.letter));
