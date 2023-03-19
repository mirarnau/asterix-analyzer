import { strict as assert } from 'node:assert';

export class TimeOfDay {
    timestamp : number;

    constructor(time : number){
        this.timestamp = time;
        this.validate();
    }

    validate(){
        assert(this.timestamp != null);
    }

}