import { strict as assert } from 'node:assert';

export class ModeSMBData {
    rep : number;
    data : string;
    bds1 : string;
    bds2 : string;

    constructor(rep : number,
                data : string,
                bds1 : string,
                bds2 : string){
        this.rep = rep;
        this.data = data;
        this.bds1 = bds1;
        this.bds2 = bds2;
        this.validate();
    }

    validate(){
        assert(this.rep != null);
    }

}