import { strict as assert } from 'node:assert';

export class Presence {
    dRho : string;
    dTheta : string;

    constructor(dRho : string, dTheta : string){
        this.dRho = dRho;
        this.dTheta = dTheta;
        this.validate();
    }

    validate(){
        assert(this.dRho != null);
        assert(this.dRho != null);
    }

}