import { MessageType } from "../valueObjects/MessageType";

export class MessageTypeDecoder {

    public async decode(item: Buffer) : Promise <MessageType>{ 
        switch (item[0]) {
            case 0x01:
              return new MessageType("Target Report");
            case 0x02:
                return new MessageType("Start of Update Cycle");
            case 0x03:
                return new MessageType("Periodic Status Message");
            case 0x04:
                return new MessageType("Event-triggered Status Message");
          }
          return new MessageType("Unknown");
    }

}