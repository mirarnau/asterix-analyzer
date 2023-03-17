import { TimeofMessageReceptionofPosition_HighPrecision } from "../valueObjects/TimeofMessageReceptionofPosition_HighPrecision";

export class TimeofMessageReceptionofPosition_HighPrecisionDecoder{

    public async decode(item : Buffer) : Promise <TimeofMessageReceptionofPosition_HighPrecision> {
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
        return new TimeofMessageReceptionofPosition_HighPrecision(time);
    }
}