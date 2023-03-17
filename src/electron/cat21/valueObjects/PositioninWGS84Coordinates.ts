import { strict as assert } from 'node:assert';

export class PositioninWGS84Coordinates {
    latitude : number;
    longitude : number;

    constructor(latitude : number,  longitude : number){
        this.latitude = latitude;
        this.longitude = longitude;
        this.validate();
    }

    validate(){
        assert(this.latitude != null);
        assert(this.longitude != null);
    }

}