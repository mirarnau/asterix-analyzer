import { strict as assert } from 'node:assert';

export class Mode3ACodeOctalRepresentation {
    code : string;

    constructor(code : string){
        this.code = code;
        this.validate();
    }

    validate(){
        assert(this.code != null);
    }

}