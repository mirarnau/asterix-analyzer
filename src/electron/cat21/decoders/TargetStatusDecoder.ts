import { TargetStatus } from "../valueObjects/TargetStatus";

export class TargetStatusDecoder {

    public async decode(item : Buffer) : Promise<TargetStatus> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");
            
        const icf = bits[0] === "0" ? "No intent change active" : "Intent change flag raised";
        const lnav = bits[1] === "0" ? "LNAV Mode engaged" : "LNAV Mode not engaged";
        var ps = this.decodePs(bits);     
        var ss = this.decodeSs(bits);
        
        return new TargetStatus(icf, lnav, ps, ss);
    }

    private decodePs (bits : string[]) : string {
        switch (bits.slice(3, 6).join("")) {
            case "000":
                return "No emergency / not reported";
            case "001":
                return "General emergency";
            case "010":
                return "Lifeguard / medical emergency";
            case "011":
                return "Minimum fuel";
            case "100":
                return "No communications";
            case "101":
                return "Unlawful interference";
            case "110":
                return "“Downed” Aircraft";
            default:
                return "";
        }
    }

    private decodeSs(bits : string[]) : string {
        switch (bits.slice(6, 8).join("")) {
            case "00":
                return "No condition reported";
            case "01":
                return "Permanent Alert (Emergency condition)";
            case "10":
                return "Temporary Alert (change in Mode 3/A Code other than emergency)";
            case "11":
                return "SPI set";
            default:
                return "";
        }
    }

}