import { strict as assert } from 'node:assert';

export class TimeofMessageReceptionofVelocity {
    time : number;

    constructor(time : number){
        this.time = time;
        this.validate();
    }

    validate(){
        assert(this.time != null);
    }

}