import { AircraftOperationalStatus } from "../valueObjects/AircraftOperationalStatus";

export class AircraftOperationalStatusDecoder {

    public async decode(item: Buffer) : Promise<AircraftOperationalStatus> {
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(8, "0")
        .split("");
        
        var ra = bits[0] === "0" ? "TCAS II or ACAS RA not active" : "TCAS RA active";
        var tc = this.decodeTc(bits);
        var ts = bits[3] === "0" ? "No capability to support Target State Reports" : "Capable of supporting target State Reports";
        var arv = bits[4] === "0" ? "No capability to generate ARV-reports" : "Capable of generate ARV-reports";
        var cdti = bits[5] === "0" ? "CDTI not operational" : "CDTI operational";
        var tcas = bits[6] === "0" ? "TCAS operational" : "TCAS not operational";
        var sa = bits[7] === "0" ? "Antenna Diversity" : "Single Antenna only";
        
        return new AircraftOperationalStatus (ra, tc, ts, arv, cdti, tcas, sa);    
    }

    private decodeTc(bits: string[]) : string{
        switch (bits.slice(1, 3).join("")) {
            case "00":
                return "No capability for Trajectory Change Reports";
            case "01":
                return "Support for TC+0 reports only";
            case "10":
                return "Support for multiple TC reports";
            case "11":
                return "Reserved";
        }
        return "Unknown"
    }
    
}