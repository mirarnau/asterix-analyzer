import { DataSourceIdentifier } from "../../../electron/cat10/valueObjects/DataSourceIdentifier";

export class DataSourceIdentifierMockGenerator {

    validSac : string = '0';
    validSic : string = '7';

    validDataSourceIdentifier() : DataSourceIdentifier{
        return new DataSourceIdentifier (this.validSac, this.validSic);
    }
    
}