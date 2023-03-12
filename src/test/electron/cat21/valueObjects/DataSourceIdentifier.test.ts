import {expect, test} from '@jest/globals';
import { DataSourceIdentifier } from '../../../../electron/cat21/valueObjects/DataSourceIdentifier';
import { DataSourceIdentifierMockGenerator } from "../../mocks_cat10/DataSourceIdentifierMockGenerator";

test('givenValidValues_WhenCreateDataSourceIdentifier_thenNotNull', () => {
    // Given

    // When
    const dataSouceIdentifier : DataSourceIdentifier = new DataSourceIdentifierMockGenerator().validDataSourceIdentifier();

    //Then
    expect(dataSouceIdentifier.sac).not.toBe(null);
    expect(dataSouceIdentifier.sic).not.toBe(null);
})