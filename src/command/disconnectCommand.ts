import { RedisClient } from "redis";
import { CommandInterface } from "./interface/command";

export class DisconnectCommand implements CommandInterface {
    protected readonly receiver: RedisClient;

    constructor(receiver: RedisClient) {
        this.receiver = receiver;
    }

    public execute(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.receiver.end(true);
            resolve("OK");
        });
    }
}
