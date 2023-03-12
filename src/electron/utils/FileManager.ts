import {readFile} from 'fs/promises';

export class FileManager {
    
    constructor (){}

    public async readFile(path : string) : Promise<Buffer>{
        const buffer = await readFile(path);
        return buffer;
    }

}