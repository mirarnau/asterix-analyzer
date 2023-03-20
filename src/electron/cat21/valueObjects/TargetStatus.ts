import { strict as assert } from 'node:assert';

export class TargetStatus {
    icf : string;
    lnav : string;
    ps : string;
    ss : string;

    constructor(icf : string,
                lnav : string,
                ps : string,
                ss : string){
        this.icf = icf;
        this.lnav = lnav;
        this.ps = ps;
        this.ss = ss;
        this.validate();
    }

    validate(){
        assert(this.icf != null);
    }

}