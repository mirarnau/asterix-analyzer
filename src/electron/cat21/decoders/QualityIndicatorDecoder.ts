import { QualityIndicators } from "../valueObjects/QualityIndicators";

export class QualityIndicatorsDecoder {

    public async decode(item : Buffer) : Promise<QualityIndicators> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(item.length * 8, "0")
            .split("");

        // const nucr_or_nacv = parseInt(bits.slice(0, 3).join("").toString(), 2).toString(16).padStart(2, "0"); 
        const nucr_or_nacv = this.decodeNucr_or_nacv(bits);
        // const nucp_or_nic = parseInt(bits.slice(3, 7).join("").toString(), 2).toString(16).padStart(2, "0");
        const nucp_or_nic = this.decodeNucp_or_nic(bits);

        if (bits[7] == "0") {
            return new QualityIndicators(nucr_or_nacv, nucp_or_nic);
        }

        const nicbaro = "0x" + parseInt(bits.slice(8, 9).join("").toString(), 2).toString(16).padStart(2, "0");
        const sil = this.decodeSil(bits);
        // const sil = parseInt(bits.slice(9, 11).join("").toString(), 2).toString(16).padStart(2, "0");
        const nacp = this.decodeNacp(bits);
        // const nacp = parseInt(bits.slice(11, 15).join("").toString(), 2).toString(16).padStart(2, "0");

        if (bits[15] == "0") {
            return new QualityIndicators(nucr_or_nacv, nucp_or_nic, nicbaro, sil, nacp)
        }

        const second_sil = bits[18] == "0" ? "measured per flight-hour" : "measured per sample";
        const sda = this.decodeSda(bits);
        // const sda = parseInt(bits.slice(19, 21).join("").toString(), 2).toString(16).padStart(2, "0");
        const gva = this.decodeGva(bits);
        // const gva = parseInt(bits.slice(21, 23).join("").toString(), 2).toString(16).padStart(2, "0");

        if (bits[23] == "0") {
            return new QualityIndicators(nucr_or_nacv, nucp_or_nic, nicbaro, sil, nacp, second_sil, sda, gva);
        }

        const pic = this.decodePic(bits);
        // const pic = parseInt(bits.slice(24, 28).join("").toString(), 2).toString(16).padStart(2, "0");

        return new QualityIndicators(nucr_or_nacv, nucp_or_nic, nicbaro, sil, nacp, second_sil, sda, gva, pic);
    }


    private decodeNucr_or_nacv(bits : string[]) : string{
        switch (bits.slice(0, 3).join("")) {
            case "000":
                return "Horizontal Velocity Error >= 10 m/s";
            case "001":
                return "Horizontal Velocity Error < 10 m/s";
            case "010":
                return "Horizontal Velocity Error < 3 m/s";
            case "011":
                return "Horizontal Velocity Error < 1 m/s";
            case "100":
                return "Horizontal Velocity Error < 0.3 m/s";
            default:
                return "";
        }
    }

    private decodeNucp_or_nic(bits : string[]) : string{
        switch (bits.slice(3, 7).join("")) {
            case "0000":
                return "Radius of Containment unknown";
            case "0001":
                return "Radius of Containment < 20 NM (37.04 km)";
            case "0010":
                return "Radius of Containment < 8 NM (14.816 km)";
            case "0011":
                return "Radius of Containment < 4 NM (7.408 km)";
            case "0100":
                return "Radius of Containment < 2 NM (3.704 km)";
            case "0101":
                return "Radius of Containment < 1 NM (1852 m)";
            case "0110":
                return "Radius of Containment < 0.6 NM (1111.2 m)";
            case "0111":
                return "Radius of Containment < 0.2 NM (370.4 m)";
            case "1000":
                return "Radius of Containment < 0.1 NM (185.2 m)";
            case "1001":
                return "Radius of Containment < 75 m";
            case "1010":
                return "Radius of Containment < 25 m";
            case "1011":
                return "Radius of Containment < 7.5 m";
            default:
                return "Reserved";
        }
    }

    private decodeSil(bits : string[]) : string{
        switch (bits.slice(9, 11).join("")) {
            case "00":
              return "Unknown or > 1 x 10^-3 per flight hour or per sample";
            case "01":
              return "<= 1 x 10^-3 per flight hour or per sample";
            case "10":
              return "<= 1 x 10^-5 per flight hour or per sample";
            case "11":
              return "<= 1 x 10^-7 per flight hour or per sample";
            default:
                return "";
        }
    }

    private decodeNacp(bits : string[]) : string{
        switch (bits.slice(11, 15).join("")) {
            case "0000":
                return "EPU >= 18.52 km (>= 10 NM) 'Unknown accuracy'";
            case "0001":
                return "EPU < 18.52 km (10 NM) 'RNP-10 accuracy'";
            case "0010":
                return "EPU < 7.408 km (4 NM) 'RNP-4 accuracy'";
            case "0011":
                return "EPU < 3.704 km (2 NM) 'RNP-2 accuracy'";
            case "0100":
                return "EPU < 1852 m (1 NM) 'RNP-1 accuracy'";
            case "0101":
                return "EPU < 926 m (0.5 NM) 'RNP-0.5 accuracy'";
            case "0110":
                return "EPU < 555.6 m (0.3 NM) 'RNP-0.3 accuracy'";
            case "0111":
                return "EPU < 185.2 m (0.1 NM) 'RNP-0.1 accuracy'";
            case "1000":
                return "EPU < 92.6 m (0.05 NM) 'e.g., GPS (with SA on)'";
            case "1001":
                return "EPU < 30 m 'e.g., GPS (SA off)'";
            case "1010":
                return "EPU < 10 m 'e.g., WAAS'";
            case "1011":
                return "EPU < 3 m 'e.g., LAAS'";
            default:
                return "Reserved";
        }
    }

    private decodeSda(bits : string[]) : string{
        switch (bits.slice(19, 21).join("")) {
            case "00":
                return "Supported Failure Conditions: Unknown/No safety effect \nProbability of Undetected Fault: > 1 x 10^-3 per flight hour or Unknown \nSoftware & Hardware Design Assurance Level: N/A";
            case "01":
                return "Supported Failure Conditions: Minor \nProbability of Undetected Fault: <= 1 x 10^-3 per flight hour \nSoftware & Hardware Design Assurance Level: D";
            case "10":
                return "Supported Failure Conditions: Major \nProbability of Undetected Fault: > 1 x 10^-5 per flight hour \nSoftware & Hardware Design Assurance Level: C";
            case "11":
                return "Supported Failure Conditions: Hazardous \nProbability of Undetected Fault: > 1 x 10^-7 per flight hour \nSoftware & Hardware Design Assurance Level: B";
            default:
                return "";
        }
    }

    private decodeGva(bits : string[]) : string{
        switch (bits.slice(21, 23).join("")) {
            case "00":
              return "Unknown or > 150 meters";
            case "01":
              return "<= 150 meters";
            case "10":
              return "<= 45 meters";
            case "11":
              return "Reserved";
            default:
                return "";
        }
    }

    private decodePic(bits : string[]) : string{
        switch (bits.slice(24, 28).join("")) {
            case "0000":
                return "No integrity (or > 20.0 NM)";
            case "0001":
                return "< 20.0 NM";
            case "0010":
                return "< 10.0 NM";
            case "0011":
                return "< 8.0 NM";
            case "0100":
                return "< 4.0 NM";
            case "0101":
                return "< 2.0 NM";
            case "0110":
                return "< 1.0 NM";
            case "0111":
                return "< 0.6 NM";
            case "1000":
                return "< 0.5 NM";
            case "1001":
                return "< 0.3 NM";
            case "1010":
                return "< 0.2 NM";
            case "1011":
                return "< 0.1 NM";
            case "1100":
                return "< 0.04 NM";
            case "1101":
                return "< 0.013 NM";
            case "1110":
                return "< 0.004 NM";
            case "1111":
                return "Not defined";
            default:
                return "";
        }
    }

}