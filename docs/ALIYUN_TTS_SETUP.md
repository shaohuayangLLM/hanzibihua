# 阿里云 Qwen3-TTS 部署指南

## 概述

本项目已集成阿里云 Qwen3-TTS 语音合成服务，提供更自然的真人读音。

## 功能特性

- ✅ 优先使用阿里云 TTS（龙小春音色，适合儿童）
- ✅ 自动降级到 Edge Speech / Web Speech API
- ✅ 音频缓存机制（最多100个音频）
- ✅ 中英自动识别
- ✅ 可配置音色和语速

## 部署步骤

### 1. 获取阿里云 API Key

1. 访问 [阿里云 Model Studio](https://help.aliyun.com/zh/model-studio/qwen-tts)
2. 开通语音合成服务
3. 获取 API Key

### 2. 配置 Supabase Edge Function

#### 方式一：使用 Supabase CLI（推荐）

```bash
# 登录 Supabase
npx supabase login

# 链接到项目
npx supabase link --project-ref YOUR_PROJECT_REF

# 设置环境变量
npx supabase secrets set ALIYUN_API_KEY=your_api_key_here

# 部署 Edge Function
npx supabase functions deploy aliyun-tts
```

#### 方式二：使用 Supabase Dashboard

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Edge Functions** 页面
4. 点击 **New Function** 创建 `aliyun-tts`
5. 将 `supabase/functions/aliyun-tts/index.ts` 的内容复制到编辑器
6. 进入 **Settings** → **Environment Variables**
7. 添加 `ALIYUN_API_KEY`，值为你的阿里云 API Key

### 3. 验证部署

部署完成后，访问你的应用，点击任意语音按钮，应该能听到更自然的语音。

## 音色选择

阿里云提供多种音色，可在 `usePinyinSpeech.ts` 中修改：

| 音色名称 | 特点 |
|---------|------|
| `longxiaochun` | 女声，温柔，适合儿童学习（默认） |
| `zhiqiang` | 男声，稳重 |
| `zhiwei` | 男声，活泼 |
| `xiaobao` | 童声 |
| `xiaoqi` | 女声，亲切 |

## 降级方案

当阿里云 TTS 不可用时，系统会自动降级：

1. **Edge Speech** - Microsoft 语音（Edge 浏览器）
2. **Web Speech API** - 浏览器默认语音

## 费用说明

阿里云 TTS 按调用量收费：
- 新用户有免费额度
- 具体价格请查看 [阿里云定价页面](https://www.alibabacloud.com/zh/product/model-studio/pricing)

## 故障排查

### 问题：没有声音

1. 检查浏览器控制台是否有错误
2. 确认 ALIYUN_API_KEY 是否正确设置
3. 检查网络连接

### 问题：声音还是机械

1. 确认 Edge Function 是否正确部署
2. 检查 Supabase 日志是否有错误
3. 临时禁用阿里云 TTS：在组件中设置 `useAliyunTTS: false`

```typescript
const { speak } = usePinyinSpeech({ useAliyunTTS: false });
```

## 相关文档

- [阿里云语音合成 API 文档](https://help.aliyun.com/zh/model-studio/qwen-tts-api)
- [Supabase Edge Functions 文档](https://supabase.com/docs/guides/functions)
