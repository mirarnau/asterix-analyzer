import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { GeometricHeight } from '../../../../electron/cat21/valueObjects/GeometricHeight';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";


test('givenValidBinaryData_WhenDecodeGeometricHeight_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedGh : string = "13000 ft";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var geometricHeight : GeometricHeight = (await (cat21Adapter.adapt(messageCategoriesList[0]))).geometricHeight;
   
    //Then    
    
    console.log("Geometric Height: " + geometricHeight.geometricHeight);
    expect(geometricHeight.geometricHeight).not.toBe(null);
    expect(geometricHeight.geometricHeight).toBe(expectedGh);

})