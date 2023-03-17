export class ServiceIdentificationDecoder {

    public async decode(item: Buffer) : Promise <string>{
        const intValue = parseInt("0x" + item.toString("hex"), 16);
        return intValue.toString();
    }
    
}