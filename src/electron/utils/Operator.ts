export class Operator { 

    public fromTwosComplement(s : string) : string{
        //@ts-ignore
        return "0b" + s - s[0] * 2 ** s.length;
    }

    public getVariableItemOffset(buffer: Buffer, maxLength: number) {
        const bits = BigInt("0x" + buffer.toString("hex"))
          .toString(2)
          .padStart(maxLength * 8, "0")
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