import { CommandData } from "./interface/commandData";
import { CommandName } from "../enum/commandName";
import { StringNumberArray } from "../index";
import { RedisClient } from "redis";

export class CommandProvider {
    protected readonly client: RedisClient;
    protected commands: object;

    constructor(redisClient: RedisClient) {
        this.client = redisClient;
        this.commands = {};
        this.buildCommands();
    }

    public getCommand(commandName: string): () => any {
        return this.commands[commandName];
    }

    public getCommandData(commandName: string, params: StringNumberArray): CommandData {
        return {
            commandName: commandName,
            commandFunction: this.getCommand(commandName),
            commandParams: params
        };
    }

    public getRTSClient(): RedisClient {
        return this.client;
    }

    protected buildCommands(): void {
        for (const key in CommandName) {
            const command: string = CommandName[key];
            const redisCommand = createBuiltinCommand(this.client, command);
            // @ts-ignore
            this.commands[command] = redisCommand.string;
        }
    }
}

function createBuiltinCommand(redis: RedisClient, command: string) {
    return {
        string: function (...args) {
            return new Promise<any>((resolve, reject) => {
                redis.sendCommand(command, args, (err, reply) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(reply);
                });
            });
        }
    }
}
