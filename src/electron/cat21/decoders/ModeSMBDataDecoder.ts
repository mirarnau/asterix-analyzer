import { ModeSMBData } from "../valueObjects/ModeSMBData";

export class ModeSMBDataDecoder {

    public async decode(item : Buffer, rep : number) : Promise<ModeSMBData> {
        var count = 0;
        var data = "MB Data: 0x";
        var bds1 = "BDS1: 0x";
        var bds2 = "BDS2: 0x";

        for (var i = 0; i < rep; i++) {
        try {
            var bits = BigInt("0x" + item.subarray(count, count + 9).toString("hex"))
                .toString(2)
                .padStart(9 * 8, "0")
                .split("");

            var data2 = bits.slice(0, 8 * 7).join("");
            data +=data2;
            var add1 = bits.slice(8 * 7, 8 * 7 + 4).join("");
            bds1 += add1;
            var add2 = bits.slice(8 * 7 + 4, 8 * 7 + 8).join("");
            bds2 += add2;
            count += 8;            
        } catch {}
        }
        return new ModeSMBData(rep, data, bds1, bds2);
    }

}