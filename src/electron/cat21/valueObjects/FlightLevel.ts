import { strict as assert } from 'node:assert';

export class FlightLevel {
    fligthLevel : string;

    constructor(fligthLevel : string){
        this.fligthLevel = fligthLevel;
        this.validate();
    }

    validate(){
        assert(this.fligthLevel != null);
    }

}