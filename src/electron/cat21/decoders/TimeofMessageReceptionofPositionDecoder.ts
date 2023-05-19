import { TimeofMessageReceptionofPosition } from "../valueObjects/TimeofMessageReceptionofPosition";

export class TimeofMessageReceptionofPositionDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionofPosition> {
        const timestamp = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        var time = new Date(timestamp * 1000).toISOString().substring(11, 23);

        return new TimeofMessageReceptionofPosition(time);
    }
    
}
