import { strict as assert } from 'node:assert';

export class DataAges {
    aos : string;
    trd : string;
    m3a : string;
    qi : string;
    tri : string;
    mam : string;
    gh : string;
    fl? : string;
    isa? : string;
    fsa? : string;
    as? : string;
    tas? : string;
    mh? : string;
    bvr? : string;
    gvr? : string;
    gv? : string;
    tar? : string;
    ti? : string;
    ts? : string;
    met? : string;
    roa? : string;
    ara? : string;
    scc? : string;

    constructor(aos : string,
                trd : string,
                m3a : string,
                qi : string,
                tri : string,
                mam : string,
                gh : string,
                fl? : string,
                isa? : string,
                fsa? : string,
                as? : string,
                tas? : string,
                mh? : string,
                bvr? : string,
                gvr? : string,
                gv? : string,
                tar? : string,
                ti? : string,
                ts? : string,
                met? : string,
                roa? : string,
                ara? : string,
                scc? : string){

        this.aos = aos;
        this.trd = trd;
        this.m3a = m3a;
        this.qi = qi;
        this.tri = tri;
        this.mam = mam;
        this.gh = gh;
        this.fl = fl;
        this.isa = isa;
        this.fsa = fsa;
        this.as = as;
        this.tas = tas;
        this.mh = mh;
        this.bvr = bvr;
        this.gvr = gvr;
        this.gv = gv;
        this.tar = tar;
        this.ti = ti;
        this.ts = ts;
        this.met = met;
        this.roa = roa;
        this.ara = ara;
        this.scc = scc;
        this.validate();
    }

    //TODO: Investigate which parameters are actually optional.
    validate(){
        assert(this.aos != null);
    }

}