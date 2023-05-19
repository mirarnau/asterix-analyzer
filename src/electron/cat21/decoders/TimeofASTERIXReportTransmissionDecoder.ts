import { TimeofASTERIXReportTransmission } from "../valueObjects/TimeofASTERIXReportTransmission";

export class TimeofASTERIXReportTransmissionDecoder {

    public async decode(item : Buffer) : Promise<TimeofASTERIXReportTransmission> {
        const timestamp = Math.round((parseInt("0x" + item.toString("hex")) / 128.0) * 10) / 10;
        var time = new Date(timestamp * 1000).toISOString().substring(11, 23);

        return new TimeofASTERIXReportTransmission(time);
    }


}