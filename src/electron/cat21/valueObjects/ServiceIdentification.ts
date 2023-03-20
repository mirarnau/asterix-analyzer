import { strict as assert } from 'node:assert';

export class ServiceIdentification {
    serviceIdentification : string;

    constructor(serviceIdentification : string){
        this.serviceIdentification = serviceIdentification;
        this.validate();
    }

    validate(){
        assert(this.serviceIdentification != null);
    }

}