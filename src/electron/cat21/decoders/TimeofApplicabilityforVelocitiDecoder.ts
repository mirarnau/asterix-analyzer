import { TimeofApplicabilityforVelocity } from "../valueObjects/TimeofApplicabilityforVelocity";

export class TimeofApplicabilityforVelocityDecoder {

    public async decode(item : Buffer) : Promise<TimeofApplicabilityforVelocity> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofApplicabilityforVelocity(time);
    }

}