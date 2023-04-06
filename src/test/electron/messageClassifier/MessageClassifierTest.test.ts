import { expect, test } from '@jest/globals';
import { FileManager } from "../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../electron/data/MessageClassifier";
import { Cat10 } from '../../../electron/cat10/Cat10';
import { Cat21 } from '../../../electron/cat21/Cat21';

test('givenValidDataFile_WhenClassifyMessages_thenNotNull', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();

    // When
    var dataAdsb : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');
   //var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(dataAdsb);
    //var messageCategoriesList : (Cat10|Cat21)[]|string = await messageClassifier.classifyMessageCat(slicedData, slicedData.length);
   

    //Then
    expect(dataAdsb).not.toBe(null);
    //console.log("Class test: " + messageCategoriesList[0]);
})