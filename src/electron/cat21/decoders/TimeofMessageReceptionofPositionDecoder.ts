import { TimeofMessageReceptionofPosition } from "../valueObjects/TimeofMessageReceptionofPosition";

export class TimeofMessageReceptionofPositionDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionofPosition> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofMessageReceptionofPosition(time);
    }
    
}
