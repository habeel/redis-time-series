import { CommandInterface } from "./interface/command";
import { RedisClient } from "redis";

export class DeleteAllCommand implements CommandInterface {
    protected readonly receiver: RedisClient;

    constructor(receiver: RedisClient) {
        this.receiver = receiver;
    }

    public execute(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.receiver.flushdb(resolve);
        });
    }
}
