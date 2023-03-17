import { strict as assert } from 'node:assert';

export class TrajectoryIntent {
    tis : string;
    tid : string;
    nav? : string;
    nvb? : string;
    rep? : string;
    tca? : string;
    nc? : string;
    tcp_number? : string;
    altitude? : string;
    latitude? : string;
    longitude? : string;
    point_type? : string;
    td? : string;
    tra? : string;
    toa? : string;
    tov? : string;
    ttr? : string;

    constructor(tis : string,
                tid : string,
                nav? : string,
                nvb? : string,
                rep? : string,
                tca? : string,
                nc? : string,
                tcp_number? : string,
                altitude? : string,
                latitude? : string,
                longitude? : string,
                point_type? : string,
                td? : string,
                tra? : string,
                toa? : string,
                tov? : string,
                ttr? : string){

        this.tis = tis;
        this.tid = tid;
        this.nav = nav;
        this.nvb = nvb;
        this.rep = rep;
        this.tca = tca;
        this.nc = nc;
        this.tcp_number = tcp_number;
        this.altitude = altitude;
        this.latitude = latitude;
        this.longitude = longitude;
        this.point_type = point_type;
        this.td = td;
        this.tra = tra;
        this.toa = toa;
        this.tov = tov;
        this.ttr = ttr;
        this.validate();
    }

      //TODO: Investigate which parameters are actually optional.
      validate(){
        assert(this.tis != null);
    }

}