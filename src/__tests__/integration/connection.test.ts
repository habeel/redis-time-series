import { RedisTimeSeriesFactory } from "../../factory/redisTimeSeries";
import { ConnectionOptions } from "../../index";

test("lazy connection", async () => {
    const redisOptions: ConnectionOptions = {
        host: "127.0.0.1",
        db: 0
    };
    const factory = new RedisTimeSeriesFactory(redisOptions);
    const rtsClient = factory.create();
    const created = await rtsClient.create("connection");
    expect(created).toEqual(true);

    const deleted = await rtsClient.delete("connection");
    expect(deleted).toEqual(true);

    const disconnected = await rtsClient.disconnect();
    expect(disconnected).toEqual(true);
});
