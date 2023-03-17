import { strict as assert } from 'node:assert';

export class ServiceManagement {
    rp : number;

    constructor(rp : number){
        this.rp = rp;
        this.validate();
    }

    validate(){
        assert(this.rp != null);
    }

}