import { TimeofASTERIXReportTransmission } from "../valueObjects/TimeofASTERIXReportTransmission";

export class TimeofASTERIXReportTransmissionDecoder {

    public async decode(item : Buffer) : Promise<TimeofASTERIXReportTransmission> {
        const time = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        return new TimeofASTERIXReportTransmission(time);
    }


}