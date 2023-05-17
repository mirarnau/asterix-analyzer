import { CalculatedTrackVelocityPolarCoordinates } from "../valueObjects/CalculatedTrackVelocityPolarCoordinates";

export class CalculatedTrackVelocityPolarCoordinatesDecoder {

    public async decode(item : Buffer) : Promise <CalculatedTrackVelocityPolarCoordinates>{
        const rhoBuff = item.subarray(0, 2)
        const thetaBuff = item.subarray(2, 4)

        const rho = rhoBuff.readInt16BE() * Math.pow(2, -14) * 3600;
        const theta = (thetaBuff.readInt16BE() * 360) / Math.pow(2, 16);

        return new CalculatedTrackVelocityPolarCoordinates(rho, theta);
    }
    
}