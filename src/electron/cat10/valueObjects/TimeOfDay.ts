import { strict as assert } from 'node:assert';

export class TimeOfDay {
    timestamp : string;

    constructor(time : string){
        this.timestamp = time;
        this.validate();
    }

    validate(){
        assert(this.timestamp != null);
    }

}