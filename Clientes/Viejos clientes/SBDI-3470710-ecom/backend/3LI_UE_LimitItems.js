/**
  *
  * @NApiVersion 2.x
  * @NScriptType UserEventScript
  */

define([
    'N/record',
    'N/log',
    'N/search',
    'N/runtime'
], function LimitItemsUE(
    nRecord,
    nLog,
    nSearch,
    nRuntime
) {
    'use strict';

    var getErrorMessage = function getErrorMessage(items, timeRange, errorMessageFirstPart, errorMessageSecondPart) {
        var errorMessage = '';
        var i;
        for (i = 0; i < items.length; i++) {
            if (Number(items[i].maximumQuantity) > 0 && Number(items[i].maximumQuantity) < Number(items[i].quantity)) {
                if (errorMessage === '') {
                    errorMessage += errorMessageFirstPart + timeRange + errorMessageSecondPart;
                }
                errorMessage += '<br/>' + items[i].name;
            }
        }
        return errorMessage;
    };

    var getDate = function getDate(timeRange) {
        var date;
        var today = new Date();
        var daysAgo = new Date(today.getTime() - (timeRange * 60 * 60 * 1000));
        var minutes = daysAgo.getMinutes();
        if (minutes < 10) {
            minutes = '0' + String(minutes);
        }
        date = (daysAgo.getMonth() + 1) + '/' + daysAgo.getDate() + '/' + daysAgo.getFullYear() + ' ' + (daysAgo.getHours() + 1) + ':' + minutes;
        return date;
    };

    var getItemsInfo = function getItemsInfo(itemIds, quantities) {
        var items = [];
        var searchColumns = [
            { name: 'internalid' },
            { name: 'custitem_maximum_number_of_units' },
            { name: 'itemid' }
        ];

        var searchFilters = [
            ['internalid', 'anyof', itemIds]
        ];

        var itemsSearch = nSearch.create({
            type: 'item',
            filters: searchFilters,
            columns: searchColumns
        });

        itemsSearch.run().each(function eachItem(result) {
            var i;
            var quantity = 0;
            var maximumQuantity = result.getValue({ name: 'custitem_maximum_number_of_units' }) ?
            result.getValue({ name: 'custitem_maximum_number_of_units' }) : 0;
            for (i = 0; i < quantities.length; i++) {
                if (quantities[i].itemId === result.getValue({ name: 'internalid' })) {
                    quantity = quantities[i].quantity;
                    break;
                }
            }

            items.push({
                id: result.getValue({ name: 'internalid' }),
                name: result.getValue({ name: 'itemid' }),
                maximumQuantity: maximumQuantity,
                quantity: quantity
            });

            return true;
        });


        return items;
    };

    var doBeforeSubmit = function doBeforeSubmit(context) {
        var salesOrderRecord = context.newRecord;

        var userId = salesOrderRecord.getValue({
            fieldId: 'entity'
        });

        var numLines = salesOrderRecord.getLineCount({
            sublistId: 'item'
        });
        var script = nRuntime.getCurrentScript();

        var errorMessage = '';
        var errorMessageFirstPart = script.getParameter('custscript_error_message_first_part');
        var errorMessageSecondPart = script.getParameter('custscript_error_message_second_part');
        var timeRange = script.getParameter('custscript_time_lapse');
        var date = getDate(timeRange);

        var salesOrderSearch;
        var searchFilters;
        var searchColumns;

        var itemIds = [];
        var items = [];
        var i;
        var itemId;
        var index;

        var quantity;
        var quantities = [];

        try {
            for (i = 0; i < numLines; i++) {
                itemId = salesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });
                quantity = salesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });

                if (!quantity) {
                    quantity = 0;
                }

                itemIds.push(itemId);
                quantities.push({
                    itemId: itemId,
                    quantity: quantity
                });
            }
            nLog.debug({
                title: 'quantities',
                details: quantities
            });
            items = getItemsInfo(itemIds, quantities);

            nLog.debug({
                title: 'items',
                details: items
            });

            nLog.debug({
                title: 'date',
                details: date
            });

            searchFilters = [
                ['entity', 'anyof', userId],
                'AND',
                ['datecreated', 'ONORAFTER', date], // Format accepted '2/22/2023 05:00'
                'AND',
                ['item', 'anyof', itemIds]
            ];

            searchColumns = [
                'tranid',
                'datecreated',
                'quantity',
                nSearch.createColumn({
                    name: 'internalid',
                    join: 'item'
                })
            ];

            salesOrderSearch = nSearch.create({
                type: nSearch.Type.SALES_ORDER,
                filters: searchFilters,
                columns: searchColumns
            });

            salesOrderSearch.run().each(function eachSalesOrder(result) {
                nLog.debug({
                    title: 'search sales order',
                    details: result
                });

                nLog.debug({
                    title: 'search sales order transaction date',
                    details: result.getValue('datecreated')
                });

                itemId = result.getValue({
                    name: 'internalid',
                    join: 'item'
                });

                for (i = 0; i < items.length; i++) {
                    if (items[i].id === itemId) {
                        index = i;
                        break;
                    }
                }

                if (items[index]) {
                    items[index].quantity = Number(items[index].quantity) + Number(result.getValue('quantity'));
                }

                return true;
            });

            errorMessage = getErrorMessage(items, timeRange, errorMessageFirstPart, errorMessageSecondPart);

            nLog.debug({
                title: 'error message',
                details: errorMessage
            });
        } catch (e) {
            nLog.error({
                title: 'Errors ',
                details: JSON.stringify(e)
            });
            throw JSON.stringify(e);
        }

        if (errorMessage !== '') {
            throw new Error(errorMessage);
        }
    };

    return {
        beforeSubmit: function beforeSubmit(context) {
            if (context.type === context.UserEventType.CREATE) {
                doBeforeSubmit(context);
            }
            nLog.debug({
                title: 'beforeSubmit',
                details: 'This is executed before submit'
            });
        }
    };
});
