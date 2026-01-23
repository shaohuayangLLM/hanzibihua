// Vercel Serverless Function for Baidu Speech Recognition
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audioData, format = 'webm', rate = 16000 } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: 'audioData is required' });
    }

    // Baidu API credentials from environment variables
    const BAIDU_API_KEY = process.env.BAIDU_API_KEY;
    const BAIDU_SECRET_KEY = process.env.BAIDU_SECRET_KEY;

    if (!BAIDU_API_KEY || !BAIDU_SECRET_KEY) {
      return res.status(500).json({ error: 'Baidu API credentials not configured' });
    }

    // Get access token
    const tokenResponse = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`
    );
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Baidu token error:', tokenData);
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    const accessToken = tokenData.access_token;

    // Call Baidu Speech Recognition API
    const apiUrl = `https://vop.baidu.com/server_api?dev_pid=1537`; // 1537 = 普通话

    const speechResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': `audio/${format}; rate=${rate}`,
      },
      body: Buffer.from(audioData, 'base64'),
    });

    const result = await speechResponse.json();

    if (result.err_no !== 0 && result.err_no !== undefined) {
      const errorMessages = {
        3301: '音频质量过差无法识别',
        3302: '鉴权失败',
        3303: '语音服务器后端问题',
        3307: '音频过长',
        3308: '音频格式问题',
        3309: '音频过短',
        3310: '音频下载失败',
        3311: '音频转码失败',
        3312: '音频上传失败',
      };

      const errorMessage = errorMessages[result.err_no] || `识别失败 (错误码: ${result.err_no})`;
      return res.status(400).json({ error: errorMessage, err_no: result.err_no });
    }

    // Return recognition result
    return res.status(200).json({
      transcript: result.result?.[0] || '',
      confidence: result.confidence || 0,
    });

  } catch (error) {
    console.error('Error in baidu-speech function:', error);
    return res.status(500).json({ error: error.message });
  }
}
