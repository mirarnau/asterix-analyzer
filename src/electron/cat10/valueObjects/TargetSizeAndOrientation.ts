export class TargetSizeAndOrientation {
    length : string;
    orientation? : string;
    width? : string;

    constructor(length : string, orientation? : string, width? : string){
        this.length = length;
        this.orientation = orientation;
        this.width = width;
    }

}