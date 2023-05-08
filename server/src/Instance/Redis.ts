import * as redis from 'redis'
import { storedOTP } from '../types/storedOTP';

export class RedisCli {
    static redisClient : redis.RedisClientType

    constructor (){
        if(!RedisCli.redisClient){
            RedisCli.redisClient = redis.createClient();
            (async () => await RedisCli.redisClient.connect())()
            RedisCli.redisClient.on('connect',()=>{
                console.log(`redis client started`);
            })

        }
    }

    static async setKey (OTPInfo : storedOTP){
        await RedisCli.redisClient.set(OTPInfo.key, OTPInfo.value)
        await RedisCli.redisClient.expire(OTPInfo.key,300)
    }

    static async getKey (key: string) {        
        return await RedisCli.redisClient.get(key) as string
    }

    static async delKey (key : string) {
        await RedisCli.redisClient.del([`${key}`])
    }
}