import { TimeofMessageReceptionforVelocity_HighPrecision } from "../valueObjects/TimeofMessageReceptionforVelocity_HighPrecision";

export class TimeofMessageReceptionforVelocity_HighPrecisionDecoder {

    public async decode(item : Buffer) : Promise<TimeofMessageReceptionforVelocity_HighPrecision> {
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(4 * 8, "0")
            .split("");
        let fsi = 0;
        if (bits.slice(0, 2).join("") == "01") {
            fsi = +1;
        } else if (bits.slice(0, 2).join("") == "10") {
            fsi = -1;
        }
        const time =  (parseInt("0x" + item.toString("hex")) + fsi) * Math.pow(2, -30) * Math.pow(2, 9);
        return new TimeofMessageReceptionforVelocity_HighPrecision(time);
    }
}