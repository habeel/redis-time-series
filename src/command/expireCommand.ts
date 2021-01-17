import { CommandInterface } from "./interface/command";
import { RedisClient } from "redis";

export class ExpireCommand implements CommandInterface {
    protected readonly receiver: RedisClient;
    protected readonly key: string;
    protected readonly seconds: number;

    constructor(receiver: RedisClient, key: string, seconds: number) {
        this.key = key;
        this.seconds = seconds;
        this.receiver = receiver;

        if (!Number.isInteger(this.seconds))
            throw new Error(`Only integers allowed for 'seconds' parameter. ${seconds} is not an integer.`);
    }

    public execute(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.receiver.expire(this.key, this.seconds, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });
    }
}
