export class Cat10Adapter {

    //TODO so far it only reads the DataSourceIdentifier and MessageType
    public async adapt(message : Buffer) : Promise<Buffer[]>{
        const fspec = BigInt("0x" + message.subarray(3, 7).toString("hex"))
            .toString(2)
            .padStart(4 * 8, "0")
            .split("");
    
        let count = 7;
        let found = false;
        let offset = fspec.filter((value, index) => {
            if (index == count && !found) {
                if (value != "1") {
                    found = true;
                } else {
                    count += 8;
                }
                return true;
            }
            return;
            }).length + 3;
        
        var items : any[] = [];
        items.push(message.subarray(offset, offset + 2)); //DataSourceIdentifier
        offset += 2;
        items.push(message.subarray(offset, offset + 1)); //MessageType
        offset += 1;
        return items;
    }

}