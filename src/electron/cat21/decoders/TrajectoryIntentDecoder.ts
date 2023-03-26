import { TrajectoryIntent } from "../valueObjects/TrajcetoryIntent";

export class TrajectoryIntentDecoder {

    public async decode(item : Buffer, tis: boolean, tid: boolean, rep: number) : Promise<TrajectoryIntent> {
        var offset = 0;
        let nav;
        let nvb;
        if (tis) {
            const bits = BigInt("0x" + item.subarray(0, 1).toString("hex"))
                .toString(2)
                .padStart(8, "0")
                .split("");

            nav = bits[0] === "0"
                ? "Trajectory Intent Data is  available for this aircraft"
                : "Trajectory Intent Data is not available for this aircraft";
            nvb = bits[0] === "0" ? "Trajectory Intent Data is valid" : "Trajectory Intent Data is not valid";
            
            if (!tid) {
                return new TrajectoryIntent(tis, tid, nav, nvb);
            }
            offset++;
        }

        if (tid) {
            var vec = [];
            offset++;
            for (var i = 0; i < rep; i++) {
                const octet1 = BigInt("0x" + item.subarray(offset, offset + 1).toString("hex"))
                .toString(2)
                .padStart(8, "0")
                .split("");
                const tca = octet1[0] === "0" ? "TCP number available" : "TCP number not available";
                const nc = octet1[1] === "0" ? "TCP compliance" : "TCP non-compliance";
                const tcp_number = parseInt(octet1.slice(2, 7).join(""), 2).toString(10);
        
                const altitude = (item.subarray(offset + 1, offset + 3).readInt16BE() * 10).toString(10) + " ft";
        
                const latitude = (item.readIntBE(offset + 3, offset + 6) * 180) / Math.pow(2, 23) + "deg";
                const longitude = (item.readIntBE(offset + 6, offset + 9) * 180) / Math.pow(2, 23) + "deg";
        
                const octet11 = BigInt("0x" + item.subarray(offset + 9, offset + 10).toString("hex"))
                .toString(2)
                .padStart(8, "0")
                .split("");

                const point_type = this.decodePt(octet11);
                const td =  this.decodeTd(octet11);
                const tra = octet11[6] === "0" ? "TTR not available" : "TTR available";
                const toa = octet11[7] === "0" ? "TOV available" : "TOV not available";
                const tov = parseInt("0x" + item.subarray(offset + 10, offset + 13).toString("hex")).toString(10) + " s";
                const ttr = parseInt("0x" + item.subarray(offset + 13, offset + 15).toString("hex")).toString(10) + " s";
                offset += 15;
                vec.push({
                    TCA: tca,
                    NC: nc,
                    TCPnumber: tcp_number,
                    Altitude: altitude,
                    Latitude: latitude,
                    Longitud: longitude,
                    PointType: point_type,
                    TD: td,
                    TRA: tra,
                    TOA: toa,
                    TOV: tov,
                    TTR: ttr,
                  });
            }
            if (!tis) {
                return new TrajectoryIntent(tis, tid, "No nav", "No nvb",vec);
            }
            } else {
                return new TrajectoryIntent(tis, tid, nav, nvb, vec);
            }
        return new TrajectoryIntent(tis, tid, nav, nvb, vec);
    }

    private decodePt(bits : string[]) : string {
        switch (bits.slice(0, 4).join("")) {
            case "0000":
                return "Unknown";
            case "0001":
                return "Fly by waypoint (LT)";
            case "0010":
                return "Fly over waypoint (LT)";
            case "0011":
                return "Hold pattern (LT)";
            case "0100":
                return "Procedure hold (LT)";
            case "0101":
                return "Procedure turn (LT)";
            case "0110":
                return "RF leg (LT)";
            case "0111":
                return "Top of climb (VT)";
            case "1000":
                return "Top of descent (VT)";
            case "1001":
                return "Start of level (VT)";
            case "1010":
                return "Cross-over altitude (VT)";
            case "1011":
                return "Transition altitude (VT)";
            default:
                return "";
        }
    }

    private decodeTd(bits : string[]) : string {
        switch (bits.slice(4, 6).join("")) {
            case "00":
                return "N/A";
            case "01":
                return "Turn right";
            case "10":
                return "Turn left";
            case "11":
                return "No turn";
            default:
                return "";
        }
    }
}
