import { AmplitudeOfPrimaryPlot } from "../valueObjects/AmplitudeOfPrimaryPlot";

export class AmplitudeOfPrimaryPlotDecoder {

    public async decode(item : Buffer) : Promise<AmplitudeOfPrimaryPlot>{
        const value = parseInt("0x" + item.toString("hex"));

        return new AmplitudeOfPrimaryPlot(value);
    }
    
}