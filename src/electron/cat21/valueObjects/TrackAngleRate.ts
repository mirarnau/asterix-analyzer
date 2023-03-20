import { strict as assert } from 'node:assert';

export class TrackAngleRate {
    tar : string;

    constructor(tar : string,){
        this.tar = tar;
        this.validate();
    }

    validate(){
        assert(this.tar != null);
    }

}