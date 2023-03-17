import { TargetAddress } from "../valueObjects/TargetAddress";

export class TargetAddressDecoder {

    public async decode(item : Buffer) : Promise<TargetAddress> {
        const address = "0x" + item.toString("hex");
        return new TargetAddress(address);
    }
    
}