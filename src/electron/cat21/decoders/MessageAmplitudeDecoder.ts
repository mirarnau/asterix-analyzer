import { MessageAmplitude } from "../valueObjects/MessageAmplitude";

export class MessageAmplitudeDecoder {

    public async decode(item : Buffer) : Promise<MessageAmplitude> {
        const value = item.readIntBE(0, 1).toString(10) + " dBm";
        return new MessageAmplitude(value);
    }
    
}