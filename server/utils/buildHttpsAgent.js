const https = require('https');

module.exports = function buildHttpsAgent(url) {
    if (!url || !String(url).startsWith('https')) return undefined;
    return new https.Agent({ rejectUnauthorized: true });
};
