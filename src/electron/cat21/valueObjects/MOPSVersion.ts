import { strict as assert } from 'node:assert';

export class MOPSVersion {
    vns : string;
    vn : string;
    ltt : string;

    constructor(vns : string,
                vn : string,
                ltt : string){
        this.vns = vns;
        this.vn = vn;
        this.ltt = ltt;
        this.validate();
    }

    validate(){
        assert(this.vns != null);
    }

}