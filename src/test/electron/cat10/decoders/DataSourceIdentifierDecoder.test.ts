import {expect, test} from '@jest/globals';
import { DataSourceIdentifier } from '../../../../electron/cat10/valueObjects/DataSourceIdentifier';
import { DataSourceIdentifierMockGenerator } from "../../mocks/DataSourceIdentifierMockGenerator";

test('givenValidValues_WhenDecodeDataSourceIdentifier_thenCorrectValues', () => {
    // Given
    

    // When
    const dataSouceIdentifier : DataSourceIdentifier = new DataSourceIdentifierMockGenerator().validDataSourceIdentifier();

    //Then
    expect(dataSouceIdentifier.sac).not.toBe(null);
    expect(dataSouceIdentifier.sic).not.toBe(null);
})