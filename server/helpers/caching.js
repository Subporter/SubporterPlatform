const config = require('../../config/subporter.config');

const caching = (() => {
    let redis = config.redis_dev;

    if (process.env.NODE_ENV === 'production') {
        redis = config.redis_prod;
    }

    const cache = require('express-redis-cache')({
        host: redis.host,
        port: redis.port,
        expire: 60
    });

    return {
        cache: cache
    };
})();

module.exports = caching.cache;