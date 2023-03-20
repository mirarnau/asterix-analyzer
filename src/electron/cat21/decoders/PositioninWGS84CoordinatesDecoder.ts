import { PositioninWGS84Coordinates } from "../valueObjects/PositioninWGS84Coordinates";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class PositioninWGS84CoordinatesDecoder {

    public async decode(item : Buffer) : Promise<PositioninWGS84Coordinates> {
        const latitude_bits = item.subarray(0, 3);
        const longitude_bits = item.subarray(3, 6);

        const twos_latitude = BigInt("0x" + latitude_bits.toString("hex"))
        .toString(2)
        .padStart(24, "0");

        const twos_longitude = BigInt("0x" + longitude_bits.toString("hex"))
        .toString(2)
        .padStart(24, "0");
        const latitude = (TwosComplementToDecimal.transform(twos_latitude) * 180) / Math.pow(2, 23);
        const longitude = (TwosComplementToDecimal.transform(twos_longitude) * 180) / Math.pow(2, 23);

        return new PositioninWGS84Coordinates(latitude, longitude);
    }
      
}