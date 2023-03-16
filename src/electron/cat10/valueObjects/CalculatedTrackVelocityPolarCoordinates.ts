import { strict as assert } from 'node:assert';

export class CalculatedTrackVelocityPolarCoordinates{
    rho : number;
    theta : number;

    constructor(rho : number, theta : number) {
        this.rho = rho;
        this.theta = theta;
        this.validate();
    }

    validate(){
        assert(this.rho != null);
        assert(this.theta != null);
    }

}