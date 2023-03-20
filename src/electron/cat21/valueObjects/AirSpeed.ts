import { strict as assert } from 'node:assert';

export class AirSpeed {
    im : string;
    value : string | number;

    constructor(im : string,
                value : string | number){
        this.im = im;
        this.value = value;
        this.validate();
    }

    validate(){
        assert(this.im != null);
    }

}