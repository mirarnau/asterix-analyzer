import { TargetReportDescriptor } from "../valueObjects/TargetReportDescriptor";

export class TargetReportDescriptorDecoder {

    public async decode(item : Buffer) : Promise<TargetReportDescriptor> {
        const numOctets = item.length;
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(numOctets * 8, "0")
        .split("");

        var typ = this.decodeTyp(bits);
        var dcr = bits[3] === "0" ? "No differential correction (ADS-B)" : "Differential correction (ADS-B)";
        var chn = bits[4] === "0" ? "Chain 1" : "Chain 2";
        var gbs = bits[5] === "0" ? "Transponder Ground bit not set" : "Transponder Ground bit set";
        var crt = bits[6] === "0" ? "No Corrupted reply in multilateration" : "Corrupted replies in multilateration";

        if (numOctets === 1) {
            return new TargetReportDescriptor(typ, dcr, chn, gbs, crt)
        }

        var sim = bits[8] === "0" ? "Actual target report" : "Simulated target report";
        var tst = bits[9] === "0" ? "Default" : "Test Target";
        var rab = bits[10] === "0" ? "Report from target transponder" : "Report from field monitor (fixed transponder)";
        var lop = this.decodeLop(bits);
        var tot = this.decodeTot(bits);

        if (numOctets === 2) {
            return new TargetReportDescriptor(typ, dcr, chn, gbs, crt, sim, tst, rab, lop, tot)
        }

        var spi = bits[16] === "0" ? "Absence of SPI" : "Special Position Identification";

        return new TargetReportDescriptor(typ, dcr, chn, gbs, crt, sim, tst, rab, lop, tot, spi);
    }

    private decodeTyp(bits : string[]) : string{
        switch (bits.slice(0, 3).join("")) {
            case "000":
                return "SSR multilateration";
            case "001":
                return"Mode S multilateration";
            case "010":
                return "ADS-B";
            case "011":
                return "PSR";
            case "100":
                return "Magnetic Loop System";
            case "101":
                return "HF multilateration";
            case "110":
                return "Not defined";
            case "111":
                return "Other types";
        }
        return "Unknown"
    }

    private decodeLop(bits : string[]) : string{
        switch (bits.slice(11, 13).join("")) {
            case "00":
                return "Undetermined";
            case "01":
                return "Loop start";
            case "10":
                return "Loop finish";
            }
        return "Unknown"
    }

    private decodeTot(bits : string[]) : string{
        switch (bits.slice(13, 15).join("")) {
            case "00":
                return "Undetermined";
            case "01":
                return "Aircraft";
            case "10":
                return"Ground vehicle";
            case "11":
                return "Helicopter";
            }
        return "Unknown"
    }
    

}