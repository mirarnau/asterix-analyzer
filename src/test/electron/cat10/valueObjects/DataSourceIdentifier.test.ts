import {expect, test} from '@jest/globals';
import { DataSourceIdentifier } from '../../../../electron/cat10/valueObjects/DataSourceIdentifier';
import { DataSourceIdentifierMockGenerator } from "../../mocks/DataSourceIdentifierMockGenerator";

test('givenValidValues_WhenCreateDataSourceIdentifier_thenNotNull', () => {
    // Given
    const sac = 0;
    const sic = 7;

    // When
    const dataSouceIdentifier : DataSourceIdentifier = new DataSourceIdentifierMockGenerator().validDataSourceIdentifier();

    //Then
    expect(dataSouceIdentifier.sac).not.toBe(null);
    expect(dataSouceIdentifier.sic).not.toBe(null);
})