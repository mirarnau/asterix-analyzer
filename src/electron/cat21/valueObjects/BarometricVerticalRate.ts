import { strict as assert } from 'node:assert';

export class BarometricVerticalRate {
    re : string;
    value : string;

    constructor(re : string,
                value : string,){
        this.re = re;
        this.value = value;
        this.validate();
    }

    validate(){
        assert(this.re != null);
    }

}