const fs = require('fs');
const har = JSON.parse(fs.readFileSync('/Users/ifocus/Documents/Systemmindz/www.naukri.com.json', 'utf8'));
for (const e of har.log?.entries || []) {
  const u = e.request?.url || '';
  if (!u.includes('/resman-aggregator-services/v2/users/self')) continue;
  const text = e.response?.content?.text;
  console.log('status', e.response?.status);
  console.log('req hdr nkparam', (e.request.headers||[]).find(h=>h.name==='nkparam')?.value?.slice(0,80));
  console.log(JSON.stringify(JSON.parse(text), null, 2).slice(0, 1500));
}
