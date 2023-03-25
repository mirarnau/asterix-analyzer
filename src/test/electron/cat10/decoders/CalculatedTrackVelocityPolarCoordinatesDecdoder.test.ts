import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { CalculatedTrackVelocityPolarCoordinates } from '../../../../electron/cat10/valueObjects/CalculatedTrackVelocityPolarCoordinates';


test('givenValidBinaryData_WhenDecodeCalculatedTrackVelocityPolarCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedRho : number = 157.32421875;
    var expectedTheta : number = -54.1790771484375;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var calculatedTrackVelcityPolarCoordinates : CalculatedTrackVelocityPolarCoordinates = (await cat10Adapter.adapt(messageList[2])).calculatedTrackVelocityPolarCoordinates;
   
    //Then
    expect(calculatedTrackVelcityPolarCoordinates).not.toBe(null);
    expect(calculatedTrackVelcityPolarCoordinates.rho).toBe(expectedRho);
    expect(calculatedTrackVelcityPolarCoordinates.theta).toBe(expectedTheta);

})