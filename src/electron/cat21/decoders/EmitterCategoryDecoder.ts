import { EmitterCategory } from "../valueObjects/EmitterCategory";

export class EmitterCategoryDecoder {

    public async decode(item: Buffer) : Promise <EmitterCategory>{
        var res = "";
        switch (item.subarray(0, 1).toString("hex")) {
            case "00":
                res = "No ADS-B Emitter Category Information";
                break;
            case "01":
                res = "Light aircraft <= 15500 lbs";
                break;
            case "02":
                res = "5500 lbs < small aircraft <75000 lbs";
                break;
            case "03":
                res = "75000 lbs < medium a/c < 300000 lbs";
                break;
            case "04":
                res = "High Vortex Large";
                break;
            case "05":
                res = "300000 lbs <= heavy aircraft";
                break;
            case "06":
                res = "Highly manoeuvrable (5g acceleration capability) and high speed (>400 knots cruise)";
                break;
            case "0A":
                res = "Rotocraft";
                break;
            case "0B":
                res = "Glider / sailplane";
                break;
            case "0C":
                res = "Lighter-than-air";
                break;
            case "0D":
                res = "Unmanned aerial vehicle";
                break;
            case "0E":
                res = "Space / transatmospheric vehicle";
                break;
            case "0F":
                res = "Ultralight / handglider / paraglider";
                break;
            case "10":
                res = "Parachutist / skydiver";
                break;
            case "14":
                res = "Surface emergency vehicle";
                break;
            case "15":
                res = "Surface service vehicle";
                break;
            case "16":
                res = "Fixed ground or tethered obstruction";
                break;
            case "17":
                res = "Cluster obstacle";
                break;
            case "18":
                res = "Line obstacle";
                break;
            default:
                res = "Reserved";
        }
        return new EmitterCategory(res);
    }

}