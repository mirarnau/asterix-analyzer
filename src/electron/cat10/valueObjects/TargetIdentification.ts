import { strict as assert } from 'node:assert';

export class TargetIdentification {
    sti : string;
    data : string;

    constructor(sti : string, data : string){
        this.sti = sti;
        this.data = data;
        this.validate();
    }

    validate(){
        assert(this.sti != null);
        assert(this.data != null);
    }

}