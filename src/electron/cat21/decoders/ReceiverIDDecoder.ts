import { ReceiverID } from "../valueObjects/ReceiverID";

export class ReceiverIDDecoder {

    public async decode(item : Buffer) : Promise<ReceiverID> {
        const value = "0x" + item.toString("hex").padStart(2, "0");
        return new ReceiverID(value);
    }
}