import { TrackAngleRate } from "../valueObjects/TrackAngleRate";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class TrackAngleRateDecoder {

    public async deocde(item : Buffer) : Promise<TrackAngleRate> {
        const decimal_value = TwosComplementToDecimal.transform(BigInt("0x" + item.subarray(0, 2).toString("hex"))
        .toString(2)
        .padStart(10, "0")) / 32;
        const tar = decimal_value.toString(10) + " deg/s";

        return new TrackAngleRate(tar);
    }

}