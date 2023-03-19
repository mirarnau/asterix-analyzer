import { MetInformation } from "../valueObjects/MetInformation";

export class MetInformationDecoder {

    public async decode(item : Buffer, selection : string[]) : Promise<MetInformation> {
        var wind_speed = "Absence of Subfield #1";
        var wind_direction = "Absence of Subfield #2";
        var temperature = "Absence of Subfield #3";
        var turbulence = "Absence of Subfield #4";
        let offset = 0;
        selection.forEach((value) => {
            switch (value) {
                case "WS":
                {
                    wind_speed = parseInt("0x" + item.subarray(offset, offset + 2).toString("hex")).toString(10) + " knot";
                    offset += 2;
                }
                break;
                case "WD":
                {
                    wind_direction = parseInt("0x" + item.subarray(offset, offset + 2).toString("hex")).toString(10) + " deg";
                    offset += 2;
                }
                break;
                case "TMP":
                {
                    temperature = (item.readIntBE(0, 2) * 0.25).toString(10) + " C";
                    offset += 2;
                }
                break;
                case "TRB":
                    turbulence = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")).toString(10);
                break;
            }
        });        

        return new MetInformation(selection[0], selection[1], selection[2], selection[3], wind_speed, wind_direction, temperature, turbulence);
    }
        
}