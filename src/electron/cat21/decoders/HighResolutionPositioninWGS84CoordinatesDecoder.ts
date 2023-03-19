import { HighResolutionPositioninWGS84Coordinates } from "../valueObjects/HighResolutionPositioninWGS84Coordinates";

export class HighResolutionPositioninWGS84CoordinatesDecoder {

    public async decode(item : Buffer) : Promise<HighResolutionPositioninWGS84Coordinates> {
        try {  
            const latitude_bits = item.subarray(0, 4);
            const longitude_bits = item.subarray(4, 8);
            const latitude = (latitude_bits.readInt32BE() * 180) / Math.pow(2, 30);
            const longitude = (longitude_bits.readInt32BE() * 180) / Math.pow(2, 30);
            
            return new HighResolutionPositioninWGS84Coordinates(latitude, longitude);
        } catch (e) {
            if (e instanceof RangeError) {
              // Output expected ERR_BUFFER_OUT_OF_BOUNDS RangeErrors.
              console.error(e);
            } else {
              // Output unexpected Errors.
              console.error(e, false);
            }
            return new HighResolutionPositioninWGS84Coordinates(0, 0);
          }
        }
        
}