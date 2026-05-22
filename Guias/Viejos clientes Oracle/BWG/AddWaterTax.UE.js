/**
 * @NApiVersion 2.X
 * @NScriptType UserEventScript
 */
define([
    'N/record',
    'N/log',
    'N/format',
    'N/search',
    'N/runtime'
], function AddWaterTaxUE(
    nRecord,
    nLog,
    nFormat,
    nSearch,
    nRuntime
) {
    'use strict';

    var doBeforeSubmit = function doBeforeSubmit(context) {
        var scriptWaterTaxCode = nRuntime.getCurrentScript().getParameter('custscript_water_tax_code'); // 'IL_Cook_Chicago - BOTTLED WATER'
        var scriptMarkUpItemID = nRuntime.getCurrentScript().getParameter('custscript_markup_item_id'); // 11835


        var waterTaxTotal = 0;
        var numLines = 0;
        var i = 0;
        var productName;
        var productQuantity = 0;
        var waterTaxCode;
        var waterTaxAmount = 0;
        var waterTaxAmountFormatted = 0.0;
        var customerIsWaterTaxExempt = false;
        var productId;
        var fieldLookUp;

        var salesOrderRecord = context.newRecord;


        // var salesOrder = nRecord.load({
        //     type: nRecord.Type.SALES_ORDER,
        //     id: salesOrderRecord.id,
        //     isDynamic: true
        // });

        salesOrderRecord.selectLine({
            sublistId: 'item',
            line: 0
        });


        customerIsWaterTaxExempt = salesOrderRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_customer_is_water_tax_exempt'
        });

        nLog.debug({
            title: 'customer is water tax exempt',
            details: customerIsWaterTaxExempt
        });


        if (!customerIsWaterTaxExempt) {
            numLines = salesOrderRecord.getLineCount({
                sublistId: 'item'
            });

            for (i = 0; i < numLines; i++) {
                salesOrderRecord.selectLine({
                    sublistId: 'item',
                    line: i
                });

                productName = salesOrderRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item'
                });

                productQuantity = salesOrderRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity'
                });


                nLog.debug({
                    title: 'product name',
                    details: productName
                });

                waterTaxCode = salesOrderRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_water_tax_code'
                });

                nLog.debug({
                    title: 'product water tax code',
                    details: waterTaxCode
                });

                if (waterTaxCode === scriptWaterTaxCode) {
                    waterTaxAmount = salesOrderRecord.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_water_tax_amount'
                    });

                    waterTaxAmountFormatted = nFormat.parse({
                        value: waterTaxAmount,
                        type: nFormat.Type.FLOAT
                    });

                    nLog.debug({
                        title: 'product water tax amount',
                        details: waterTaxAmount
                    });

                    productId = salesOrderRecord.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item'
                    });

                    fieldLookUp = nSearch.lookupFields({
                        type: nSearch.Type.INVENTORY_ITEM,
                        id: productId,
                        columns: [
                            'saleunit',
                            'custitem_bwg_item_pack',
                            'custitem_bwg_buying_master_pack',
                            'custitem_bwg_vendor_case_ti',
                            'custitem_bwg_vendor_case_hi'
                        ]
                    });


                    if (fieldLookUp.saleunit[0].text === 'Each') {
                        waterTaxTotal += productQuantity
                        * waterTaxAmountFormatted;
                    } else if (fieldLookUp.saleunit[0].text === 'Case') {
                        waterTaxTotal += productQuantity
                    * waterTaxAmountFormatted
                    * fieldLookUp.custitem_bwg_item_pack;
                    } else if (fieldLookUp.saleunit[0].text === 'Master Case') {
                        waterTaxTotal += productQuantity
                    * waterTaxAmountFormatted
                    * fieldLookUp.custitem_bwg_item_pack
                    * fieldLookUp.custitem_bwg_buying_master_pack;
                    } else if (fieldLookUp.saleunit[0].text === 'Pallet Layer') {
                        waterTaxTotal += productQuantity
                    * waterTaxAmountFormatted
                    * fieldLookUp.custitem_bwg_item_pack
                    * fieldLookUp.custitem_bwg_buying_master_pack
                    * fieldLookUp.custitem_bwg_vendor_case_ti;
                    } else if (fieldLookUp.saleunit[0].text === 'Pallet') {
                        waterTaxTotal += productQuantity
                    * waterTaxAmountFormatted
                    * fieldLookUp.custitem_bwg_item_pack
                    * fieldLookUp.custitem_bwg_buying_master_pack
                    * fieldLookUp.custitem_bwg_vendor_case_ti
                    * fieldLookUp.custitem_bwg_vendor_case_hi;
                    }

                    nLog.debug({
                        title: 'custom product fields',
                        details: fieldLookUp
                    });
                }
            }

            nLog.debug({
                title: 'Water Tax Total',
                details: waterTaxTotal
            });


            if (waterTaxTotal > 0) {
                salesOrderRecord.selectNewLine({
                    sublistId: 'item'
                });

                salesOrderRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: scriptMarkUpItemID
                });

                salesOrderRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'price',
                    value: '-1'
                });

                salesOrderRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    value: waterTaxTotal
                });

                salesOrderRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: waterTaxTotal
                });

                salesOrderRecord.commitLine({
                    sublistId: 'item'
                });

                salesOrderRecord.save({
                    ignoreMandatoryFields: true
                });
            }
        }
    };

    return {
        beforeSubmit: function beforeSubmit(context) {
            if (context.type === context.UserEventType.CREATE) {
                doBeforeSubmit(context);
            }
            nLog.debug({
                title: 'beforeSubmit',
                details: 'Executed before submit'
            });
        }
    };
});
