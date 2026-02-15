import { useState } from 'react';
import { useAliyunTTS } from '../hooks/useAliyunTTS';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const voices = [
  { name: 'Cherry', label: 'Cherry - 活泼女声' },
  { name: 'Aitong', label: 'Aitong - 温柔女声' },
  { name: 'Zhichu', label: 'Zhichu - 亲切女声' },
  { name: 'Aijia', label: 'Aijia - 知性女声' },
  { name: 'Aida', label: 'Aida - 温暖女声' },
  { name: 'Aixia', label: 'Aixia - 甜美女声' },
  { name: 'Aimei', label: 'Aimei - 深情女声' },
];

const testTexts = [
  '你好，我是樱桃。',
  '今天天气真不错。',
  '我喜欢学习汉字。',
  '这个字的拼音是什么？',
  '我们一起来学习吧！',
];

export const VoiceTest = () => {
  const [selectedVoice, setSelectedVoice] = useState('Cherry');
  const [customText, setCustomText] = useState('你好，欢迎来到汉字学习平台！');
  const { speak, isLoading, isPlaying } = useAliyunTTS({
    voice: selectedVoice,
  });

  const handleSpeak = (text: string) => {
    speak(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 font-kaiti">🎵 阿里云 TTS 音色测试</h1>

      {/* 自定义文本输入 */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">自定义测试文本</h2>
        <div className="flex gap-2">
          <Input
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="输入要测试的文本..."
            className="flex-1"
          />
          <Button
            onClick={() => handleSpeak(customText)}
            disabled={isLoading}
            className="min-w-24"
          >
            {isPlaying ? '播放中...' : isLoading ? '加载中...' : '播放 🔊'}
          </Button>
        </div>
      </Card>

      {/* 预设测试文本 */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">预设测试文本</h2>
        <div className="space-y-2">
          {testTexts.map((text, index) => (
            <div key={index} className="flex gap-2 items-center">
              <span className="flex-1">{text}</span>
              <Button
                size="sm"
                onClick={() => handleSpeak(text)}
                disabled={isLoading}
              >
                播放 🔊
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* 音色选择 */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">选择音色（当前：{selectedVoice}）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {voices.map((voice) => (
            <Button
              key={voice.name}
              variant={selectedVoice === voice.name ? 'default' : 'outline'}
              onClick={() => setSelectedVoice(voice.name)}
              className="justify-start"
            >
              {voice.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* 使用说明 */}
      <Card className="p-6 mt-6 bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">📖 使用说明</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>选择一个音色</li>
          <li>点击预设文本旁的"播放"按钮，或输入自定义文本后点击播放</li>
          <li>试听不同音色，找到最适合的</li>
          <li>选择好音色后，告诉我，我会帮您设置为默认音色</li>
        </ol>
      </Card>
    </div>
  );
};
