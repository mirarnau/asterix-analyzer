import { TargetSizeAndOrientation } from "../valueObjects/TargetSizeAndOrientation";

export class TargetSizeAndOrientationDecoder{

    public async decode(item : Buffer) : Promise<TargetSizeAndOrientation>{
        var length =
            parseInt(
                BigInt("0x" + item.subarray(0, 1).toString("hex"))
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .slice(0, 7)
                    .join(""),2
            ).toString(10) + " m";
        
        if (item.length == 1){
            return new TargetSizeAndOrientation(length);
        }

        var orientation =
            (
                (parseInt(
                    BigInt("0x" + item.subarray(1, 2).toString("hex"))
                        .toString(2)
                        .padStart(8, "0")
                        .split("")
                        .slice(0, 7)
                        .join(""),2) * 360) / 128

            ).toString(10) + " deg";
        
        if (item.length == 2){
            return new TargetSizeAndOrientation(length, orientation);
        }

        var width =
            parseInt(
                BigInt("0x" + item.subarray(2, 3).toString("hex"))
                    .toString(2)
                    .padStart(8, "0")
                    .split("")
                    .slice(0, 7)
                    .join(""),
            ).toString(10) + " m";

        return new TargetSizeAndOrientation(length, orientation, width);
    }

}