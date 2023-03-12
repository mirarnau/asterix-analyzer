export class EmitterCategoryDecoder {

    public async decode(item: Buffer) : Promise <string>{
        switch (item.subarray(0, 1).toString("hex")) {
            case "00":
                return "No ADS-B Emitter Category Information";
            case "01":
                return "Light aircraft <= 15500 lbs";
            case "02":
                return "5500 lbs < small aircraft <75000 lbs";
            case "03":
                return "75000 lbs < medium a/c < 300000 lbs";
            case "04":
                return "High Vortex Large";
            case "05":
                return "300000 lbs <= heavy aircraft";
            case "06":
                return "Highly manoeuvrable (5g acceleration capability) and high speed (>400 knots cruise)";
            case "0A":
                return "Rotocraft";
            case "0B":
                return "Glider / sailplane";
            case "0C":
                return "Lighter-than-air";
            case "0D":
                return "Unmanned aerial vehicle";
            case "0E":
                return "Space / transatmospheric vehicle";
            case "0F":
                return "Ultralight / handglider / paraglider";
            case "10":
                return "Parachutist / skydiver";
            case "14":
                return "Surface emergency vehicle";
            case "15":
                return "Surface service vehicle";
            case "16":
                return "Fixed ground or tethered obstruction";
            case "17":
                return "Cluster obstacle";
            case "18":
                return "Line obstacle";
            default:
                return "Reserved";
        }
    }

}