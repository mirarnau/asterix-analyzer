import { strict as assert } from 'node:assert';

export class ServiceManagement {
    rp : string;

    constructor(rp : string){
        this.rp = rp;
        this.validate();
    }

    validate(){
        assert(this.rp != null);
    }

}