import { expect, test } from '@jest/globals';
import { FileManager } from "../../../electron/utils/FileManager";

test('givenValidDataFile_WhenClassifyMessages_thenNotNull', async () => {
    // Given
    var fileManager : FileManager = new FileManager();

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');
    //Then
    expect(data).not.toBe(null);
})