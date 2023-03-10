import { DataSourceIdentifier } from "../valueObjects/DataSourceIdentifier";

export class DataSourceIdentifierDecoder {

    public async decode(item : Buffer) : Promise<DataSourceIdentifier>{
        const sacOctet = item.subarray(0, 1);
        const sac = sacOctet.readInt8().toString();

        const sicOctet = item.subarray(1, 2);
        let sic = sicOctet.readUInt8().toString();
    
        return new DataSourceIdentifier(sac, sic);
    }

}
