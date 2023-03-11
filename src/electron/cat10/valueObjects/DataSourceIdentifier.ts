import { strict as assert } from 'node:assert';

export class DataSourceIdentifier {
    sac : string;
    sic : string;

    constructor(sac : string, sic : string ) {
        this.sac = sac;
        this.sic = sic;
        this.validate();
      }

    validate (){
        assert(this.sac != null);
        assert(this.sic != null);
    }

}