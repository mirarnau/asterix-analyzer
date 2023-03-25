import { PreProgrammedMessage } from "../valueObjects/PreProgrammedMessage";

export class PreProgrammedMessageDecoder {

    public async decode(item : Buffer) : Promise<PreProgrammedMessage>{
        var bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");
        var trb = bits[0] === "0" ? "Default" : "In Trouble";
        var messageId = parseInt(bits.slice(1, 8).join(""), 2);
        var message = this.decodeMessage(messageId);

        return new PreProgrammedMessage(trb, message);
    }

    private decodeMessage(messageId : number) : string{
        switch (messageId) {
            case 1:
              return "Towing aircraft";
            case 2:
              return "“Follow me” operation";
            case 3:
              return "Runway check";
            case 4:
              return "Emergency operation (fire, medical…)";
            case 5:
              return "Work in progress (maintenance, birds scarer, sweepers…)";
          }
          return "Unknown";
    }
    
}