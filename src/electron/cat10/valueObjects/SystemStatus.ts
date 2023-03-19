import { strict as assert } from 'node:assert';

export class SystemStatus{
    nogo : string;
    ovl : string;
    tsv : string;
    div : string;
    ttf : string;

    constructor(nogo : string,
                ovl : string,
                tsv : string,
                div : string,
                ttf : string){
    
        this.nogo = nogo;
        this.ovl = ovl;
        this.tsv = tsv;
        this.div = div;
        this.ttf = ttf;
        this.validate();
    }

    validate(){
        assert(this.nogo != null);
        assert(this.ovl != null);
        assert(this.tsv != null);
        assert(this.div != null);
        assert(this.ttf != null);
    }

}