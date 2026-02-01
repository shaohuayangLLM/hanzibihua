import { useEffect, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAliyunTTS } from './useAliyunTTS';

interface PinyinSpeechOptions {
  rate?: number;
  pitch?: number;
  useAliyunTTS?: boolean; // 是否使用阿里云 TTS
}

/**
 * Custom hook for pinyin pronunciation
 * 优先使用阿里云 TTS，降级到 Web Speech API
 *
 * @param options - Speech options
 * @returns speak function and browser support status
 */
export const usePinyinSpeech = (options: PinyinSpeechOptions = {}) => {
  const { rate = 0.9, pitch = 1.1, useAliyunTTS: useAliyunTTS = true } = options;
  const [useAliyun, setUseAliyun] = useState(useAliyunTTS);

  // 阿里云 TTS Hook
  const aliyunTTS = useAliyunTTS({
    voice: 'longxiaochun', // 龙小春 - 适合儿童的中文女声
    speed: rate,
    onError: (error) => {
      console.warn('Aliyun TTS failed, falling back to browser TTS:', error);
      setUseAliyun(false);
    },
  });

  // Load voices when component mounts (needed for some browsers)
  useEffect(() => {
    if (!useAliyun && 'speechSynthesis' in window) {
      // Get voices on load
      window.speechSynthesis.getVoices();

      // Some browsers load voices asynchronously
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };

      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [useAliyun]);

  /**
   * Speak pinyin or text
   * 优先使用阿里云 TTS，失败时降级到 Web Speech API
   *
   * @param text - The text to speak
   * @param customRate - Optional custom speech rate
   */
  const speak = useCallback(async (text: string, customRate?: number) => {
    if (!text || text.trim() === '') {
      return;
    }

    // 判断文本语言
    const isEnglish = /^[a-zA-Z\s]+$/.test(text);
    const targetLang = isEnglish ? 'en-US' : 'zh-CN';

    // 尝试使用阿里云 TTS
    if (useAliyun) {
      try {
        await aliyunTTS.speak(text);
        return;
      } catch (error) {
        console.warn('Aliyun TTS failed, falling back to browser TTS:', error);
        setUseAliyun(false);
        // 继续执行降级方案
      }
    }

    // 降级到 Web Speech API
    if (!('speechSynthesis' in window)) {
      toast.error('您的浏览器不支持语音朗读功能');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang;
    utterance.rate = customRate ?? rate;
    utterance.pitch = pitch;

    // 优先选择更好的语音
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      // 1. Microsoft 语音（Edge）
      voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith(targetLang)) ||
      // 2. Google 语音
      voices.find(v => v.name.includes('Google') && v.lang.startsWith(targetLang)) ||
      // 3. 任何匹配语言的语音
      voices.find(v => v.lang.startsWith(targetLang));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Handle errors
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    window.speechSynthesis.speak(utterance);
  }, [rate, pitch, useAliyun, aliyunTTS]);

  /**
   * Check if browser supports speech synthesis
   */
  const isSupported = 'speechSynthesis' in window;

  return {
    speak,
    isSupported,
    isLoading: aliyunTTS.isLoading,
    isPlaying: aliyunTTS.isPlaying,
  };
};
