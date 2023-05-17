import { TargetAddress } from "../valueObjects/TargetAddress";

export class TargetAddressDecoder{

    public async decode(item : Buffer) : Promise<TargetAddress>{
        let value = "0x" + item.toString("hex");
        value = value.substring(2);
        return new TargetAddress(value);
    }
    
}