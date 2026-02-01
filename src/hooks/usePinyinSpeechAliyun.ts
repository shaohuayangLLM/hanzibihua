import { useCallback } from 'react';
import { useAliyunTTS } from './useAliyunTTS';

// 简化版语音 Hook，用于快速替换现有的 usePinyinSpeech
// 保持与原 Hook 相同的 API 接口

export const usePinyinSpeechAliyun = () => {
  const { speak, isLoading } = useAliyunTTS({
    voice: 'longxiaochun', // 使用龙小春音色（适合儿童）
    speed: 1.0,
    onError: (error) => {
      console.error('Speech error:', error);
    },
  });

  const speakPinyin = useCallback(async (pinyin: string) => {
    // 判断是拼音还是英语还是汉字
    const isEnglish = /^[a-zA-Z\s]+$/.test(pinyin);
    const isPinyin = /[āáǎāēéěēīíǐīōóǒōūúǔūǖǘǚǖ]/.test(pinyin);

    let textToSpeak = pinyin;

    if (isPinyin) {
      // 如果是拼音，转成汉字后再朗读（需要实现拼音转汉字）
      // 暂时直接朗读拼音
      textToSpeak = pinyin;
    } else if (!isEnglish) {
      // 是汉字，直接朗读
      textToSpeak = pinyin;
    }

    await speak(textToSpeak);
  }, [speak]);

  return {
    speak: speakPinyin,
    isLoading,
  };
};
