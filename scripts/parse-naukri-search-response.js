const fs = require('fs');
const har = JSON.parse(fs.readFileSync('/Users/ifocus/Documents/Systemmindz/www.naukri.com.json', 'utf8'));
const entries = har.log?.entries || [];
for (const e of entries) {
  const u = e.request?.url || '';
  if (!u.includes('/jobapi/v3/search')) continue;
  const text = e.response?.content?.text;
  if (!text) continue;
  const data = JSON.parse(text);
  console.log('URL', u.slice(0, 200));
  console.log('KEYS', Object.keys(data));
  console.log('noOfJobs', data.noOfJobs);
  console.log('cluster keys', Object.keys(data.clusters || {}));
  const job = data.jobDetails?.[0] || data.jobs?.[0] || data.searchResult?.jobDetails?.[0];
  console.log('first job keys', job ? Object.keys(job) : 'none');
  console.log('first job sample', JSON.stringify(job, null, 2).slice(0, 2500));
  console.log('clusters sample', JSON.stringify(data.clusters, null, 2).slice(0, 2000));
  break;
}
