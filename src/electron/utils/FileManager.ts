import { dialog } from 'electron';
import {readFile} from 'fs/promises';

export class FileManager {
    
    constructor (){}

    public async readFile(path : string) : Promise<Buffer>{
        const buffer = await readFile(path);
        return buffer;
    }
    public async saveFileCsv() {
        const res = await dialog.showSaveDialog({ filters: [{ name: "CSV", extensions: ["csv"] }] });
        return res;
    }

}