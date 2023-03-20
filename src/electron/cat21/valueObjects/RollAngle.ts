import { strict as assert } from 'node:assert';

export class RollAngle {
    value : string;

    constructor(value : string){
        this.value = value;
        this.validate();
    }

    validate(){
        assert(this.value != null);
    }

}