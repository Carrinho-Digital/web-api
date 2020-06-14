const { promisify } = require('util');

let redis = null;

const setRedis = instance => {
  redis = instance;
};

const buildRedis = () => {
  if (!redis) return {};

  return {
    get: promisify(redis.get).bind(redis),
    set: promisify(redis.set).bind(redis),
    del: promisify(redis.del).bind(redis),
  };
};

module.exports.setRedis = setRedis;
module.exports.redisClient = buildRedis;
