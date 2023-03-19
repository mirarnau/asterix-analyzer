import { RollAngle } from "../valueObjects/RollAngle";
import { TwosComplementToDecimal } from "../../utils/twosComplementToDecimal";

export class RollAngleDecoder {

    public async decode(item : Buffer) : Promise<RollAngle> {
        const value = (item.readIntBE(0, 2) * 0.01).toString(10) + " deg";
        return new RollAngle(value);
    }
    
}