import { strict as assert } from 'node:assert';

export class DataAges {
    aos : string | number;
    trd : string | number;
    m3a : string | number;
    qi : string | number;
    tri : string | number;
    mam : string | number;
    gh : string | number;
    fl : string | number;
    isa : string | number;
    fsa : string | number;
    as : string | number;
    tas : string | number;
    mh : string | number;
    bvr : string | number;
    gvr : string | number;
    gv : string | number;
    tar : string | number;
    ti : string | number;
    ts : string | number;
    met : string | number;
    roa : string | number;
    ara : string | number;
    scc : string | number;

    constructor(aos : string | number,
                trd : string | number,
                m3a : string | number,
                qi : string | number,
                tri : string | number,
                mam : string | number,
                gh : string | number,
                fl : string | number,
                isa : string | number,
                fsa : string | number,
                as : string | number,
                tas : string | number,
                mh : string | number,
                bvr : string | number,
                gvr : string | number,
                gv : string | number,
                tar : string | number,
                ti : string | number,
                ts : string | number,
                met : string | number,
                roa : string | number,
                ara : string | number,
                scc : string | number){

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