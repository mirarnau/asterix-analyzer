import { strict as assert } from 'node:assert';

export class TrackNumber {
    value : number;

    constructor(value : number){
        this.value = value;
        this.validate();
    }

    validate(){
        assert(this.value != null);
    }

}