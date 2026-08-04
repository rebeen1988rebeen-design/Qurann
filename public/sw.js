const CACHE_NAME = 'quran-verses-v1';

// 1. کاتێک بەرنامەکە داوای داتای ئایەتێک دەکات
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ئەگەر داواکارییەکە بۆ API ی ئایەت و سورەتەکان بوو
  if (
    url.pathname.includes('/api/verses') ||
    url.pathname.includes('/surah') ||
    url.hostname.includes('alquran.cloud') ||
    url.hostname.includes('quran.com') ||
    url.hostname.includes('everyayah.com')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        // یەکەم جار لە ئینتەرنێتەوە هێنانی داتا نوێکە
        try {
          const networkResponse = await fetch(event.request);
          // پاشەکەوتکردنی وەڵامەکە لە Cache دا
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // ئەگەر ئینتەرنێت نەبوو، لە مەمۆری پاشەکەوتکراوەوە بینێرەوە
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          throw error;
        }
      })
    );
  }
});
