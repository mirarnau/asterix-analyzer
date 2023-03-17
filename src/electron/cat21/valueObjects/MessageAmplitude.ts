import { strict as assert } from 'node:assert';

export class Messagemplitude {
    messageAmplitude : string;

    constructor(messageAmplitude : string){
        this.messageAmplitude = messageAmplitude;
        this.validate();
    }

    validate(){
        assert(this.messageAmplitude != null);
    }

}