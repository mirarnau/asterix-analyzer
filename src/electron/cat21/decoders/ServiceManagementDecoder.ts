export class ServiceManagementDecoder {

    public async decode(item: Buffer) : Promise <string>{
        return (parseInt("0x" + item.subarray(0, 1).toString("hex")) * 0.5).toString(10) + " s";
    }

}