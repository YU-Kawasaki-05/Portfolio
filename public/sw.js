// Service Worker for Performance Optimization
const CACHE_NAME = 'neo-typographic-fusion-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// キャッシュするリソース
const STATIC_ASSETS = [
  '/',
  '/profile',
  '/portfolio',
  '/blog',
  '/services',
  '/sns',
  '/manifest.json',
  '/fonts/SpaceGrotesk-Bold.woff',
  '/fonts/Inter-Medium.woff',
];

// インストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// アクティベーション時
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// フェッチ時のキャッシュ戦略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 静的アセット: Cache First戦略
  if (STATIC_ASSETS.includes(url.pathname) || 
      request.destination === 'image' ||
      request.destination === 'font' ||
      request.destination === 'style') {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then((fetchResponse) => {
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
        })
        .catch(() => {
          // オフライン時のフォールバック
          if (request.destination === 'document') {
            return caches.match('/');
          }
        })
    );
  }

  // API/動的コンテンツ: Network First戦略
  else if (url.pathname.startsWith('/api/') || 
           request.method === 'POST') {
    
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }

  // その他: Stale While Revalidate戦略
  else {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          const fetchPromise = fetch(request)
            .then((fetchResponse) => {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });

          return response || fetchPromise;
        })
    );
  }
});

// バックグラウンド同期
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // バックグラウンドでのデータ同期処理
      console.log('Background sync triggered')
    );
  }
});

// プッシュ通知
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: data.url,
        actions: [
          {
            action: 'open',
            title: 'Open',
            icon: '/icon-192x192.png'
          },
          {
            action: 'close',
            title: 'Close',
            icon: '/icon-192x192.png'
          }
        ]
      })
    );
  }
});

// 通知クリック
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

// パフォーマンス最適化
const performanceOptimizations = {
  // リソースヒント
  preloadCriticalResources: () => {
    const criticalResources = [
      '/fonts/SpaceGrotesk-Bold.woff',
      '/fonts/Inter-Medium.woff',
    ];
    
    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.woff') ? 'font' : 'script';
      if (resource.includes('.woff')) {
        link.type = 'font/woff';
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  },

  // メモリ管理
  clearOldCaches: async () => {
    const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];
    const cacheNames = await caches.keys();
    
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    );
  },
};

// 定期的なクリーンアップ
setInterval(() => {
  performanceOptimizations.clearOldCaches();
}, 1000 * 60 * 60); // 1時間ごと 