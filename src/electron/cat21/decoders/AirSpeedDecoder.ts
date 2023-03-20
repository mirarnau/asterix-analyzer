import { AirSpeed } from "../valueObjects/AirSpeed";

export class AirSpeedDecoder {

    public async decode(item : Buffer) : Promise<AirSpeed> {

        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(2 * 8, "0")
            .split("");

        const speed = parseInt(bits.slice(1, 16).join(""), 2);
        const air_speed = bits[0] === "0" ? "IAS: " + (speed * Math.pow(2, -14)).toString(10) + " NM/s" : "Mach: " + (speed * 0.001).toString(10);

        return new AirSpeed(bits[0], air_speed);
    }

}