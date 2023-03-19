import { GeometricHeight } from "../valueObjects/GeometricHeight";

export class GeometricHeihgtDecoder {

    public async decode(item : Buffer) : Promise<GeometricHeight> {
        const value = (item.readIntBE(0, 2) * 6.25).toString(10) + " ft";
        return new GeometricHeight(value);
    }
    
}