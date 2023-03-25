import { CalculatedAcceleration } from "../valueObjects/CalculatedAcceleration";

export class CalculatedAccelerationDecoder {
    
    public async decode(item : Buffer) : Promise<CalculatedAcceleration>{
        const ax = item.readIntBE(0, 1) * 0.25;
        const ay = item.readIntBE(1, 1) * 0.25;

        return new CalculatedAcceleration(ax, ay);
    }
    
}