import { FinalStateSelectedAltitude } from "../valueObjects/FinalStateSelectedAltitude";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class FinalStateSelectedAltitudeDecoder {

    public async decode(item : Buffer) : Promise<FinalStateSelectedAltitude>{
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(2 * 8, "0")
        .split("");

        const mv = bits[0] === "0" ? "Not active or unknown" : "Active";
        const ah = bits[1] === "0" ? "Not active or unknown" : "Active";
        const am = bits[2] === "0" ? "Not active or unknown" : "Active";
    
        const altitude = (TwosComplementToDecimal.transform(bits.slice(3, 16).join("")) * 25).toString(10) + " fl";

        return new FinalStateSelectedAltitude(mv, ah, am, altitude);
    }

}