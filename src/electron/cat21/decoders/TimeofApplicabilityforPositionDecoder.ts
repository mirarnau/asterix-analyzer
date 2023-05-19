import { TimeofApplicabilityforPosition } from "../valueObjects/TimeofApplicabilityforPosition";

export class TimeofApplicabilityforPositionDecoder {

    public async decode(item : Buffer) : Promise<TimeofApplicabilityforPosition> {
        const timestamp = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        var time = new Date(timestamp * 1000).toISOString().substring(11, 23);

        return new TimeofApplicabilityforPosition(time);
    }
}