import { Mode3ACodeOctalRepresentation } from "../valueObjects/Mode3ACodeOctalRepresentation";

export class Mode3ACodeOctalRepresentationDecoder {

    public async decode(item : Buffer) : Promise<Mode3ACodeOctalRepresentation>{
        const bits = BigInt("0x" + item.toString("hex"))
        .toString(2)
        .padStart(2 * 8, "0")
        .split("");
        
        var v = bits[0] === "0" ? "Code validated" : "Code not validated";
        var g = bits[1] === "0" ? "Default" : "Garbled code";
        var l = bits[2] === "0"? 
                "Mode-3/A code derived from the reply of the transponder" : 
                "Mode-3/A code not extracted during the last scan";
        var reply = parseInt("0x" + item.toString("hex"))
        .toString(8)
        .padStart(4, "0");

        return new Mode3ACodeOctalRepresentation(v, g, l, reply);
    }

}