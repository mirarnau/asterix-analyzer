import { strict as assert } from 'node:assert';

export class AircraftOperationalStatus {
    ra : string;
    tc : string;
    ts : string;
    arv : string;
    cdti : string;
    tcas : string;
    sa : string;

    constructor(ra : string,
                tc : string,
                ts : string,
                arv : string,
                cdti : string,
                tcas : string,
                sa : string){

        this.ra = ra;
        this.tc = tc;
        this.ts = ts;
        this.arv = arv;
        this.cdti = cdti;
        this.tcas = tcas;
        this.sa = sa;
        this.validate();
    }

    //TODO: Investigate which parameters are actually optional.
    validate(){
        assert(this.ra != null);
    }

}