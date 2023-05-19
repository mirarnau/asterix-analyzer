import { TimeofApplicabilityforVelocity } from "../valueObjects/TimeofApplicabilityforVelocity";

export class TimeofApplicabilityforVelocityDecoder {

    public async decode(item : Buffer) : Promise<TimeofApplicabilityforVelocity> {
        const timestamp = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        var time = new Date(timestamp * 1000).toISOString().substring(11, 23);

        return new TimeofApplicabilityforVelocity(time);
    }

}