import { CalculatedTrackVelocityCartesianCoordinates } from "../valueObjects/CalculatedTrackVelocityCartesianCoordinates";

export class CalculatedTrackVelocityCartesianCoordinatesDecoder {

    public async decode(item : Buffer) : Promise <CalculatedTrackVelocityCartesianCoordinates>{
        const xBuff = item.subarray(0, 2)
        const yBuff = item.subarray(2, 4)

        const x = xBuff.readInt16BE() * 0.25;
        const y = yBuff.readInt16BE() * 0.25;
    
        return new CalculatedTrackVelocityCartesianCoordinates(x, y);
    }
    
}