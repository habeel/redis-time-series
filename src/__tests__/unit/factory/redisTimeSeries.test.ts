import { RedisTimeSeriesFactory } from "../../../factory/redisTimeSeries";
import { CommandProvider } from "../../../command/commandProvider";
import { CommandReceiver } from "../../../command/commandReceiver";
import { RequestParamsDirector } from "../../../builder/requestParamsDirector";
import { RedisTimeSeries } from "../../../redisTimeSeries";
import { RequestParamsBuilder } from "../../../builder/requestParamsBuilder";
import { ConnectionOptions } from "../../../index";
import { RedisClient } from "redis";

jest.mock("../../../command/commandProvider");
jest.mock("../../../command/commandReceiver");
jest.mock("../../../builder/requestParamsDirector");

const options: ConnectionOptions = {
    port: 6379,
    host: "127.0.0.1",
    db: 0
};

it("Factory creates a RedisTimeSeries object", () => {
    const factory = new RedisTimeSeriesFactory(options);
    const redisTimeSeries = factory.create();

    expect(CommandProvider).toHaveBeenCalledTimes(1);
    expect(CommandReceiver).toHaveBeenCalledTimes(1);
    expect(RequestParamsDirector).toHaveBeenCalledTimes(1);
    expect(RequestParamsDirector).toHaveBeenCalledWith(new RequestParamsBuilder());
    expect(redisTimeSeries).toBeInstanceOf(RedisTimeSeries);
});
