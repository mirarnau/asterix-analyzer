import { MOPSVersion } from "../valueObjects/MOPSVersion";

export class MOPSVersionDecoder {

    public async decode(item : Buffer) : Promise<MOPSVersion> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");

        const vns = bits[1] === "0" ? "The MOPS Version is supported by the GS" : "The MOPS Version is not supported by the GS";
        const vn = this.decodeVn(bits);
        const ltt = this.decodeLtt(bits);

        return new MOPSVersion(vns, vn, ltt);
    }

    private decodeVn(bits : string[]) : string {
        switch (bits.slice(2, 5).join("")) {
            case "000":
                return "ED102/DO-260";
            case "001":
                return "DO-260A";
            case "010":
                return "ED102A/DO-260B";
            default:
                return "";
        }
    }

    private decodeLtt(bits : string[]) : string {
        switch (bits.slice(5, 8).join("")) {
            case "000":
                return "Other";
            case "001":
                return "UAT";
            case "010":
                return "1090 ES";
            case "011":
                return "VDL 4";
            default:
                return "Not assigned";
        }
    }

}