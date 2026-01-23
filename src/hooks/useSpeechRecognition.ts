import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

interface SpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  onFinalResult?: (transcript: string, confidence: number) => void;
}

interface RecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// Declare SpeechRecognition types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useSpeechRecognition = (options: SpeechRecognitionOptions = {}) => {
  const {
    lang = 'zh-CN',
    continuous = false,
    interimResults = true,  // 启用中间结果，提高识别灵敏度
    maxAlternatives = 3,    // 获取更多候选结果
    onFinalResult,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  // Initialize recognition (only once)
  useEffect(() => {
    if (isInitializedRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = maxAlternatives;

    recognition.onresult = (event: any) => {
      console.log('Recognition result:', event);
      const lastResult = event.results[event.results.length - 1];
      const isFinal = lastResult.isFinal;

      // 获取所有候选结果，选择置信度最高的
      let bestTranscript = lastResult[0].transcript;
      let bestConfidence = lastResult[0].confidence;

      // 检查是否有更多候选结果
      const alternatives = lastResult.length;
      if (alternatives > 1) {
        for (let i = 1; i < alternatives; i++) {
          if (lastResult[i].confidence > bestConfidence) {
            bestTranscript = lastResult[i].transcript;
            bestConfidence = lastResult[i].confidence;
          }
        }
        console.log(`Found ${alternatives} alternatives, best: "${bestTranscript}" (${bestConfidence.toFixed(2)})`);
      }

      console.log('Transcript:', bestTranscript, 'Confidence:', bestConfidence, 'IsFinal:', isFinal);

      // 处理最终结果
      if (isFinal) {
        setTranscript(bestTranscript);
        setConfidence(bestConfidence);
        setIsListening(false);

        // 调用外部回调
        if (onFinalResult) {
          onFinalResult(bestTranscript, bestConfidence);
        }
      } else {
        // 中间结果也显示，但不触发回调
        setTranscript(bestTranscript);
        setConfidence(bestConfidence);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error, 'Message:', event.message);
      setIsListening(false);

      const errorMessages: Record<string, string> = {
        'no-speech': '未检测到语音，请点击后等待 1 秒再大声朗读',
        'audio-capture': '无法访问麦克风，请检查权限',
        'not-allowed': '麦克风权限被拒绝',
        'network': '网络错误，请检查连接',
        'aborted': '识别已中止',
        'language-not-supported': '不支持该语言',
        'service-not-allowed': '语音识别服务不可用',
      };

      const message = errorMessages[event.error] || `语音识别出错: ${event.error}`;
      toast.error(message, {
        duration: 3000,
      });
    };

    recognition.onend = () => {
      console.log('Recognition ended');
      setIsListening(false);
    };

    recognition.onstart = () => {
      console.log('Recognition started');
    };

    recognitionRef.current = recognition;
    isInitializedRef.current = true;

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []); // Empty dependency array - run only once

  const startListening = useCallback(() => {
    console.log('startListening called, isSupported:', isSupported, 'recognitionRef:', recognitionRef.current);
    if (!isSupported) {
      toast.error('您的浏览器不支持语音识别功能，请使用 Chrome 或 Edge 浏览器');
      return;
    }

    if (!recognitionRef.current) {
      toast.error('语音识别未初始化，请刷新页面重试');
      return;
    }

    setTranscript('');
    setConfidence(0);
    setIsListening(true);

    try {
      recognitionRef.current.start();
      console.log('Recognition started successfully');
    } catch (error) {
      console.error('Failed to start recognition:', error);
      setIsListening(false);
      toast.error('启动语音识别失败，请重试');
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    resetTranscript,
  };
};
