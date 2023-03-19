import { MeasuredPositionPolarCoordinates } from "../valueObjects/MeasuredPositionPolarCoordinates";

export class MeasuredPositionPolarCoordinatesDecoder {

    public async decode(item : Buffer) : Promise<MeasuredPositionPolarCoordinates> {
        const rhoOctets = item.subarray(0, 2);
        const thetaOctets = item.subarray(2, 4);

        const rho = rhoOctets.readInt16BE();
        const theta = (thetaOctets.readInt16BE() * 360) / Math.pow(2, 16);

        return new MeasuredPositionPolarCoordinates(rho, theta);
    }

}