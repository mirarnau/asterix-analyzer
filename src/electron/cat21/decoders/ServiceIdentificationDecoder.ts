export class ServiceIdentificationDecoder {

    public async decode(item: Buffer) : Promise <string>{
        const hexValue = "0x" + item.toString("hex");
        const intValue = parseInt(hexValue, 16);
        return intValue.toString();
    }
    
}