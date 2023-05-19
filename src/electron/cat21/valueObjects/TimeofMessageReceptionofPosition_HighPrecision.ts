import { strict as assert } from 'node:assert';

export class TimeofMessageReceptionofPosition_HighPrecision {
    time : string;

    constructor(time : string){
        this.time = time;
        this.validate();
    }

    validate(){
        assert(this.time != null);
    }

}