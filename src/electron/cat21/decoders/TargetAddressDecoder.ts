import { TargetAddress } from "../valueObjects/TargetAddress";

export class TargetAddressDecoder {

    public async decode(item : Buffer) : Promise<TargetAddress> {
        const address = "0x" + item.toString("hex");
        console.log(item);
        return new TargetAddress(address.substring(2));
    }
    
}