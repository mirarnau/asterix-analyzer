import { strict as assert } from 'node:assert';

export class TargetReportDescriptor {
    typ : string;
    dcr : string;
    chn : string;
    gbs : string;
    crt : string;
    sim? : string;
    tst? : string;
    rab? : string;
    lop? : string;
    tot? : string;
    spi? : string;

    constructor(typ : string,
                dcr : string,
                chn : string,
                gbs : string,
                crt : string, 
                sim? : string,
                tst? : string,
                rab? : string,
                lop? : string, 
                tot? : string,
                spi? : string){

        this.typ = typ;
        this.dcr = dcr;
        this.chn = chn;
        this.gbs = gbs;
        this.crt = crt;
        this.sim = sim;
        this.tst = tst;
        this.rab = rab;
        this.lop = lop;
        this.tot = tot;
        this.spi = spi;
        this.validate();
    }

    //TODO: Investigate which parameters are actually optional.
    validate(){
        assert(this.typ != null);
    }

}