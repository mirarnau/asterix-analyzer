export class TwosComplementToDecimal {

    public static transform(value : string) : number {
        //@ts-ignore
        return ("0b" + value - value[0] * 2 ** value.length);
    }

}