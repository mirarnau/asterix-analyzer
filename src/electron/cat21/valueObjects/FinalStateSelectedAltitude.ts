import { strict as assert } from 'node:assert';

export class FinalStateSelectedAltitude {
    mv : string;
    ah : string;
    am : string;
    altitude : string;

    constructor(mv : string,
                ah : string,
                am : string,
                altitude : string){
        this.mv = mv;
        this.ah = ah;
        this.am = am;
        this.altitude = altitude;
        this.validate();
    }

    validate(){
        assert(this.mv != null);
    }

}