import { strict as assert } from 'node:assert';

export class PositionCartesianCoordinates {
    x : number;
    y : number;

    constructor(x : number, y : number){
        this.x = x;
        this.y = y;
        this.validate();
    }

    validate(){
        assert(this.x != null);
        assert(this.y != null);
    }
    
}