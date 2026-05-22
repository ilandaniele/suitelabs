/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

define([
    'N/record',
    'N/log'
], function UpdateNonInventoryItem(
    nRecord,
    nLog
) {
    'use strict';

    var doAfterSubmit = function doAfterSubmit(context) {
        var itemRecord = context.newRecord;
        var itemRecordOld = context.oldRecord;
        var nonInventoryItem;
        var nonInventoryItemInternalId = '';
        var convertedToNonInventory = false;

        var upcCode;
        var displayName;
        var basePrice;
        var itemName;
        var retailPrice;

        var upcCodeOld;
        var displayNameOld;
        var basePriceOld;
        var itemNameOld;
        var lastModified = new Date();
        var retailPriceOld;

        try {
            upcCode = itemRecord.getValue({
                fieldId: 'upccode'
            });

            nLog.debug({
                title: 'upccode',
                details: upcCode
            });

            displayName = itemRecord.getValue({
                fieldId: 'displayname'
            });

            basePrice = itemRecord.getValue({
                fieldId: 'baseprice'
            });

            retailPrice = itemRecord.getSublistValue({
                sublistId: 'price',
                fieldId: 'price_1_',
                line: 0
            });

            itemName = itemRecord.getValue({
                fieldId: 'itemid'
            });

            upcCodeOld = itemRecordOld.getValue({
                fieldId: 'upccode'
            });

            nLog.debug({
                title: 'upccode old',
                details: upcCodeOld
            });

            displayNameOld = itemRecordOld.getValue({
                fieldId: 'displayname'
            });

            basePriceOld = itemRecordOld.getValue({
                fieldId: 'baseprice'
            });

            itemNameOld = itemRecordOld.getValue({
                fieldId: 'itemid'
            });

            // lastModifiedOld = itemRecordOld.getValue({
            //     fieldId: 'custitem_ra_lastmodified'
            // });

            retailPriceOld = itemRecordOld.getSublistValue({
                sublistId: 'price',
                fieldId: 'price_1_',
                line: 0
            });

            convertedToNonInventory = itemRecord.getValue({
                fieldId: 'custitem_converted_to_non_inventory'
            });

            nonInventoryItemInternalId = itemRecord.getValue({
                fieldId: 'custitem_nspos_non_inventory_crtd'
            });

            if (convertedToNonInventory && nonInventoryItemInternalId !== '') {
                if (upcCode !== upcCodeOld ||
                    displayName !== displayNameOld ||
                    basePrice !== basePriceOld ||
                    itemName !== itemNameOld ||
                    retailPrice !== retailPriceOld
                ) {
                    nonInventoryItem = nRecord.load({
                        type: nRecord.Type.NON_INVENTORY_ITEM,
                        id: nonInventoryItemInternalId,
                        isDynamic: true
                    });
                    nonInventoryItem.setValue({
                        fieldId: 'upccode',
                        value: upcCode
                    });

                    nonInventoryItem.setValue({
                        fieldId: 'displayname',
                        value: displayName
                    });

                    nonInventoryItem.setValue({
                        fieldId: 'baseprice',
                        value: basePrice
                    });

                    nonInventoryItem.setValue({
                        fieldId: 'itemid',
                        value: itemName + ' NIS'
                    });

                    nonInventoryItem.setValue({
                        fieldId: 'custitem_ra_lastmodified',
                        value: lastModified
                    });

                    nonInventoryItem.selectLine({
                        sublistId: 'price',
                        line: 0
                    });

                    nonInventoryItem.setCurrentSublistValue({
                        sublistId: 'price',
                        fieldId: 'price_1_',
                        value: retailPrice
                    });

                    nonInventoryItem.commitLine({
                        sublistId: 'price'
                    });

                    nonInventoryItem.save();
                } else {
                    nLog.debug({
                        title: 'NO CHANGES',
                        details: 'Has no changes on non-inventory item associated'
                    });
                }
            } else {
                nLog.debug({
                    title: 'NO NON INVENTORY ITEM',
                    details: 'Has no non-inventory item associated'
                });
            }
        } catch (e) {
            nLog.error({
                title: 'Errors ',
                details: JSON.stringify(e)
            });
            throw JSON.stringify(e);
        }
    };

    return {
        afterSubmit: function afterSubmit(context) {
            if (context.type === context.UserEventType.EDIT) {
                doAfterSubmit(context);
            }
            nLog.debug({
                title: 'afterSubmit',
                details: 'This is executed after submit'
            });
        }
    };
});
