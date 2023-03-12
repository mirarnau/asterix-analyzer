import { strict as assert } from 'node:assert';

export class MessageType {
    messageType : string;

    constructor(messageType : string){
        this.messageType = messageType;
        this.validate();
    }

    validate(){
        assert(this.messageType != null);
    }

}