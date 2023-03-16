import { strict as assert } from 'node:assert';

export class ModeSMBData {
    data : string[];

    constructor(data : string[]){
        this.data = data;
        this.validate();
    }

    validate(){
        assert(this.data.length != 0);
    }
    
}