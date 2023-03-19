export class AsyncScheduler {

    operations : any[] = [];
    
    public addOperation(operation : any) : void {
        this.operations.push(operation);
    }

    public async execute() : Promise<void> {
        await Promise.all(this.operations);
    }

}