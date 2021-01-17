import { CommandInterface } from "./interface/command";
import { RedisClient } from "redis";

export class DeleteCommand implements CommandInterface {
    protected readonly receiver: RedisClient;
    protected readonly keys: string[];

    constructor(receiver: RedisClient, keys: string[]) {
        this.keys = keys;
        this.receiver = receiver;
    }

    public execute(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.receiver.del(this.keys, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        })
    }
}
