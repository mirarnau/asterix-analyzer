import { TargetAddress } from "../valueObjects/TargetAddress";

export class TargetAddressDecoder{

    public async decode(item : Buffer) : Promise<TargetAddress>{
        const value = "0x" + item.toString("hex");
        return new TargetAddress(value);
    }
    
}