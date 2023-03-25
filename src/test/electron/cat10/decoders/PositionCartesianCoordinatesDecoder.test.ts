import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { PositionCartesianCoordinates } from "../../../../electron/cat10/valueObjects/PositionCartesianCoordinates";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodePositionCartesianCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedX : number = 285;
    var expectedY : number = 1020;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var positionCartesianCoordinates : PositionCartesianCoordinates = (await cat10Adapter.adapt(messageCategoriesList[0])).positionCartesianCoordinates;
   
    //Then
    expect(positionCartesianCoordinates).not.toBe(null);
    expect(positionCartesianCoordinates.x).toBe(expectedX);
    expect(positionCartesianCoordinates.y).toBe(expectedY);

})