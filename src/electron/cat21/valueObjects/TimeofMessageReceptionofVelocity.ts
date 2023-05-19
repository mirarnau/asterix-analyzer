import { strict as assert } from 'node:assert';

export class TimeofMessageReceptionofVelocity {
    time : string;

    constructor(time : string){
        this.time = time;
        this.validate();
    }

    validate(){
        assert(this.time != null);
    }

}