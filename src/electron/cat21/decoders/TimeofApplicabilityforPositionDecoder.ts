import { TimeofApplicabilityforPosition } from "../valueObjects/TimeofApplicabilityforPosition";

export class TimeofApplicabilityforPositionDecoder {

    public async decode(item : Buffer) : Promise<TimeofApplicabilityforPosition> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofApplicabilityforPosition(time);
    }
}