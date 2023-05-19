import { TimeofMessageReceptionofVelocity } from "../valueObjects/TimeofMessageReceptionofVelocity";

export class TimeofMessageReceptionofVelocityDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionofVelocity> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofMessageReceptionofVelocity(time);
    }

}