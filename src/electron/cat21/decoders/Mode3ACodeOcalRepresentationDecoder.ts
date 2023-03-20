import { Mode3ACodeOctalRepresentation } from "../valueObjects/Mode3ACodeOctalRepresentation";

export class Mode3ACodeOctalRepresentationDecoder {

    public async decode(item : Buffer) : Promise<Mode3ACodeOctalRepresentation>{
        const mode = parseInt("0x" + item.toString("hex"))
        .toString(8)
        .padStart(4, "0");
        return new Mode3ACodeOctalRepresentation(mode);
    }        

}