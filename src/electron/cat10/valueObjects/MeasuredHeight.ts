import { strict as assert } from 'node:assert';

export class MeasuredHeight {
    height : string;

    constructor(height : string){
        this.height = height;
        this.validate();
    }

    validate(){
        assert(this.height != null);
    }

}