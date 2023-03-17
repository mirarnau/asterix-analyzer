import { ServiceManagement } from "../valueObjects/ServiceManagement";

export class ServiceManagementDecoder {

    public async decode(item: Buffer) : Promise <ServiceManagement>{
        return new ServiceManagement((parseInt("0x" + item.subarray(0, 1).toString("hex")) * 0.5).toString(10) + " s");
    }

}