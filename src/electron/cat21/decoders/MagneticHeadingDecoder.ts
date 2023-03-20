import { MagneticHeading } from "../valueObjects/MagneticHeading";

export class MagneticHeadingDecoder {

    public async decode(item : Buffer) : Promise<MagneticHeading> {

       const value = ((parseInt("0x" + item.toString("hex")) * 360) / Math.pow(2, 16)).toString(10) + " deg";
       return new MagneticHeading(value);
    }
    
}