import fs from "fs/promises";
import { join } from "path";

export class FileManager {

    public async readFile(file : string) : Promise<Buffer>{
        const buffer = await fs.readFile(join(__dirname.replace("build", "src/electron"), file));
        return buffer;
    }

}