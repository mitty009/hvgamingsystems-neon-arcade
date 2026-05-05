const pageTargets = {
  53: { path: '/contact', anchor: 'contact' },
  65: { path: '/about', anchor: 'about' },
  80: { path: '/gallery', anchor: 'gallery' },
  94: { path: '/services', anchor: 'services' },
};

function cleanBaseUrl(event) {
  const host = event.headers.host || 'hvgamingsystems.com.au';
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  return `${protocol}://${host}`;
}

export async function handler(event) {
  const pageId = event.queryStringParameters?.page_id;
  const target = pageTargets[pageId];
  const location = target
    ? `${cleanBaseUrl(event)}${target.path}#${target.anchor}`
    : `${cleanBaseUrl(event)}/`;

  return {
    statusCode: 301,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=3600',
    },
    body: '',
  };
}
