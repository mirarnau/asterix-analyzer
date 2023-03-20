import { FlightLevel } from "../valueObjects/FlightLevel";

export class FlightLevelDecoder {

    public async decode(item : Buffer) : Promise<FlightLevel> {
        const value = "FL" + (item.readIntBE(0, 2) / 4).toString(10);
        return new FlightLevel(value);
    }
    
}