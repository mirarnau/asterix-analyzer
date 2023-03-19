import { strict as assert } from 'node:assert';

export class TrackStatus {
    cnf: string;
    tre: string;
    cst: string;
    mah: string;
    tcc: string;
    sth: string;
    tom?: string;
    dou?: string;
    mrs?: string;
    gho?: string;

    constructor(cnf: string,
                tre: string,
                cst: string,
                mah: string,
                tcc: string,
                sth: string,
                tom?: string,
                dou?: string,
                mrs?: string,
                gho?: string){
        
        this.cnf = cnf;
        this.tre = tre;
        this.cst = cst;
        this.mah = mah;
        this.tcc = tcc;
        this.sth = sth;
        this.tom = tom;
        this.dou = dou;
        this.mrs = mrs;
        this.gho = gho;
        this.validate();
    }

    //TODO Check which fields are actually mandatory
    validate(){
        assert(this.cnf != null);
        assert(this.tre != null);
        assert(this.cst != null);
        assert(this.mah != null);
        assert(this.tcc != null);
        assert(this.sth != null);
    }

}