import { expect, test } from '@jest/globals';
import { FileManager } from "../../../electron/utils/FileManager";

test('givenValidDataFile_WhenClassifyMessages_thenNotNull', async () => {
    // Given
    var fileManager : FileManager = new FileManager();

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_smr.ast');

    //Then
    expect(data).not.toBe(null);
})