import { TimeOfDay } from "../valueObjects/TimeOfDay";

export class TimeOfDayDecoder {

    public async decode(item : Buffer) : Promise<TimeOfDay>{
        var timestamp = parseInt("0x" + item.toString("hex")) / 128.0;
        var time = new Date(timestamp * 1000).toISOString().substring(11, 23);

        return new TimeOfDay(time);
    }
    
}