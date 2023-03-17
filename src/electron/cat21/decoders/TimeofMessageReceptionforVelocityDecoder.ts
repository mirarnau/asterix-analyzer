import { TimeofMessageReceptionforVelocity } from "../valueObjects/TimeofMessageReceptionforVelocity";

export class TimeofMessageReceptionforVelocityDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionforVelocity> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofMessageReceptionforVelocity(time);
    }

}