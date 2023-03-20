import { ServiceIdentification } from "../valueObjects/ServiceIdentification";

export class ServiceIdentificationDecoder {

    public async decode(item: Buffer) : Promise <ServiceIdentification>{
        const intValue = parseInt("0x" + item.toString("hex"), 16);
        return new ServiceIdentification(intValue.toString());
    }
    
}