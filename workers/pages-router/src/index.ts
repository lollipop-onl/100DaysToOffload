const SUB_DIR: Record<string, string> = {
  '2023': 'https://100daystooffload2023.pages.dev'
}

addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') {
    return e.respondWith(new Response(null, { status: 405 }))
  }
  
  const { pathname, origin } = new URL(e.request.url);

  for (const subDir in SUB_DIR) {
    // プロパティが定義されていなければスキップ
    if (!SUB_DIR.hasOwnProperty(subDir)) continue;

    // プロパティのサブディレクトリでなければスキップ
    if (!pathname.startsWith(`/${subDir}/`) && pathname !== `/${subDir}`) continue;

    // 末尾スラッシュへリダイレクト
    if (!pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)) {
      const url = new URL(`${pathname}/`, origin);
      
      return e.respondWith(Response.redirect(url.href, 301));
    }

    const baseUrl = SUB_DIR[subDir];
    const url = new URL(pathname.replace(`/${subDir}`, ''), baseUrl);

    return e.respondWith(fetch(url.href));
  }

  return e.respondWith(new Response('Page Not Found', { status: 404 }));
});
