import { MeasuredHeight } from "../valueObjects/MeasuredHeight";

export class MeasuredHeightDecoder {

    public async decode(item : Buffer) : Promise<MeasuredHeight>{
        var height = (item.readInt16BE() * 6.25);

        return new MeasuredHeight(height);
    }
    
}