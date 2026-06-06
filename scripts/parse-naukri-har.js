const fs = require('fs');
const har = JSON.parse(fs.readFileSync('/Users/ifocus/Documents/Systemmindz/www.naukri.com.json', 'utf8'));
const entries = har.log?.entries || [];
const urls = new Map();
for (const e of entries) {
  const u = e.request?.url || '';
  if (!u.includes('naukri.com')) continue;
  if (/google|doubleclick|static\.naukimg|lg\.naukri\.com\/uba|googletagmanager|facebook|analytics/.test(u)) continue;
  const base = u.split('?')[0];
  const key = `${e.request.method} ${base}`;
  if (!urls.has(key)) {
    urls.set(key, {
      method: e.request.method,
      url: base,
      sample: u,
      post: e.request.postData?.text || null,
      headers: (e.request.headers || []).filter((h) =>
        /cookie|authorization|appid|systemid|clientid|content-type|accept|referer|x-/i.test(h.name)
      ),
      response: e.response?.content?.text?.slice(0, 300) || null,
      status: e.response?.status,
    });
  }
}
const list = [...urls.values()].sort((a, b) => a.url.localeCompare(b.url));
for (const x of list) {
  console.log('\n===', x.method, x.status, x.url);
  console.log('HDR', x.headers.map((h) => `${h.name}: ${String(h.value).slice(0, 80)}`).join(' | '));
  if (x.post) console.log('POST', x.post.slice(0, 800));
  if (x.response) console.log('RES', x.response.slice(0, 200));
}
console.log('\nTOTAL', list.length);
