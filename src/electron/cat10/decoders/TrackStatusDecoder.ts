import { TrackStatus } from "../valueObjects/TrackStatus";

export class TrackStatusDecoder{

    public async decode(item : Buffer) : Promise<TrackStatus>{
        const numOctets = item.length;
        const bits = BigInt("0x" + item.toString("hex"))
            .toString(2)
            .padStart(numOctets * 8, "0")
            .split("");

        var cnf = bits[0] === "0" ? "Confirmed track" : "Track in initialisation phase";
        var tre = bits[1] === "0" ? "Default" : "Last report for a track";
        var cst = this.decodeCst(bits);
        var mah = bits[4] === "0" ? "Default" : "Horizontal manoeuvre";
        var tcc = bits[5] === "0"
            ? "Tracking performed in 'Sensor Plane', i.e. neither slant range correction nor projection was applied."
            : "Slant range correction and a suitable projection technique are used to track in a 2D.reference plane, tangential to the earth model at the Sensor Site co-ordinates.";
        var sth = bits[6] === "0" ? "Measured position" : "Smoothed position";

        if (numOctets === 1) {
            return new TrackStatus(cnf, tre, cst, mah, tcc, sth);
        }

        var tom = this.decodeTom(bits);
        var dou = this.decodeDou(bits);
        var mrs = this.decodeMrs(bits);

        if (numOctets === 2){
            return new TrackStatus(cnf, tre, cst, mah, tcc, sth, tom, dou, mrs);
        }

        var gho = bits[16] === "0" ? "Default" : "Ghost track";

        return new TrackStatus(cnf, tre, cst, mah, tcc, sth, tom, dou, mrs, gho);
    }

    private decodeCst(bits : string[]) : string{
        switch (bits.slice(2, 4).join("")) {
            case "00":
                return "No extrapolation";
            case "01":
                return "Predictable extrapolation due to sensor refresh period";
            case "10":
                return "Predictable extrapolation in masked area";
            case "11":
                return "Extrapolation due to unpredictable absence of detection";
        } 
        return "Unknown"
    }

    private decodeTom(bits : string[]) : string{
        switch (bits.slice(8, 10).join("")) {
            case "00":
              return "Unknown type of movement";
            case "01":
              return "Taking-off";
            case "10":
              return "Landing";
            case "11":
              return "Other types of movement";
        } 
        return "Unknown"
    }

    private decodeDou(bits : string[]) : string{
        switch (bits.slice(10, 13).join("")) {
            case "000":
              return "No doubt";
            case "001":
              return "Doubtful correlation (undetermined reason)";
            case "010":
              return "Doubtful correlation in clutter";
            case "011":
              return "Loss of accuracy";
            case "100":
              return "Loss of accuracy in clutter";
            case "101":
              return "Unstable track";
            case "110":
              return "Previously coasted";
        }
        return "Unknown"
    }

    private decodeMrs(bits : string[]) : string{
        switch (bits.slice(13, 15).join("")) {
            case "00":
              return "Merge or split indication undetermined";
            case "01":
              return "Track merged by association to plot";
            case "10":
              return "Track merged by non-association to plot";
            case "11":
              return "Split track";
        }
        return "Unknown"
    }

}