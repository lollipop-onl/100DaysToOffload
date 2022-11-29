const DEFAULT_SUB_PATH = '/2023/';

const PROJECTS = [
  { key: '2023', baseUrl: 'https://100daystooffload2023.pages.dev' },
];

addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') {
    return e.respondWith(new Response(null, { status: 405 }));
  }

  const { pathname, origin } = new URL(e.request.url);

  // トップの場合は最新のプロジェクトへリダイレクト
  if (pathname === '/') {
    const url = new URL(DEFAULT_SUB_PATH, origin);

    return e.respondWith(Response.redirect(url.href, 302));
  }

  // 末尾スラッシュへリダイレクト
  if (!pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)) {
    const url = new URL(`${pathname}/`, origin);

    return e.respondWith(Response.redirect(url.href, 301));
  }

  const project = PROJECTS.find(({ key }) => pathname.startsWith(`/${key}/`));

  if (project) {
    const { key, baseUrl } = project;
    const url = new URL(pathname.replace(`/${key}`, ''), baseUrl);

    return e.respondWith(fetch(url.href));
  }

  return e.respondWith(new Response('Page Not Found', { status: 404 }));
});
