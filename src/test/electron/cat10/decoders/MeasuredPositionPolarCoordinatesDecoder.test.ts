import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { MeasuredPositionPolarCoordinates } from '../../../../electron/cat10/valueObjects/MeasuredPositionPolarCoordinates';


test('givenValidBinaryData_WhenDecodeMeasuredPositionPolarCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedRho : number = 1059;
    var expectedTheta : number =  15.62255859375;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messagesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var measuredPositionPolarCoordinates : MeasuredPositionPolarCoordinates = (await cat10Adapter.adapt(messagesList[0])).measuredPositionPolarCoordinates;
   
    //Then
    expect(measuredPositionPolarCoordinates).not.toBe(null);
    expect(measuredPositionPolarCoordinates.rho).toBe(expectedRho);
    expect(measuredPositionPolarCoordinates.theta).toBe(expectedTheta);

})