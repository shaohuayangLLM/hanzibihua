import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 注册 Service Worker 并处理更新
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/k12/sw.js', { scope: '/k12/' })
      .then((registration) => {
        // 检查更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // 新的 Service Worker 已就绪，刷新页面
                console.log('New service worker available, refreshing...');
                window.location.reload();
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
