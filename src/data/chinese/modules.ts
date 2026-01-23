export interface ChineseModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  route: string;
  disabled?: boolean;
}

// 语文学习模块配置
export const CHINESE_MODULES: ChineseModule[] = [
  {
    id: 'pinyin-basics',
    title: '拼音基础',
    icon: '🔤',
    color: 'bg-blue-500',
    description: '学习声母、韵母、整体认读音节',
    route: '/pinyin-basics',
  },
  {
    id: 'pinyin-quiz',
    title: '拼音测试',
    icon: '📝',
    color: 'bg-cyan-500',
    description: '测试拼音掌握程度，包含前后鼻音、平翘舌',
    route: '/quiz',
  },
  {
    id: 'radicals',
    title: '偏旁学习',
    icon: '📖',
    color: 'bg-green-500',
    description: '学习常见偏旁部首和汉字结构',
    route: '/radicals',
  },
  {
    id: 'stroke-names',
    title: '笔画名称表',
    icon: '㇀',
    color: 'bg-orange-500',
    description: '认识汉字的基本笔画',
    route: '/stroke-names',
  },
  {
    id: 'polyphone',
    title: '多音字练习',
    icon: '📚',
    color: 'bg-yellow-500',
    description: '掌握常见多音字的不同读音和用法',
    route: '/polyphone',
  },
  {
    id: 'similar-characters',
    title: '形近字',
    icon: '👀',
    color: 'bg-orange-500',
    description: '区分形近字，避免写错字',
    route: '/similar-characters',
  },
  {
    id: 'quantity-words',
    title: '量词学习',
    icon: '📊',
    color: 'bg-purple-500',
    description: '学习常用量词的正确搭配',
    route: '/quantity-words',
  },
  {
    id: 'antonym-synonym',
    title: '反义词/近义词',
    icon: '🔄',
    color: 'bg-pink-500',
    description: '掌握词语的相反和相近关系',
    route: '/antonym-synonym',
  },
  {
    id: 'word-collocation',
    title: '词语搭配',
    icon: '🔗',
    color: 'bg-indigo-500',
    description: '学习常见的词语搭配组合',
    route: '/word-collocation',
    disabled: true,
  },
  {
    id: 'sentence-expansion',
    title: '短句扩写',
    icon: '✍️',
    color: 'bg-teal-500',
    description: '把简单的句子扩写得更丰富',
    route: '/sentence-expansion',
    disabled: true,
  },
];

// 获取模块配置
export const getModuleById = (id: string): ChineseModule | undefined => {
  return CHINESE_MODULES.find(module => module.id === id);
};
