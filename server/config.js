require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

module.exports = {
    authServiceUrl: process.env.AUTH_SERVICE_URL || '',
    service: {
        internalToken: process.env.INTERNAL_SERVICE_TOKEN || ''
    }
};
