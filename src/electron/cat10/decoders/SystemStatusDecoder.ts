import { SystemStatus } from "../valueObjects/SystemStatus";

export class SystemStatusDecoder{

    public async decode(item : Buffer) : Promise<SystemStatus>{
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(8, "0")
            .split("");
        var nogo = this.decodeNogo(bits);
        var ovl = bits[2] === "0" ? "No overload" : "Overload"; 
        var tsv = bits[3] === "0" ? "Valid" : "Invalid"; 
        var div = bits[4] === "0" ? "Normal Operation" : "Diversity degraded";
        var ttf = bits[5] === "0" ? "Test Target Operative" : "Test Target Failure";

        return new SystemStatus(nogo, ovl, tsv, div, ttf);
    }

    private decodeNogo(bits : string[]) : string {
        switch (bits.slice(0, 2).join("")) {
            case "00":
              return "Operational";
            case "01":
              return "Degraded";
            case "10":
              return "NOGO";
          }
          return "Unknown";
    }
    
}