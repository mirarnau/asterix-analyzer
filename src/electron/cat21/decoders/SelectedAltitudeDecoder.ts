import { SelectedAltitude } from "../valueObjects/SelectedAltitude";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class SelectedAltitudeDecoder {

    public async decode(item : Buffer) : Promise<SelectedAltitude> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(2 * 8, "0")
            .split("");

        const sas = bits[0] === "0" ? "No source information provided" : "Source Information provided";
        const source = this.decodeSource(bits);
        const altitude = (TwosComplementToDecimal.transform(bits.slice(3, 16).join("")) * 25).toString(10) + " fl";
        
        return new SelectedAltitude(sas, source, altitude);
      }

    private decodeSource(bits : string[]) : string {
        switch(bits.slice(1, 3).join("")) {
            case "00":
              return "Unknown";
            case "01":
              return "Aircraft Altitude (Holding Altitude)";
            case "10":
              return "MCP/FCU Selected Altitude";
            case "11":
              return "FMS Selected Altitude";
            default:
                return "";
        }
    }
    
}