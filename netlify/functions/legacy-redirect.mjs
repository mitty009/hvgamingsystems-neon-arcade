const pageAnchors = {
  53: 'contact',
  65: 'about',
  80: 'gallery',
  94: 'services',
};

function cleanBaseUrl(event) {
  const host = event.headers.host || 'hvgamingsystems.com.au';
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  return `${protocol}://${host}`;
}

export async function handler(event) {
  const pageId = event.queryStringParameters?.page_id;
  const anchor = pageAnchors[pageId];
  const location = anchor ? `${cleanBaseUrl(event)}/#${anchor}` : `${cleanBaseUrl(event)}/`;

  return {
    statusCode: 301,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=3600',
    },
    body: '',
  };
}
