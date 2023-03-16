import { strict as assert } from 'node:assert';

export class StandardDeviationOfPosition {
    xComponent : string;
    yComponent : string;
    covariance : string;

    constructor(xComponent : string, yComponent : string, covariance : string){
        this.xComponent = xComponent;
        this.yComponent = yComponent;
        this.covariance = covariance;
    }

    validate(){
        assert(this.xComponent != null);
        assert(this.yComponent != null);
        assert(this.covariance != null);
    }

}