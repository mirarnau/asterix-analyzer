import { TargetIdentification } from "../valueObjects/TargetIdentification";

export class TargetIdentificationDecoder {
    
    public async decode(item : Buffer) : Promise<TargetIdentification> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(6 * 8, "0")
            .split("");

        var target_identification = [];
        var start = 0;
        for (var i = 0; i < 8; i++) {
            target_identification.push(this.deoceTarget_identification(bits.slice(start, start + 6)));
            start += 6;
        }

        return new TargetIdentification(target_identification.join());
    }

    private deoceTarget_identification(bits: string[]) {
        var res = "";
        var slice = bits.slice(0, 2).join("");
        if (slice === "11") {
            return parseInt(bits.slice(2, 6).join(""), 2).toString(10);
        }
        switch (bits.slice(2, 6).join("")) {
            case "0000":
            slice === "01" ? (res = "P") : (res = " ");
            break;
            case "0001":
            slice === "00" ? (res = "A") : (res = "Q");
            break;
            case "0010":
            slice === "00" ? (res = "B") : (res = "R");
            break;
            case "0011":
            slice === "00" ? (res = "C") : (res = "S");
            break;
            case "0100":
            slice === "00" ? (res = "D") : (res = "T");
            break;
            case "0101":
            slice === "00" ? (res = "E") : (res = "U");
            break;
            case "0110":
            slice === "00" ? (res = "F") : (res = "V");
            break;
            case "0111":
            slice === "00" ? (res = "G") : (res = "W");
            break;
            case "1000":
            slice === "00" ? (res = "H") : (res = "X");
            break;
            case "1001":
            slice === "00" ? (res = "I") : (res = "Y");
            break;
            case "1010":
            slice === "00" ? (res = "J") : (res = "Z");
            break;
            case "1011":
            res = "K";
            break;
            case "1100":
            res = "L";
            break;
            case "1101":
            res = "M";
            break;
            case "1110":
            res = "N";
            break;
            case "1111":
            res = "O";
            break;
        }
        return res;
    }

}