import { strict as assert } from 'node:assert';

export class Mode3ACodeOctalRepresentation {
    v : string;
    g : string;
    l : string;
    mode : string;

    constructor(v : string, g : string, l: string, reply : string){
        this.v = v;
        this.g = g;
        this.l = l;
        this.mode = reply;
        this.validate();
    }

    validate(){
        assert(this.v != null);
        assert(this.g != null);
        assert(this.l != null);
        assert(this.mode != null);
    }

}