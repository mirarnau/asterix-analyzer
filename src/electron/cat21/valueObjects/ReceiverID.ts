import { strict as assert } from 'node:assert';

export class ReceiverID {
    id : string;

    constructor(id : string){
        this.id = id;
        this.validate();
    }

    validate(){
        assert(this.id != null);
    }

}