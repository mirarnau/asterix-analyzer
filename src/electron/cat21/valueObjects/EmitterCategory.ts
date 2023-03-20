import { strict as assert } from 'node:assert';

export class EmitterCategory {
    ecat : string;

    constructor(ecat : string){
        this.ecat = ecat;
        this.validate();
    }

    validate(){
        assert(this.ecat != null);
    }

}