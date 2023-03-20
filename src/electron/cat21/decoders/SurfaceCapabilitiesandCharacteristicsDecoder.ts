import { SurfaceCapabilitiesandCharacteristics } from "../valueObjects/SurfaceCapabilitiesandCharacteristics";

export class SurfaceCapabilitiesandCharacteristicsDecoder {

    public async deocde(item : Buffer) : Promise<SurfaceCapabilitiesandCharacteristics> {
        const bits = BigInt("0x" + item.subarray(0, 1).toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");
        const poa = bits[2] === "0" ? "Position transmitted is not ADS-B position reference point" : "Position transmitted is the ADS-B position reference point";
        const cdtis = bits[3] === "0" ? "CDTI not operational" : "CDTI operational";
        const b2_low = bits[4] === "0" ? "0 >= 70 Watts" : "< 70 Watts";
        const ras = bits[5] === "0" ? "Aircraft not receiving ATC-services" : "Aircraft receiving ATC services";
        const ident = bits[6] === "0" ? "IDENT switch not active" : "IDENT switch active";

        if (bits[7] === "0") {
            return new SurfaceCapabilitiesandCharacteristics(poa, cdtis, b2_low, ras, ident);
        }

        var lw = this.decodeLw(item, bits);
        return new SurfaceCapabilitiesandCharacteristics(poa, cdtis, b2_low, ras, ident, lw);        
    }

    private decodeLw(item : Buffer, bits : string[]) : string {
        switch (
            BigInt("0x" + item.subarray(1, 2).toString("hex"))
              .toString(2)
              .padStart(8, "0")
              .split("")
              .slice(4, 8)
              .join("")
          ) {
            case "0000":
              return "L < 15   W < 11.5";
            case "0001":
              return "L < 15   W < 23";
            case "0010":
              return "L < 25   W < 28.5";
            case "0011":
              return "L < 25   W < 34";
            case "0100":
              return "L < 35   W < 33";
            case "0101":
              return "L < 35   W < 38";
            case "0110":
              return "L < 45   W < 39.5";
            case "0111":
              return "L < 45   W < 45";
            case "1000":
              return "L < 55   W < 45";
            case "1001":
              return "L < 55   W < 52";
            case "1010":
              return "L < 65   W < 59.5";
            case "1011":
              return "L < 65   W < 67";
            case "1100":
              return "L < 75   W < 72.5";
            case "1101":
              return "L < 75   W < 80";
            case "1110":
              return "L < 85   W < 80";
            case "1111":
              return "L < 85   W < 80";
            default:
                return "";
          }
    }

}