import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface PinyinSpeechOptions {
  rate?: number;
  pitch?: number;
}

/**
 * Custom hook for pinyin pronunciation using Web Speech API
 *
 * @param options - Speech options
 * @returns speak function and browser support status
 */
export const usePinyinSpeech = (options: PinyinSpeechOptions = {}) => {
  const { rate = 0.9, pitch = 1.1 } = options;

  // Load voices when component mounts (needed for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
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
  }, []);

  /**
   * Speak pinyin or text using Web Speech API
   *
   * @param text - The text to speak
   * @param customRate - Optional custom speech rate
   */
  const speak = useCallback((text: string, customRate?: number) => {
    if (!text || text.trim() === '') {
      return;
    }

    if (!('speechSynthesis' in window)) {
      toast.error('您的浏览器不支持语音朗读功能');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = customRate ?? rate;
    utterance.pitch = pitch;

    // Try to find a Chinese voice
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice =>
      voice.lang.includes('zh') || voice.lang.includes('CN')
    );

    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    // Handle errors
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    window.speechSynthesis.speak(utterance);
  }, [rate, pitch]);

  /**
   * Check if browser supports speech synthesis
   */
  const isSupported = 'speechSynthesis' in window;

  return {
    speak,
    isSupported,
  };
};
