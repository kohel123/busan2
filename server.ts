import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 웨딩박람회 실시간 API 프록시 엔드포인트
  app.get('/api/wedding-ads', async (req, res) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('https://cpaad.co.kr/api/ad_json.php', {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Upstream API returned status ${response.status}`);
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=180');
      return res.json(data);
    } catch (err: any) {
      // 프록시 호출 실패 시 에러 응답 반환 (클라이언트에서 안전하게 폴백 사용)
      return res.status(502).json({
        error: 'Failed to fetch upstream wedding ads',
        message: err.message || 'Network timeout or connect error'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`부산 웨딩박람회 서버 실행 중: http://localhost:${PORT}`);
  });
}

startServer();
