import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

interface XunfeiSpeechOptions {
  appId?: string;
  apiKey?: string;
  apiSecret?: string;
}

interface RecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// 使用讯飞语音识别 WebAPI (通过 WebSocket)
// 需要后端代理或直接使用讯飞 WebSDK
export const useXunfeiSpeech = (options: XunfeiSpeechOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  // 检查是否配置了讯飞 API
  useEffect(() => {
    const hasConfig = options.appId && options.apiKey && options.apiSecret;
    setIsSupported(hasConfig || typeof window !== 'undefined');
  }, [options]);

  const startListening = useCallback(() => {
    // 如果没有配置讯飞 API，回退到提示用户
    if (!options.appId || !options.apiKey || !options.apiSecret) {
      toast.info('语音识别功能正在配置中，目前使用浏览器自带识别');
      return false;
    }

    setTranscript('');
    setConfidence(0);
    setIsListening(true);

    // TODO: 实现讯飞 WebSocket 语音识别
    // 1. 建立 WebSocket 连接
    // 2. 发送音频数据
    // 3. 接收识别结果

    return true;
  }, [options]);

  const stopListening = useCallback(() => {
    setIsListening(false);
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
