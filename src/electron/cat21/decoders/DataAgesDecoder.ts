import { DataAges } from "../valueObjects/DataAges";

export class DataAgesDecoder {

    public async decode(item : Buffer) : Promise<DataAges> {
        var aos : string | number = "Absence";
        var trd : string | number= "Absence";
        var m3a : string | number = "Absence";
        var qi : string | number = "Absence";
        var tri : string | number = "Absence";
        var mam : string | number = "Absence";
        var gh : string | number = "Absence";
        var fl : string | number = "Absence";
        var isa : string | number = "Absence";
        var fsa : string | number = "Absence";
        var as : string | number = "Absence";
        var tas : string | number = "Absence";
        var mh : string | number = "Absence";
        var bvr : string | number = "Absence";
        var gvr : string | number = "Absence";
        var gv : string | number = "Absence";
        var tar : string | number = "Absence";
        var ti : string | number = "Absence";
        var ts : string | number = "Absence";
        var met : string | number = "Absence";
        var roa : string | number = "Absence";
        var ara : string | number = "Absence";
        var scc : string | number = "Absence";

        const items = BigInt("0x" + item.subarray(0, 4).toString("hex"))
            .toString(2)
            .padStart(4 * 8, "0")
            .split("");

        let count = 7;
        let found = false;
        let offset = items.filter((value, index) => {
            if (index == count && !found) {
              if (value != "1") {
                found = true;
              } else {
                count += 8;
              }
              return true;
            }
            return;
        }).length;

        if (items[0] === "1") {
        // Subfield #1: Aircraft Operational Status age
        aos = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[1] === "1") {
        // Subfield #2: Target Report Descriptor age
        trd = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[2] === "1") {
        // Subfield #3: Mode 3/A Code age
        m3a = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[3] === "1") {
        // Subfield #4: Quality Indicators age
        qi = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[4] === "1") {
        // Subfield #5: Trajectory Intent age
        tri = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[5] === "1") {
        // Subfield #6: Message Amplitude age
        mam = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[6] === "1") {
        // Subfield #7: Geometric Height age
        gh = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
        offset++;
        }
        if (items[7] === "1") {
        // More subfields
        if (items[8] === "1") {
            // Subfield #8: Flight Level age
            fl = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[9] === "1") {
            // Subfield #9: Intermediate State Selected Altitude age
            isa = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[10] === "1") {
            // Subfield #10: Final State Selected Altitude age
            fsa = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[11] === "1") {
            // Subfield #11: Air Speed age
            as = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[12] === "1") {
            // Subfield #12: True Air Speed age
            tas = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[13] === "1") {
            // Subfield #13: Magnetic Heading age
            mh = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[14] === "1") {
            // Subfield #14: Barometric Vertical Rate age
            bvr = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
        }
        if (items[15] === "1") {
            // More subfields
            if (items[16] === "1") {
            // Subfield #15: Geometric Vertical Rate age
            gvr = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[17] === "1") {
            // Subfield #16: Ground Vector age
            gv = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[18] === "1") {
            // Subfield #17: Track Angle Rate age
            tar = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[19] === "1") {
            // Subfield #18: Target Identification age
            ti = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[20] === "1") {
            // Subfield #19: Target Status age
            ts = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[21] === "1") {
            // Subfield #20: Met Information age
            met = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[22] === "1") {
            // Subfield #21: Roll Angle age
            roa = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
            offset++;
            }
            if (items[23] === "1") {
            // More subfields
            if (items[24] === "1") {
                // Subfield #22: ACAS Resolution Advisory age
                ara = parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
                offset++;
            }
            if (items[25] === "1") {
                // Subfield #23: Surface Capabilities and Characteristics age
                scc =
                parseInt("0x" + item.subarray(offset, offset + 1).toString("hex")) * 0.1;
                offset++;
            }
            }
        }
    }
    return new DataAges(aos, trd, m3a, qi, tri, mam, gh, fl, isa, fsa, as, tas, mh, bvr, gvr, gv, tar, ti, ts, met, roa, ara, scc);
    }

}