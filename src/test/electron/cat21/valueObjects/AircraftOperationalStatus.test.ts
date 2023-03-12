import {expect, test} from '@jest/globals';
import {AircraftOperationalStatus} from '../../../../electron/cat21/valueObjects/AircraftOperationalStatus';
import { AircraftOperationalStatusMockGenerator } from '../../mocks_cat21/AircraftOperationalStatusMockGenerator';

test('givenValidValues_WhenCreateAircraftOperationalStatus_thenNotNull', () => {
    // Given

    // When
    const aircraftOperationalStatus : AircraftOperationalStatus = new AircraftOperationalStatusMockGenerator().validAircraaftOperationalStatus();

    //Then
    expect(aircraftOperationalStatus.ra).not.toBe(null);
    expect(aircraftOperationalStatus.tc).not.toBe(null);
    expect(aircraftOperationalStatus.ts).not.toBe(null);
    expect(aircraftOperationalStatus.arv).not.toBe(null);
    expect(aircraftOperationalStatus.cdti).not.toBe(null);
    expect(aircraftOperationalStatus.tcas).not.toBe(null);    
    expect(aircraftOperationalStatus.sa).not.toBe(null);

})