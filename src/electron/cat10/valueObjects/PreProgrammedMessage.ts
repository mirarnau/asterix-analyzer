import { strict as assert } from 'node:assert';

export class PreProgrammedMessage {
    trb : string;
    message : string;

    constructor(trb : string, message : string){
    this.trb = trb;
    this.message = message;
    }

    validate(){
        assert(this.trb != null);
        assert(this.message != null);
    }
    
}