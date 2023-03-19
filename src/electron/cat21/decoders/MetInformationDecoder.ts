import { MetInformation } from "../valueObjects/MetInformation";

export class MetInformationDecoder {

    public async decode(item : Buffer) : Promise<MetInformation> {
        let selection = [];
        let wind_speed = "";
        let wind_direction = "";
        let temperature = "";
        let turbulence = "";


        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");

        if (bits[0] === "1") {
            selection.push("WS");
        }
        if (bits[1] === "1") {
            selection.push("WD");
        }
        if (bits[2] === "1") {
            selection.push("TMP");
        }
        if (bits[3] === "1") {
            selection.push("TRB");
        }

        this.decodeItems(item, selection, wind_speed, wind_direction, temperature, turbulence);

        return new MetInformation(bits[0], bits[1], bits[2], bits[3], wind_speed, wind_direction, temperature, turbulence);
    }

    private decodeItems(item : Buffer, selection : string[], wind_speed : string, wind_direction : string, temperature : string, turbulence : string) {
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
    }

}