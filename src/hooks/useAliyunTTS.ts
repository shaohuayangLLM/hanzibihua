import { useCallback, useRef, useState } from 'react';

// Supabase Edge Function 配置
const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/aliyun-tts`
  : '/functions/v1/aliyun-tts';

// 音频缓存管理器
class AudioCacheManager {
  private cache: Map<string, HTMLAudioElement> = new Map();
  private loading: Map<string, Promise<HTMLAudioElement>> = new Map();
  private maxSize = 100; // 最多缓存100个音频

  // 生成缓存键
  private getKey(text: string, voice?: string): string {
    return `${voice || 'default'}:${text}`;
  }

  // 获取音频
  async get(text: string, voice?: string): Promise<HTMLAudioElement> {
    const key = this.getKey(text, voice);

    // 如果已缓存，直接返回
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    // 如果正在加载，返回加载中的 Promise
    if (this.loading.has(key)) {
      return this.loading.get(key)!;
    }

    // 创建新的加载 Promise
    const loadPromise = this.loadAudio(text, voice);
    this.loading.set(key, loadPromise);

    try {
      const audio = await loadPromise;
      this.cache.set(key, audio);
      this.loading.delete(key);

      // 清理旧缓存
      if (this.cache.size > this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        const oldAudio = this.cache.get(firstKey);
        if (oldAudio) {
          oldAudio.pause();
          oldAudio.src = '';
        }
        this.cache.delete(firstKey);
      }

      return audio;
    } catch (error) {
      this.loading.delete(key);
      throw error;
    }
  }

  // 加载音频（带降级方案）
  private async loadAudio(text: string, voice?: string): Promise<HTMLAudioElement> {
    // 1. 调用 Supabase Edge Function（代理到阿里云 Qwen-TTS）
    try {
      console.log('[Aliyun TTS] Calling Edge Function:', { text, voice });

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Supabase 会自动添加 authorization header
        },
        body: JSON.stringify({
          text,
          model: 'qwen3-tts-flash',
          voice: voice || 'Cherry',
          language_type: 'Chinese',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        console.error('[Aliyun TTS] Edge Function error:', errorData);
        throw new Error(errorData.error || errorData.message || 'TTS API failed');
      }

      const data = await response.json();

      // 获取音频 URL
      const audioUrl = data.audio_url;
      if (!audioUrl) {
        throw new Error('No audio URL in response');
      }

      console.log('[Aliyun TTS] Success:', { audioId: data.audio_id, characters: data.characters });

      // 创建 Audio 对象并等待加载
      const audio = new Audio(audioUrl);
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve);
        audio.addEventListener('error', reject);
        setTimeout(reject, 15000); // 15秒超时
      });

      return audio;
    } catch (error) {
      console.warn('[Aliyun TTS] Failed, falling back to browser TTS:', error);

      // 2. 降级到浏览器语音合成
      return this.createSpeechAudio(text);
    }
  }

  // 使用浏览器语音合成创建音频
  private createSpeechAudio(text: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      // 使用 Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = text.match(/[a-zA-Z]/) ? 'en-US' : 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;

        // 尝试获取更好的声音
        const voices = speechSynthesis.getVoices();
        const preferredVoice =
          // 优先选择 Microsoft 语音（Edge）
          voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith(utterance.lang)) ||
          // 其次选择 Google 语音
          voices.find(v => v.name.includes('Google') && v.lang.startsWith(utterance.lang)) ||
          // 最后选择任何匹配语言的语音
          voices.find(v => v.lang.startsWith(utterance.lang));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        // 直接播放，不返回 Audio 对象
        utterance.onend = () => resolve(new Audio()); // 返回空的 Audio 对象
        utterance.onerror = (e) => reject(e);

        speechSynthesis.speak(utterance);

        // 返回一个虚拟的 Audio 对象
        const dummyAudio = new Audio();
        Object.defineProperty(dummyAudio, 'play', {
          value: () => speechSynthesis.speak(utterance),
        });
        resolve(dummyAudio);
      } else {
        reject(new Error('Speech synthesis not supported'));
      }
    });
  }

  // 清除缓存
  clear() {
    this.cache.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.cache.clear();
    this.loading.clear();
  }
}

// 全局缓存管理器
const audioCache = new AudioCacheManager();

interface UseAliyunTTSOptions {
  voice?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onError?: (error: Error) => void;
}

export const useAliyunTTS = (options: UseAliyunTTSOptions = {}) => {
  const { voice = 'Aixia', onPlayStart, onPlayEnd, onError } = options;
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 播放文本
  const speak = useCallback(async (text: string) => {
    if (!text || text.trim() === '') return;

    try {
      setIsLoading(true);
      onPlayStart?.();

      // 停止当前播放
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }

      // 获取音频
      const audio = await audioCache.get(text, voice);
      currentAudioRef.current = audio;

      // 播放音频
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        onPlayEnd?.();
      };
      audio.onerror = (e) => {
        setIsPlaying(false);
        const error = new Error('Audio playback failed');
        onError?.(error);
      };

      await audio.play();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsPlaying(false);
      onError?.(error as Error);
    }
  }, [voice, onPlayStart, onPlayEnd, onError]);

  // 停止播放
  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      setIsPlaying(false);
      onPlayEnd?.();
    }
  }, [onPlayEnd]);

  // 清理
  const cleanup = useCallback(() => {
    stop();
    currentAudioRef.current = null;
  }, [stop]);

  return {
    speak,
    stop,
    cleanup,
    isLoading,
    isPlaying,
  };
};

// 导出缓存管理器，用于手动清理
export { audioCache };
