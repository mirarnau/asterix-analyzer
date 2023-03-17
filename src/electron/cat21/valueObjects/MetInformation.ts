import { strict as assert } from 'node:assert';

export class MetInformation {
    ws : string;
    wd : string;
    tmp : string;
    trb : string;
    wind_speed? : string;
    wind_direction? : string;
    temperature? : string;
    turbulence? : number;

    constructor(ws : string,
                wd : string,
                tmp : string,
                trb : string,
                wind_speed? : string,
                wind_direction? : string,
                temperature? : string,
                turbulence? : number){
        this.ws = ws;
        this.wd = wd;
        this.tmp = tmp;
        this.trb = trb;
        this.wind_speed = wind_speed;
        this.wind_direction = wind_direction;
        this.temperature = temperature;
        this.turbulence = turbulence;
        this.validate();
    }

    validate(){
        assert(this.ws != null);
    }

}