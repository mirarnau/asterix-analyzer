import { TimeofMessageReceptionforPosition } from "../valueObjects/TimeofMessageReceptionforPosition";

export class TimeofMessageReceptionforPositionDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionforPosition> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofMessageReceptionforPosition(time);
    }
    
}
