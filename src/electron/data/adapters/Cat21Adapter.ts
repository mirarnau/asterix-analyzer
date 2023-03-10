export class Cat21Adapter {

    public async adapt(message : Buffer) : Promise<Buffer[]> {
        const fspec = BigInt("0x" + message.subarray(3, 10).toString("hex"))
        .toString(2)
        .padStart(7 * 8, "0")
        .split("");


        console.log("fspec: " + fspec);
    
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

        let len = this.variableItemOffset(message.subarray(offset, offset + 3), 3);

        items.push(message.subarray(offset, offset + await len)); //Target Report Descriptor
        offset += await len;

          /// Track Number
        if (fspec[2] === "1") {
          items.push(message.subarray(offset, offset + 2));
          offset += 2; //length =2
        }

        /// Service Identification
        if (fspec[3] === "1") {
          items.push(message.subarray(offset, offset + 1));
          offset += 1; //length =1
        
        // Aircraft Operational Status
        //if (fspec[40] === "1") {
        //  items.push(message.subarray(offset, offset + 1));
        //  offset += 1; //length =1
        //}
        }
        return items;
  }

    private async variableItemOffset(buffer: Buffer, max_len: number) {
        const bits = BigInt("0x" + buffer.toString("hex"))
          .toString(2)
          .padStart(max_len * 8, "0")
          .split("");
      
        let count = 7;
        let found = false;
        let offset = bits.filter((value, index) => {
          if (index == count && !found) {
            if (value != "1") {
              found = true;
            } else {
              count += 8;
            }
            return true;
          }
          return;
        }).length;
        return offset;
      }

}