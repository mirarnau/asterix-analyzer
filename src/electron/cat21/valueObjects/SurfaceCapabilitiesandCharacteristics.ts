import { strict as assert } from 'node:assert';

export class SurfaceCapabilitiesandCharacteristics {
    poa : string;
    cdtis : string;
    b2_low : string;
    ras : string;
    ident : string;
    LW? : string;

    constructor(poa : string,
                cdtis : string,
                b2_low : string,
                ras : string,
                ident : string,
                LW? : string){

        this.poa = poa;
        this.cdtis = cdtis;
        this.b2_low = b2_low;
        this.ras = ras;
        this.ident = ident;
        this.LW = LW;
        this.validate();
    }

    //TODO: Investigate which parameters are actually optional.
    validate(){
        assert(this.poa != null);
    }

}