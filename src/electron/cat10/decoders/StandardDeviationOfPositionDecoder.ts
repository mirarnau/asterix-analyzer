import { StandardDeviationOfPosition } from "../valueObjects/StandardDeviationOfPosition";

export class StandardDeviationOfPositionDecoder {

    public async decode(item : Buffer) : Promise<StandardDeviationOfPosition>{
        var xComponent = (parseInt("0x" + item.subarray(0, 1).toString("hex")) * 0.25).toString(10) + " m";
        var yComponent = (parseInt("0x" + item.subarray(1, 2).toString("hex")) * 0.25).toString(10) + " m";
        var covariance = (item.subarray(2, 4).readInt16BE() * 0.25).toString(10) + " m";

        return new StandardDeviationOfPosition(xComponent, yComponent, covariance);
    }
    
}