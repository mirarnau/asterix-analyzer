import { CalculatedTrackVelocityPolarCoordinates } from "../valueObjects/CalculatedTrackVelocityPolarCoordinates";

export class CalculatedTrackVelocityPolarCoordinatesDecoder {

    public async decode(item : Buffer) : Promise <CalculatedTrackVelocityPolarCoordinates>{
        const bits = BigInt("0x" + item.subarray(0, 2).toString("hex"))
            .toString(2)
            .padStart(2 * 8, "0")
            .split("");
            
        const ground_speed = 1852*(parseInt(bits.slice(0, 16).join("").toString(), 2) * Math.pow(2, -14)) + " m/s";
        const track_angle = (parseInt("0x" + item.subarray(2, 4).toString("hex")) * 360) / Math.pow(2, 16) + " deg";
        // const rhoBuff = item.subarray(0, 2)
        // const thetaBuff = item.subarray(2, 4)

        // const rho = rhoBuff.readInt16BE() * Math.pow(2, -14) * 3600;
        // const theta = (thetaBuff.readInt16BE() * 360) / Math.pow(2, 16);

        return new CalculatedTrackVelocityPolarCoordinates(ground_speed, track_angle);
    }
    
}