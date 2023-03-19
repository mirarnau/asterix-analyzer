import { AirborneGroundVector } from "../valueObjects/AirborneGroundVector";

export class AirborneGroundVectorDecoder {

    public async decode(item : Buffer) : Promise<AirborneGroundVector> {
        const bits = BigInt("0x" + item.subarray(0, 2).toString("hex"))
            .toString(2)
            .padStart(2 * 8, "0")
            .split("");

        const ground_speed = bits[0] === "0" ? parseInt(bits.slice(1, 16).join("").toString(), 2) * Math.pow(2, -14) + " nmi/s"
            : "Value exceeds defined range";
        const track_angle = (parseInt("0x" + item.subarray(2, 4).toString("hex")) * 360) / Math.pow(2, 16) + " deg";

        return new AirborneGroundVector(bits[0], ground_speed, track_angle);
    }

}