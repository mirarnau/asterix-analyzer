import { VehicleFleetIdentification } from "../valueObjects/VehicleFleetIdentification";

export class VehicleFleetIdentificationDecoder {

    public async decode(item : Buffer) : Promise<VehicleFleetIdentification>{
        const valueHex = parseInt("0x" + item.toString("hex"));
        const value = this.decodeValue(valueHex);
        return new VehicleFleetIdentification(value);
    }

    private decodeValue(value : number) : string{
        switch (value) {
            case 0:
              return "Unknown";
            case 1:
              return "ATC equipment maintenance";
            case 2:
              return "Airport maintenance";
            case 3:
              return "Fire";
            case 4:
              return "Bird scarer";
            case 5:
              return "Snow plough";
            case 6:
              return "Runway sweeper";
            case 7:
              return "Emergency";
            case 8:
              return "Police";
            case 9:
              return "Bus";
            case 10:
              return "Tug (push/tow)";
            case 11:
              return "Grass cutter";
            case 12:
              return "Fuel";
            case 13:
              return "Baggage";
            case 14:
              return "Catering";
            case 15:
              return "Aircraft maintenance";
            case 16:
              return "Flyco (follow me)";
          }
          return "Unknown";
    }

}