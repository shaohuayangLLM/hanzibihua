import { EnglishModule } from './types';

// 英语学习模块配置
export const ENGLISH_MODULES: EnglishModule[] = [
  {
    id: 'letter-sounds',
    title: '字母发音',
    icon: '🔤',
    color: 'bg-blue-500',
    description: '学习26个字母在单词中的发音',
    route: '/english/letter-sounds',
  },
  {
    id: 'cvc-practice',
    title: 'CVC拼读',
    icon: '📖',
    color: 'bg-green-500',
    description: '练习辅音-元音-辅音单词拼读',
    route: '/english/cvc-practice',
  },
  {
    id: 'phonics-rules',
    title: '拼读规则',
    icon: '📋',
    color: 'bg-purple-500',
    description: '学习长元音、字母组合发音规则',
    route: '/english/phonics-rules',
  },
  {
    id: 'word-families',
    title: '词族练习',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-orange-500',
    description: '学习相同押韵的单词家族',
    route: '/english/word-families',
    disabled: true,
  },
  {
    id: 'sight-words',
    title: '高频词',
    icon: '⭐',
    color: 'bg-yellow-500',
    description: '掌握不符合拼读规则的高频词',
    route: '/english/sight-words',
    disabled: true,
  },
  {
    id: 'blending-practice',
    title: '拼读练习',
    icon: '🎯',
    color: 'bg-red-500',
    description: '听音辨词，强化拼读能力',
    route: '/english/blending-practice',
    disabled: true,
  },
];

// 获取模块配置
export const getModuleById = (id: string): EnglishModule | undefined => {
  return ENGLISH_MODULES.find(module => module.id === id);
};
