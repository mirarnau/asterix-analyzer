import { strict as assert } from 'node:assert';

export class TargetAddress {
    value : string;

    constructor(value : string){
        this.value = value;
        this.validate();
    }

    validate(){
        assert(this.validate != null);
    }
}
