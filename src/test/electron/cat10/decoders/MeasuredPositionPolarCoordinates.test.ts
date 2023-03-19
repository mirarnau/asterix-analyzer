import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { MeasuredPositionPolarCoordinatesDecoder } from "../../../../electron/cat10/decoders/MeasuredPositionPolarCoordinatesDecoder";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { MeasuredPositionPolarCoordinates } from '../../../../electron/cat10/valueObjects/MeasuredPositionPolarCoordinates';


test('givenValidBinaryData_WhenDecodeMeasuredPositionPolarCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var measuredPositionPolarCoordinatesDecoder : MeasuredPositionPolarCoordinatesDecoder = new MeasuredPositionPolarCoordinatesDecoder();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messagesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat10Adapter.adapt(messagesList[0]);
    var measuredPositionPolarCoordinates : MeasuredPositionPolarCoordinates = await measuredPositionPolarCoordinatesDecoder.decode(listItems[1]);
   
    //Then
    expect(measuredPositionPolarCoordinates).not.toBe(null);
    console.log(measuredPositionPolarCoordinates.rho);
    console.log(measuredPositionPolarCoordinates.theta);

})