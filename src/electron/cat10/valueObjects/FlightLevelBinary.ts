import { strict as assert } from 'node:assert';

export class FlightLevelBinary{
    v : string;
    g : string;
    flightLevel : string;

    constructor(v : string, g : string, flightLevel : string){
        this.v = v;
        this.g = g;
        this.flightLevel = flightLevel;
        this.validate();
    }

    validate(){
        assert(this.v != null);
        assert(this.g != null);
        assert(this.flightLevel != null);
    }

}