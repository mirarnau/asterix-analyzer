import { TargetReportDescriptor } from "../valueObjects/TargetReportDescriptor";

export class TargetReportDescriptorDecoder {
    public async decode(item : Buffer) : Promise<TargetReportDescriptor> {
        const numOctets = item.length;
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(numOctets * 8, "0")
        .split("");

        var atp = this.decodeAtp(bits);
        var arc = this.decodeArc(bits);
        var rc = bits[5] === "0" ? "Default" : "Range Check passed, CPR Validation pending";
        var rab = bits[6] === "0" ? "Report from target transponder" : "Report from field monitor (fixed transponder)";

        if (numOctets === 1) {
            return new TargetReportDescriptor(atp, arc, rc, rab)
        }

        var dcr = bits[8] === "0" ? "No differential correction (ADS-B)" : "Differential correction (ADS-B)";
        var gbs = bits[9] === "0" ? "Ground Bit not set" : "Ground Bit set";
        var sim = bits[10] === "0" ? "Actual target report" : "Actual target report";
        var tst = bits[11] === "0" ? "Default" : "Test Target";
        var saa = bits[12] === "0" ? "Equipment capable to provide Selected Altitude" : "Equipment not capable to provide Selected Altitude";
        var cl = this.decodeCl(bits);

        if (numOctets === 2) {
            return new TargetReportDescriptor(atp, arc, rc, rab, dcr, gbs, sim, tst, saa, cl)
        }

        var ipc = bits[18] === "0" ? "Default" : "Independent Position Check failed";
        var nogo = bits[19] === "0" ? "NOGO-bit not set" : "NOGO-bit set";
        var cpr = bits[20] === "0" ? "CPR Validation correct" : "CPR Validation failed";
        var ldpj = bits[21] === "0" ? "LDPJ not detected" : "LDPJ detected";
        var rcf = bits[22] === "0" ? "Default" : "Range Check failed";

        return new TargetReportDescriptor(atp, arc, rc, rab, dcr, gbs, sim, tst, saa, cl, ipc, nogo, cpr, ldpj, rcf);
    }

    private decodeAtp(bits : string[]) : string{
        switch (bits.slice(0, 3).join("")) {
            case "000":
                return "24-Bit ICAO address";
            case "001":
                return "Duplicate address";
            case "010":
                return "Surface vehicle address";
            case "011":
                return "Anonymous address";
            default:
                return "Reserved for future use";
        }
    }

    private decodeArc(bits : string[]) : string{
        switch (bits.slice(3, 5).join("")) {
            case "00":
                return "25 ft";
            case "01":
                return "100 fts";
            case "10":
                return "Unknown";
            case "11":
                return "Invalid";
            default:
                return "";
        }
    }

    private decodeCl(bits : string[]) : string{
        switch (bits.slice(13, 15).join("")) {
            case "00":
                return "Report valid";
            case "01":
                return "Report suspect";
            case "10":
                return "No information";
            case "11":
                return "Reserved for future use";
            default:
                return "";
        }
    }

}