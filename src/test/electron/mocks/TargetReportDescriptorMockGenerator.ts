import { TargetReportDescriptor } from "../../../electron/cat10/valueObjects/TargetReportDescriptor";

export class TargetReportDescriptorMockGenerator {
    validTyp : string = '010';
    validDcr : string = '0';
    validChn : string = '0';
    validGbs : string = '0';
    validCrt : string = '0';
    validSim : string = '0';
    validTst : string = '0';
    validRab : string = '0';
    validLop : string = '00';
    validTot : string = '00';
    validSpi : string = '0';

    validTargetReportDescriptor() : TargetReportDescriptor {
        return new TargetReportDescriptor(
            this.validTyp,
            this.validDcr,
            this.validChn,
            this.validGbs,
            this.validCrt,
            this.validSim,
            this.validTst,
            this.validRab,
            this.validLop,
            this.validTot,
            this.validSpi
        );
    }

}