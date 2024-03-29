import { PresenceObject } from "./PresenceObject";
import { strict as assert } from 'node:assert';

export class Presence {
    [x: string]: any;
    list : PresenceObject[];

    constructor(list : PresenceObject[]){
        this.list = list;
        this.validate();
    }

    validate(){
        assert(this.list != null);
    }

}