import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";

test('givenValidBinaryData_WhenDecodeDataSourceIdentifier_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();

    // When
    var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');

    //Then
    expect(data).not.toBe(null);
    //TODO first we need the file message classifier

})