import { strict as assert } from 'node:assert';

export class TargetReportDescriptor {
    atp : string;
    arc : string;
    rc : string;
    rab : string;
    dcr? : string;
    gbs? : string;
    sim? : string;
    tst?: string;
    saa? : string;
    cl? : string;
    ipc? : string;
    nogo? : string;
    cpr? : string;
    ldpj? : string;
    rcf? : string;

    constructor(atp : string,
                arc : string,
                rc : string,
                rab : string,
                dcr? : string,
                gbs? : string,
                sim? : string,
                tst? : string,
                saa? : string,
                cl? : string,
                ipc? : string,
                nogo? : string,
                cpr? : string,
                ldpj? : string,
                rcf? : string){
    
    this.atp = atp;
    this.arc = arc;
    this.rc = rc;
    this.rab = rab;
    this.dcr = dcr;
    this.gbs = gbs;
    this.sim = sim;
    this.tst = tst;
    this.saa = saa;
    this.cl = cl;
    this.ipc = ipc;
    this.nogo = nogo;
    this.cpr = cpr;
    this.ldpj = ldpj;
    this.rcf = rcf;
    this.validate();

    }

    validate(){
        assert(this.atp != null);
    }

}