import { Presence } from "../valueObjects/Presence";
import { PresenceObject } from "../valueObjects/PresenceObject";

export class PresenceDecoder {
    
    public async decode(item : Buffer, length : number) : Promise<Presence>{
        var offset = 0;
        var list : PresenceObject[] = [];

        for (var i = 0; i < length; i++) {
            try {
                var dRho = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")).toString(10) + " m";
                var dTheta = (parseInt("0x" + item.subarray(offset + 1, offset + 2).toString("hex")) * 0.15).toString(10) + "º";
                offset += 2;
                list.push(new PresenceObject(dRho, dTheta));
            } catch {}
        }

        return new Presence(list);
    }
    
}