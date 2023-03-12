import { TargetReportDescriptor } from "../../../electron/cat21/valueObjects/TargetReportDescriptor";

export class TargetReportDescriptorMockGenerator {
    validAtp : string = '1010';
    validArc : string = '1010';
    validRc : string = '1010';
    validRab : string = '010';

    validTargetReportDescriptor() : TargetReportDescriptor {
        return new TargetReportDescriptor(
            this.validAtp,
            this.validArc,
            this.validRc,
            this.validRab
            );
        }
    
    }