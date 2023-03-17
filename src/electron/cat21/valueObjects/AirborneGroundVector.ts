import { strict as assert } from 'node:assert';

export class AirborneGroundVector {
    re : string;
    ground_speed : string;
    track_angle : string;

    constructor(re : string,
                ground_speed : string,
                track_angle : string){
        this.re = re;
        this.ground_speed = ground_speed;
        this.track_angle = track_angle;
        this.validate();
    }

    validate(){
        assert(this.re != null);
    }

}