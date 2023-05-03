import { dialog } from 'electron';
import {readFile} from 'fs/promises';
// import { join } from "path";

export async function openFilePicker() {
    console.log("OPEN FILE PICKER");
  
    const res = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Binary", extensions: ["ast"] }],
    });
  
    if (res.filePaths === undefined) {
      console.log("No file selected");
      return;
    }
  
    const buffer = await readFile(res.filePaths[0]);
  
    return buffer;
  }

  export async function saveFileCsv() {
    const res = await dialog.showSaveDialog({ filters: [{ name: "CSV", extensions: ["csv"] }] });
    return res;
}

export class FileManager {
    
    constructor (){}

    public async readFile(path : string) : Promise<Buffer>{
        const buffer = await readFile(path);
        return buffer;
    }

}

export async function saveFileCsv() {
  const res = await dialog.showSaveDialog({ filters: [{ name: "CSV", extensions: ["csv"] }] });
  return res;
}