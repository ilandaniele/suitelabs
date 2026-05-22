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
    
    var getDate = function getDate(timeRange) {
        var date;
        var today = new Date();
        var daysAgo = new Date(today.getTime() - timeRange * 60 * 60 * 1000);
        var minutes = daysAgo.getMinutes();
        if (minutes < 10) {
            minutes = '0' + String(minutes);
        }
        date = (daysAgo.getMonth()+1) + '/' + daysAgo.getDate() + '/' + daysAgo.getFullYear() + ' '+ daysAgo.getHours() + ':' + minutes;
        return date;
    }
    
    var getItemsInfo = function getItemsInfo(itemIds) {
        var items = [];
        var searchColumns = [
            {name: 'internalid'},
            {name: 'custitem_maximum_number_of_units'},
            {name: 'itemid'}
        ];
        
        var searchFilters = [
            ['internalid', 'anyof', itemIds] 
        ];
        
        [nRecord.Type.INVENTORY_ITEM, 
        nRecord.Type.NON_INVENTORY_ITEM, 
        nRecord.Type.ASSEMBLY_ITEM, 
        nSearch.Type.SERVICE_ITEM, 
        nSearch.Type.KIT_ITEM
        ].forEach(function itemTypes(itemType) {
            var itemsSearch = nSearch.create({
                type: itemType,
                filters: searchFilters,
                columns: searchColumns
            });
            
            itemsSearch.run().each(function(result) {
                items.push({
                    id: result.getValue({name: 'internalid'}),
                    name: result.getValue({ name: 'itemid' }),
                    maximumQuantity: result.getValue({ name: 'custitem_maximum_number_of_units' }),
                    quantity: 0
                });
                
                return true;
            });
            
        });

        return items;
    }
    
    var doBeforeSubmit = function doBeforeSubmit(context) {
        var salesOrderRecord = context.newRecord;

        var userId = salesOrderRecord.getValue({
            fieldId: 'entity'
        });

        var numLines = salesOrderRecord.getLineCount({
            sublistId: 'item'
        });
        
        var errorMessage = '';
        
        var timeRange = nRuntime.getCurrentScript().getParameter('custscript_time_lapse');
        var date = getDate(timeRange);
        
        nLog.debug({
            title: 'date',
            details: date
        });
        
        var salesOrderSearch;
        var searchFilters;
        var searchColumns;
        
        var itemIds = [];
        var items = [];
        var i;
        var itemId;
        var index;
       
        try {
            for (i = 0; i < numLines; i++) {
                itemId = salesOrderRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });
                itemIds.push(itemId);
            }

            items = getItemsInfo(itemIds);
            
            searchFilters = [
                ['entity', 'anyof', userId],
                'AND',
                ['datecreated', 'ONORAFTER', date], //Format accepted '2/22/2023 05:00'
                'AND',
                ['item', 'anyof', itemIds]
            ];
                
            searchColumns = [
                'tranid',
                'trandate',
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
            
            salesOrderSearch.run().each(function(result) {
                itemId = result.getValue({
                    name: 'internalid',
                    join: 'item'
                });
                
                nLog.debug({
                    title: 'item id',
                    details: itemId
                });

                for (i = 0; i < items.length; i++){
                    if(items[i].id === itemId) {
                        index = i;
                        break;
                    }
                }
                
                if (items[index]) {
                    items[index].quantity = Number(items[index].quantity) ? Number(items[index].quantity) + Number(result.getValue('quantity')) : Number(result.getValue('quantity'));  
                }

                return true;
            });
            
            for (i = 0; i < items.length; i++) {
                if (Number(items[i].maximumQuantity) <= Number(items[i].quantity)) {
                    errorMessage += 'You have purchased the item: ' + items[i].name + ' more times than you are allowed in ' + timeRange + ' hours <br/>';
                }
            }
            
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
