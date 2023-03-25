import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { TimeOfDay } from '../../../../electron/cat10/valueObjects/TimeOfDay';
import { TrackStatus } from '../../../../electron/cat10/valueObjects/TrackStatus';


test('givenValidBinaryData_WhenDecodeTrackStatus_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedCnf : string = "Confirmed track";
    var expectedCst : string = "No extrapolation";
    var expectedMah : string = "Default";
    var expectedSth : string = "Measured position";
    var expectedTcc : string = "Tracking performed in 'Sensor Plane', i.e. neither slant range correction nor projection was applied.";
    var expectedTre : string = "Default";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var trackStatus : TrackStatus = (await cat10Adapter.adapt(messageList[1])).trackStatus;
   
    //Then
    expect(trackStatus).not.toBe(null);
    expect(trackStatus.cnf).toBe(expectedCnf);
    expect(trackStatus.cst).toBe(expectedCst);
    expect(trackStatus.mah).toBe(expectedMah);
    expect(trackStatus.sth).toBe(expectedSth);
    expect(trackStatus.tcc).toBe(expectedTcc);
    expect(trackStatus.tre).toBe(expectedTre);

})