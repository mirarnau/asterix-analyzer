import { strict as assert } from 'node:assert';

export class CalculatedAcceleration {
    ax : number;
    ay : number;

    constructor(ax : number, ay : number){
        this.ax = ax;
        this.ay = ay;
        this.validate();
    }

    validate(){
        assert(this.ax != null);
        assert(this.ay != null);
    }

}