/**
 * @NApiVersion 2.x
 */
define([
    'N/record',
    'N/search',
    'N/file',
    'N/log',
    '../Utils/ErrorHandler'
], function MatrixItemConvertApiSS2(
    record,
    search,
    file,
    log,
    errorHandler
) {
    'use strict';

    var matrixItemConvertApi = {
        getAllMatrixItemConversion: function getAllMatrixItemConversion() {
            var matrixConversionSearch;
            var matrixConversionData = [];

            try {
                matrixConversionSearch = search.create({
                    type: 'customrecord_mic_matrix_conversion',
                    filters: [
                        ['isinactive', 'is', false]
                    ],
                    columns: [
                        'custrecord_mic_total_standalone_items',
                        'custrecord_mic_total_matrix_items',
                        'custrecord_mic_matrix_runner',
                        'custrecord_mic_matrix_itemid_delimiter',
                        'custrecord_mic_matrix_converting_time',
                        'custrecord_mic_matrix_convert_status'
                    ]
                }).run();

                matrixConversionSearch.each(function forEachResult(result) {
                    matrixConversionData.push({
                        id: result.id,
                        totalStandaloneItems: result.getValue({ name: 'custrecord_mic_total_standalone_items' }),
                        totalConvertedItems: result.getValue({ name: 'custrecord_mic_total_matrix_items' }),
                        matrixItemidDelimiter: result.getValue({ name: 'custrecord_mic_matrix_itemid_delimiter' }),
                        convertRunner: result.getText({ name: 'custrecord_mic_matrix_runner' }),
                        convertTime: result.getValue({ name: 'custrecord_mic_matrix_converting_time' }),
                        convertStatus: result.getValue({ name: 'custrecord_mic_matrix_convert_status' })
                    });
                    return true;
                });
                log.debug({
                    title: 'getAllMatrixItemConversion result',
                    details: JSON.stringify('matrixConversionData')
                });
                return matrixConversionData;
            } catch (e) {
                return errorHandler.handleError({
                    code: 'MatrixItemConvertApiSS2',
                    error: e,
                    line: 'MatrixItemConvertApiSS2.js/getAllMatrixItemConversion'
                });
            }
        }
    };

    return matrixItemConvertApi;
});
