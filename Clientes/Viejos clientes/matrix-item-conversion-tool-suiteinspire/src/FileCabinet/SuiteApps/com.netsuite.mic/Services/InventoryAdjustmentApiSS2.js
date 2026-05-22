/**
 * @NApiVersion 2.x
 */
define([
    'N/record',
    'N/search',
    'N/file',
    'N/log',
    '../Utils/ErrorHandler'
], function InventoryAdjustmentApiSS2(
    record,
    search,
    file,
    log,
    errorHandler
) {
    'use strict';

    var inventoryAdjustmentApi = {
        getAllInventoryAdjustments: function getAllInventoryAdjustments() {
            var inventoryAdjustmentSearch;
            var inventoryAdjustmentData = [];

            try {
                inventoryAdjustmentSearch = search.create({
                    type: 'customrecord_mic_inventory_adjustment',
                    filters: [
                    ],
                    columns: [
                        'custrecord_mic_inventory_adjst_account',
                        'custrecord_mic_inventory_adjst_date',
                        'custrecord_mic_inventory_adjst_period',
                        'custrecord_mic_inventory_adjst_runner',
                        'custrecord_mic_inventory_adjst_datetime',
                        'custrecord_mic_inventory_adjst_status',
                        'custrecord_mic_inventory_adjst_sub',
                        'custrecord_mic_inventory_adjst_record'
                    ]
                }).run();

                inventoryAdjustmentSearch.each(function forEachResult(result) {

                    inventoryAdjustmentData.push({
                        id: result.id,
                        adjustmentAccount: result.getText({ name: 'custrecord_mic_inventory_adjst_account' }),
                        adjustmentPostDate: result.getValue({name: 'custrecord_mic_inventory_adjst_date'}),
                        adjustmentPeriod: result.getText({ name: 'custrecord_mic_inventory_adjst_period' }),
                        adjustmentStatus: result.getValue({ name: 'custrecord_mic_inventory_adjst_status' }),
                        adjustmentDatetime: result.getValue({ name: 'custrecord_mic_inventory_adjst_datetime' }),
                        adjustmentBy: result.getText({ name: 'custrecord_mic_inventory_adjst_runner' }),
                        adjustmentSubsidiary: result.getText({ name: 'custrecord_mic_inventory_adjst_sub' }),
                        inventoryAdjustmentRec: result.getValue({ name: 'custrecord_mic_inventory_adjst_record' })
                    });
                    return true;
                });
                return inventoryAdjustmentData;
            } catch (e) {
                return errorHandler.handleError({
                    code: 'INVENTORYADJUSTMENT_API_ERROR',
                    error: e,
                    line: 'InventoryAdjustmentApi.js/getAllInventoryAdjustments'
                });
            }
        }
    };

    return inventoryAdjustmentApi;
});
