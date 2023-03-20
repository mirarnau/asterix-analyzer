import { TrackNumber } from "../valueObjects/TrackNumber";

export class TrackNumberDecoder {

    public async decode(item : Buffer) : Promise<TrackNumber> {
        const value = parseInt("0x" + item.toString("hex"));
        return new TrackNumber(value);
    }
    
}