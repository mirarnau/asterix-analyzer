import { strict as assert } from 'node:assert';

export class TimeofMessageReceptionofPosition_HighPrecision {
    time : number;

    constructor(time : number){
        this.time = time;
        this.validate();
    }

    validate(){
        assert(this.time != null);
    }

}