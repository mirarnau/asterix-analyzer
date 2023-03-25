import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { CalculatedTrackVelocityCartesianCoordinates } from '../../../../electron/cat10/valueObjects/CalculatedTrackVelocityCartesianCoordinates';


test('givenValidBinaryData_WhenDecodeCalculatedTrackVelocityCartesianCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedX : number = -35.5;
    var expectedY : number = -72.5;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var calculatedTrackVelcityCartesianCoordinates : CalculatedTrackVelocityCartesianCoordinates = (await cat10Adapter.adapt(messageList[2])).calculatedTrackVelocityCartesianCoordinates;
   
    //Then
    expect(calculatedTrackVelcityCartesianCoordinates).not.toBe(null);
    expect(calculatedTrackVelcityCartesianCoordinates.x).toBe(expectedX);
    expect(calculatedTrackVelcityCartesianCoordinates.y).toBe(expectedY);

})