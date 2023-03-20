import { strict as assert } from 'node:assert';

export class GeometricHeight {
    geometricHeight : string;

    constructor(geometricHeight : string){
        this.geometricHeight = geometricHeight;
        this.validate();
    }

    validate(){
        assert(this.geometricHeight != null);
    }

}