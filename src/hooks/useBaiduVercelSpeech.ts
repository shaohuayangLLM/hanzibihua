import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useBaiduVercelSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const resultCallbackRef = useRef<((transcript: string, confidence: number) => void) | null>(null);

  // Check browser support
  useEffect(() => {
    const hasMediaRecorder = typeof MediaRecorder !== 'undefined';
    const hasGetUserMedia = navigator.mediaDevices?.getUserMedia;

    setIsSupported(hasMediaRecorder && !!hasGetUserMedia);

    if (!hasMediaRecorder) {
      console.warn('MediaRecorder not supported');
    }
    if (!hasGetUserMedia) {
      console.warn('getUserMedia not supported');
    }
  }, []);

  const startListening = useCallback(async (callback?: (transcript: string, confidence: number) => void) => {
    if (!isSupported) {
      toast.error('您的浏览器不支持录音功能');
      return false;
    }

    resultCallbackRef.current = callback || null;
    audioChunksRef.current = [];

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      streamRef.current = stream;

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log('Recording stopped, processing audio...');

        try {
          // Create audio blob
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

          // Convert to base64
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64Audio = (reader.result as string).split(',')[1];

              // Call Vercel API
              const response = await fetch('/api/baidu-speech', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  audioData: base64Audio,
                  format: 'webm',
                  rate: 16000,
                }),
              });

              const data = await response.json();

              if (data.error) {
                console.error('Baidu speech error:', data.error);
                toast.error(data.error);
                setIsListening(false);
                return;
              }

              console.log('Baidu recognition result:', data);

              setTranscript(data.transcript);
              setConfidence(data.confidence);
              setIsListening(false);

              // Call callback if provided
              if (resultCallbackRef.current) {
                resultCallbackRef.current(data.transcript, data.confidence);
              }

            } catch (error) {
              console.error('Error processing audio:', error);
              toast.error('语音识别失败，请重试');
              setIsListening(false);
            }
          };

          reader.readAsDataURL(audioBlob);
        } catch (error) {
          console.error('Error in onstop handler:', error);
          setIsListening(false);
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsListening(true);
      console.log('Recording started');

      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 5000);

      return true;

    } catch (error: any) {
      console.error('Error starting recording:', error);

      if (error.name === 'NotAllowedError') {
        toast.error('麦克风权限被拒绝，请在浏览器设置中允许访问麦克风');
      } else if (error.name === 'NotFoundError') {
        toast.error('未找到麦克风设备');
      } else {
        toast.error('无法启动录音: ' + error.message);
      }

      setIsListening(false);
      return false;
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('Manually stopping recording');
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

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
