import { strict as assert } from 'node:assert';

export class CalculatedTrackVelocityPolarCoordinates{
    // rho : number;
    // theta : number;
    ground_speed : string;
    track_angle : string;

    constructor(ground_speed : string, track_angle : string) {
        this.ground_speed = ground_speed;
        this.track_angle = track_angle;
        this.validate();
    }

    validate(){
        assert(this.ground_speed != null);
    }

}