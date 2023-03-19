import { PositionWG84Coordinates } from "../valueObjects/PositionWGS84Coordinates";

export class PositionWG84CoordinatesDecoder{

    public async decode(item : Buffer) : Promise<PositionWG84Coordinates>{
        const latOctets = item.subarray(0, 4);
        const lonOctets = item.subarray(4, 8);

        const latitude = (latOctets.readInt32BE() * 180) / Math.pow(2, 31);
        const longitude = (lonOctets.readInt32BE() * 180) / Math.pow(2, 31);

        return new PositionWG84Coordinates(latitude, longitude);
    }
    
}