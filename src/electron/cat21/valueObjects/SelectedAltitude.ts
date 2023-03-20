import { strict as assert } from 'node:assert';

export class SelectedAltitude {
    sas : string;
    source : string;
    altitude : string;

    constructor(sas : string,
                source : string,
                altitude : string){
        this.sas = sas;
        this.source = source;
        this.altitude = altitude;
        this.validate();
    }

    validate(){
        assert(this.sas != null);
    }

}