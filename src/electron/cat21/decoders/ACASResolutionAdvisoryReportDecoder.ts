import { ACASResolutionAdvisoryReport } from "../valueObjects/ACASResolutionAdvisoryReport";

export class ACASResolutionAdvisoryReportDecoder {

    public async decode(item : Buffer) : Promise<ACASResolutionAdvisoryReport> {
        var bits = BigInt("0x" + item.subarray(0, 1).toString("hex"))
            .toString(2)
            .padStart(7 * 8, "0")
            .split("");

        const typ = bits.slice(0, 5).join("");
        const styp = bits.slice(5, 8).join("");
        const ara = bits.slice(8, 16).join("");
        const rac = bits.slice(16, 26).join("");
        const rat = bits[26];
        const mte = bits[27];
        const tti = bits.slice(28, 30).join("");
        const tid = bits.slice(30).join("");

        return new ACASResolutionAdvisoryReport(typ, styp, ara, rac, rat, mte, tti, tid);
    };

}