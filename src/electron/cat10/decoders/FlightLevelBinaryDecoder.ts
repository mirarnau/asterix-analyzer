import { Operator } from "../../utils/Operator";
import { FlightLevelBinary } from "../valueObjects/FlightLevelBinary";

export class FlightLevelBinaryDecoder {

    converter : Operator = new Operator();

    public async decode(item : Buffer) : Promise<FlightLevelBinary>{
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(2 * 8, "0")
        .split("");

        var v = bits[0] === "0" ? "Code validated" : "Code not validated";
        var g = bits[1] === "0" ? "Default" : "Garbled code";
        //@ts-ignore
        var flightLevel = this.converter.fromTwosComplement(buffer.join("")) / 4 + "FL";

        return new FlightLevelBinary(v, g, flightLevel);
    }
    
}