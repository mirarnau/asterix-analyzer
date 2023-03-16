import { strict as assert } from 'node:assert';

export class FlightLevelBinary{
    v : string;
    g : string;

    constructor(v : string, g : string){
        this.v = v;
        this.g = g;
        this.validate();
    }

    validate(){
        assert(this.v != null);
        assert(this.g != null);
    }

}