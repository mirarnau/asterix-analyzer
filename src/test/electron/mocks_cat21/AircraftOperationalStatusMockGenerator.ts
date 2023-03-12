import { AircraftOperationalStatus } from "../../../electron/cat21/valueObjects/AircraftOperationalStatus";

export class AircraftOperationalStatusMockGenerator {
    validRa : string = '010';
    validTc : string = '0';
    validTs : string = '0';
    validArv : string = '0';
    validCdti : string = '0';
    validTcas : string = '0';
    validSa : string = '0';

    validAircraaftOperationalStatus() : AircraftOperationalStatus {
        return new AircraftOperationalStatus(
            this.validRa,
            this.validTc,
            this.validTs,
            this.validArv,
            this.validCdti,
            this.validTcas,
            this.validSa
        );
    }

}
