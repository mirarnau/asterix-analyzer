import { strict as assert } from 'node:assert';

export class ACASResolutionAdvisoryReport {
    typ : string;
    styp : string;
    ara : string;
    rac : string;
    rat : string;
    mte : string;
    tti : string;
    tid : string;

    constructor(typ : string,
                styp : string,
                ara : string,
                rac : string,
                rat : string,
                mte : string,
                tti : string,
                tid : string){

        this.typ = typ;
        this.styp = styp;
        this.ara = ara;
        this.rac = rac;
        this.rat = rat;
        this.mte = mte;
        this.tti = tti;
        this.tid = tid;
        this.validate();
    }

    //TODO: Investigate which parameters are actually optional.
    validate(){
        assert(this.typ != null);
    }

}