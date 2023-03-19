import { PositionCartesianCoordinates } from "../valueObjects/PositionCartesianCoordinates";

export class PositionCartesianCoordinatesDecoder {

    public async decode(item : Buffer) : Promise<PositionCartesianCoordinates>{
        const xOctets = item.subarray(0, 2);
        const yComponent = item.subarray(2, 4);

        const x = xOctets.readInt16BE();
        const y = yComponent.readInt16BE();

        return new PositionCartesianCoordinates(x, y);
    }
    
}