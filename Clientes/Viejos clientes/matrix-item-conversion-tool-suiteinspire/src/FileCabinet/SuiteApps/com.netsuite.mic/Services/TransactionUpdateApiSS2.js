/**
 * @NApiVersion 2.x
 */
define([
    'N/record',
    'N/search',
    'N/file',
    'N/log',
    '../Utils/ErrorHandler'
], function TransactionUpdateApiSS2(
    record,
    search,
    file,
    log,
    errorHandler
) {
    'use strict';

    var transactionUpdateApi = {
        getAllTransactionUpdate: function getAllTransactionUpdate() {
            var transactionUpdateSearch;
            var transactionUpdateData = [];

            try {
                transactionUpdateSearch = search.create({
                    type: 'customrecord_mic_transction_update',
                    filters: [
                        ['isinactive', 'is', false]
                    ],
                    columns: [
                        // 'custrecord_mic_total_standalone_items',
                        'custrecord_mic_total_transactions',
                        'custrecord_mic_transaction_runner',
                        // 'custrecord_mic_transaction_itemid_delimiter',
                        'custrecord_mic_transaction_updating_time',
                        'custrecord_mic_transaction_update_status'
                    ]
                }).run();

                transactionUpdateSearch.each(function forEachResult(result) {
                    transactionUpdateData.push({
                        id: result.id,
                        // totalStandaloneItems: result.getValue({ name: 'custrecord_mic_total_standalone_items' }),
                        totalUpdatedTranactions: result.getValue({ name: 'custrecord_mic_total_transactions' }),
                        // matrixItemidDelimiter: result.getValue({ name: 'custrecord_mic_transaction_itemid_delimiter' }),
                        updateRunner: result.getText({ name: 'custrecord_mic_transaction_runner' }),
                        updateTime: result.getValue({ name: 'custrecord_mic_transaction_updating_time' }),
                        updateStatus: result.getValue({ name: 'custrecord_mic_transaction_update_status' })
                    });
                    return true;
                });
                log.debug({
                    title: 'getAllTransactionUpdate result',
                    details: JSON.stringify('transactionUpdateData')
                });
                return transactionUpdateData;
            } catch (e) {
                return errorHandler.handleError({
                    code: 'TransactionUpdateApiSS2',
                    error: e,
                    line: 'TransactionUpdateApiSS2.js/getAllTransactionUpdate'
                });
            }
        }
    };

    return transactionUpdateApi;
});
