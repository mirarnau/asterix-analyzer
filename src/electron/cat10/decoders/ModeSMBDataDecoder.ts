import { ModeSMBData } from "../valueObjects/ModeSMBData";

export class ModeSMBDataDecoder{
    
    public async decode(item : Buffer, length : number) : Promise<ModeSMBData>{
        var start = 0;
        var modeSMBData : string[] = [];

        for (var i = 0; i < length; i++) {
            try {
                var bits = BigInt("0x" + item.subarray(start, start + 9).toString("hex"))
                    .toString(2)
                    .padStart(9 * 8, "0")
                    .split("");
                var data = bits.slice(0, 8 * 7).join("");
                var bds1 = bits.slice(8 * 7, 8 * 7 + 4).join("");
                var bds2 = bits.slice(8 * 7 + 4, 8 * 7 + 8).join("");

            
                modeSMBData.push("BDS1: 0x" + bds1 + " BDS2: 0x" + bds2 + " MB Data: 0x" + data);
                start += 8;
                } catch {}
        }
        return new ModeSMBData(modeSMBData);
    }
    
}