const BASE_URL = 'http://localhost:5000';

async function createShortUrl(url, shortcode, validity) {
  const res = await fetch(`${BASE_URL}/shorturls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, shortcode, validity })
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

async function getStats(shortcode) {
  const res = await fetch(`${BASE_URL}/shorturls/${shortcode}`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

async function getAllShortUrls() {
  const res = await fetch(`${BASE_URL}/shorturls`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export default { createShortUrl, getStats, getAllShortUrls }; 