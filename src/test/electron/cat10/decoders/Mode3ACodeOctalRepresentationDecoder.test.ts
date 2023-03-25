import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Mode3ACodeOctalRepresentation } from "../../../../electron/cat10/valueObjects/Mode3ACodeOctalRepresentation";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodePositionCartesianCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedV : string = "Code validated";
    var expectedG : string = "Default";
    var expectedL : string = "Mode-3/A code derived from the reply of the transponder";
    var expectedMode : string = "0475";


    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var mode3ACodeOctalRepresentation : Mode3ACodeOctalRepresentation = (await cat10Adapter.adapt(messageCategoriesList[2])).mode3ACodeOctalRepresentation;
   
    //Then
    expect(mode3ACodeOctalRepresentation).not.toBe(null);
    expect(mode3ACodeOctalRepresentation.v).toBe(expectedV);
    expect(mode3ACodeOctalRepresentation.g).toBe(expectedG);
    expect(mode3ACodeOctalRepresentation.l).toBe(expectedL);
    expect(mode3ACodeOctalRepresentation.mode).toBe(expectedMode);

})