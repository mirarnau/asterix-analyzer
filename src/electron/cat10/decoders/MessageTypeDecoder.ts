export class MessageTypeDecoder {

    public async decode(item: Buffer) : Promise <string>{ 
        switch (item[0]) {
            case 0x01:
              return "Target Report";
            case 0x02:
                return "Start of Update Cycle";
            case 0x03:
                return "Periodic Status Message";
            case 0x04:
                return "Event-triggered Status Message";
          }
          return "Unknown";
    }

}