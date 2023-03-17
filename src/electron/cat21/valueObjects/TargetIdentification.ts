import { strict as assert } from 'node:assert';

export class TargetIdentification {
    data : string;

    constructor(data : string){
        this.data = data;
        this.validate();
    }

    validate(){
        assert(this.data != null);
    }

}