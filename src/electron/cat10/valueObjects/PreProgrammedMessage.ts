import { strict as assert } from 'node:assert';

export class PreProgrammedMessage {
    trb : string;
    data : string;

    constructor(trb : string, data : string){
    this.trb = trb;
    this.data = data;
    }

    validate(){
        assert(this.trb != null);
        assert(this.data != null);
    }
    
}