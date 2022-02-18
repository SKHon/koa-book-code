const Redis = require('ioredis');
class RedisStore {
    constructor(redisConfig) {
        this.redis = new Redis(redisConfig);
    }
    // 获取
    async get(key) {
        const data = await this.redis.get(`SESSION:${key}`);
        return JSON.parse(data);
    }
    // 设置
    async set(key, sess, maxAge) {
        await this.redis.set(
            `SESSION:${key}`,
            JSON.stringify(sess),
            'EX',
            maxAge / 1000
        );
    }
    // 销毁
    async destroy(key) {
        return await this.redis.del(`SESSION:${key}`);
    }
}

module.exports = RedisStore;