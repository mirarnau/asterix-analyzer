export class ServiceIdentificationDecoder {

    public async decode(item: Buffer) : Promise <string>{
        return "0x" + item.toString("hex");
    }
    
}