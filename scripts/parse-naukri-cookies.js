const fs = require('fs');
const har = JSON.parse(fs.readFileSync('/Users/ifocus/Documents/Systemmindz/www.naukri.com.json', 'utf8'));
const entries = har.log?.entries || [];
for (const e of entries) {
  const u = e.request?.url || '';
  if (!u.includes('naukri.com')) continue;
  const cookies = e.request?.cookies || [];
  if (cookies.length) {
    console.log('URL', u.split('?')[0]);
    console.log('COOKIES', cookies.map((c) => c.name).join(', '));
  }
  const hdr = (e.request?.headers || []).find((h) => h.name.toLowerCase() === 'cookie');
  if (hdr) {
    console.log('URL', u.split('?')[0]);
    console.log('COOKIE HDR', hdr.value.slice(0, 300));
  }
}
