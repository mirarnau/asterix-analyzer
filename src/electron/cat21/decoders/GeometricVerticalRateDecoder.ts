import { GeometricVerticalRate } from "../valueObjects/GeometricVerticalRate";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class GeometricVerticalRateDecoder {

    public async decode(item : Buffer) : Promise<GeometricVerticalRate> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(2 * 8, "0")
            .split("");

        const value = bits[0] === "0" ? (TwosComplementToDecimal.transform(bits.slice(1, 16).join("")) * 6.25).toString(10) + " feet/minute"
            : "Value exceeds defined range";

        return new GeometricVerticalRate(bits[0], value);
    }

}