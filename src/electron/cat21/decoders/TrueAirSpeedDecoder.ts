import { TrueAirSpeed } from "../valueObjects/TrueAirSpeed";

export class TrueAirSpeedDecoder {

    public async decode(item : Buffer) : Promise<TrueAirSpeed> {

        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");

        const true_air_speed = bits[0] === "0" ? parseInt(bits.slice(1, 16).join(""), 2).toString(10) + " knot" : "Value exceeds defined range";

        return new TrueAirSpeed(bits[0], true_air_speed);
    }

}