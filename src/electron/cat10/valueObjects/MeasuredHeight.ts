import { strict as assert } from 'node:assert';

export class MeasuredHeight {
    height : number;

    constructor(height : number){
        this.height = height;
        this.validate();
    }

    validate(){
        assert(this.height != null);
    }

}