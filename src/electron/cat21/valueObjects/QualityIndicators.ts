import { strict as assert } from 'node:assert';

export class QualityIndicators {
    nucr_or_nacv : string;
    nucp_or_nic : string;
    nicbaro? : string;
    sil? : string;
    nacp? : string;
    second_sil? : string;
    sda? : string;
    gva? : string;
    pic? : string;

    constructor(nucr_or_nacv : string,
                nucp_or_nic : string,
                nicbaro? : string,
                sil? : string,
                nacp? : string,
                second_sil? : string,
                sda? : string,
                gva? : string,
                pic? : string){
        
        this.nucr_or_nacv = nucr_or_nacv;
        this.nucp_or_nic = nucp_or_nic;
        this.nicbaro = nicbaro;
        this.sil = sil;
        this.nacp = nacp;
        this.second_sil = second_sil;
        this.sda = sda;
        this.gva = gva;
        this.pic = pic;
        this.validate();
    
    }

      //TODO: Investigate which parameters are actually optional.
      validate(){
        assert(this.nucr_or_nacv != null);
    }

}