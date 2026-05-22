/* globals
    nlapiGetFieldValue,
    nlapiRemoveLineItem,
    nlapiSetLineItemValue,
    nlapiSelectNewLineItem,
    _
*/

var NSeCommApplyEWRItems = (function NSeCommApplyEWRItems() {
    var self = this;
    this.siteId = '2';
    this.isProcessing = false;

    this.getAllItemsInOrder = function getAllItemsInOrder() {
        var allItems = [];
        var numOfItems = nlapiGetLineItemCount('item');
        var itemId;
        var itemLine;
        var i;

        for (i = 1; i <= numOfItems; i++) {
            itemId = nlapiGetLineItemValue('item', 'item', i);

            if (itemId) {
                itemLine = {
                    'quantity': nlapiGetLineItemValue('item', 'quantity', i),
                    'custcol_ewrfee_item_id': nlapiGetLineItemValue('item', 'custcol_ewrfee_item_id', i)
                };

                allItems.push(itemLine);
            }
        }

        return allItems;
    };

    this.removeAllEWRItems = function removeAllEWRItems() {
        var allItems = [];
        var numOfItems = nlapiGetLineItemCount('item');
        var i;
        var isItemFlag;

        for (i = numOfItems; i >= 1; i--) {
            isItemFlag = nlapiGetLineItemValue('item', 'custcol_ewr_item_flag', i);


            if (isItemFlag === 'T') {
                nlapiSelectLineItem('item', i);
                nlapiRemoveLineItem('item', i);
            }
        }

        numOfItems = nlapiGetLineItemCount('item');

        return allItems;
    };

    this.updateItemsWithEWR = function updateItemsWithEWR() {
        var i = 0;
        var isEWR;
        var ewrQty;
        var itemId;
        var quantity;
        var ewrItems;
        var ewrItemsToApply = {};
        var currentItems = this.getAllItemsInOrder();
        var numOfItems = nlapiGetLineItemCount('item');
        var toBeRemovedLines = [];

        _.each(currentItems, function forEachItem(item) {
            var ewrItemId = item.custcol_ewrfee_item_id;

            if (ewrItemId) {
                if (!ewrItemsToApply[ewrItemId]) {
                    ewrItemsToApply[ewrItemId] = parseInt(item.quantity, 10);
                } else {
                    ewrItemsToApply[ewrItemId] += parseInt(item.quantity, 10);
                }
            }
        });

        for (i = 1; i <= numOfItems; i++) {
            isEWR = nlapiGetLineItemValue('item', 'custcol_ewr_item_flag', i);

            if (isEWR === 'T') {
                itemId = nlapiGetLineItemValue('item', 'item', i);
                quantity = nlapiGetLineItemValue('item', 'quantity', i);
                // if in expectedEWRs, check the quantity
                ewrQty = ewrItemsToApply[itemId];

                if (ewrQty && ewrQty === quantity) {
                    delete ewrItemsToApply[itemId];
                } else if (ewrQty && ewrQty !== quantity) {
                    nlapiSetLineItemValue('item', 'quantity', i, ewrQty);

                    delete ewrItemsToApply[itemId];
                } else {
                    toBeRemovedLines.push(i);
                }
            }
        }

        // remove lines
        for (i = toBeRemovedLines.length - 1; i >= 0; i--) {
            nlapiRemoveLineItem('item', toBeRemovedLines[i]);
        }

        // add new lines (to add EWR Fee items)
        ewrItems = _.keys(ewrItemsToApply);

        for (i = 0; i < ewrItems.length; i++) {
            nlapiSelectNewLineItem('item');
            nlapiSetCurrentLineItemValue('item', 'item', ewrItems[i], true, true);
            nlapiSetCurrentLineItemValue('item', 'quantity', ewrItemsToApply[ewrItems[i]], true, true);
            nlapiSetCurrentLineItemValue('item', 'taxcode', -7, true, true); // This means that the item should not be taxable
            nlapiCommitLineItem('item');
            nlapiLogExecution('ERROR', 'entered updateItemsWithEWR ', 'added fee item');
        }
    };

    this.applyEWRinStorePickup = function applyEWRinStorePickup(type, name, context) {
        var state;
        var shipmethod;
        var inStoreShipMethods;
        var inStoreShipMethodSelected;

        if (name === 'shipmethod' || name === 'shipaddress') {
            nlapiLogExecution('ERROR', 'entered applyEWRinStorePickup passed if', 'yes');
            state = nlapiGetFieldValue('shipstate');
            shipmethod = nlapiGetFieldValue('shipmethod');
            inStoreShipMethods = context.getSetting('SCRIPT', 'custscript_instore_pickup_ship_methods');
            inStoreShipMethodSelected = _.contains(inStoreShipMethods.split(','), shipmethod);
            
            nlapiLogExecution('ERROR', 'entered applyEWRinStorePickup inStoreShipMethodSelected', inStoreShipMethodSelected);
            nlapiLogExecution('ERROR', 'entered applyEWRinStorePickup state', state);
            
            if ((state && state === 'CA') || inStoreShipMethodSelected) {
                nlapiLogExecution('ERROR', 'entered updateItemsWithEWR', 'yes');
                this.updateItemsWithEWR();
            } else {
                nlapiLogExecution('ERROR', 'entered removeAllEWRItems', 'yes');
               
                this.removeAllEWRItems();
            }
        }
        
        nlapiLogExecution('ERROR', 'entered applyEWRinStorePickup action', action);
        nlapiLogExecution('ERROR', 'entered applyEWRinStorePickup type', type);
    };

    this.applyEWRstate = function applyEWRstate(type, action, context) {
        var state;
        var shipmethod;
        var inStoreShipMethods;
        var inStoreShipMethodSelected;
        
        if (
            type === 'item' &&
            (action === 'commit' || action === 'remove')
        ) {
            nlapiLogExecution('ERROR', 'entered applyEWRstate passed if', 'yes');
            state = nlapiGetFieldValue('shipstate');
            shipmethod = nlapiGetFieldValue('shipmethod');
            inStoreShipMethods = context.getSetting('SCRIPT', 'custscript_instore_pickup_ship_methods');
            inStoreShipMethodSelected = _.contains(inStoreShipMethods.split(','), shipmethod);
            
            nlapiLogExecution('ERROR', 'entered applyEWRstate state', state);
            nlapiLogExecution('ERROR', 'entered applyEWRstate inStoreShipMethodSelected', inStoreShipMethodSelected);

            if ((state && state === 'CA') || inStoreShipMethodSelected) {
                nlapiLogExecution('ERROR', 'entered updateItemsWithEWR', 'yes');
                this.updateItemsWithEWR();
            } else {
                nlapiLogExecution('ERROR', 'entered removeAllEWRItems', 'yes');
                
                this.removeAllEWRItems();
            }
        }
        nlapiLogExecution('ERROR', 'entered applyEWRstate action', action);
        nlapiLogExecution('ERROR', 'entered applyEWRstate type', type);
    };
    return {
        recalc: function recalc(type, action) {
            var context = nlapiGetContext();
            var executionContext = context.getExecutionContext();
            var website = nlapiGetFieldValue('website');

            if (
                executionContext === 'webstore' &&
                website.toString() === self.siteId &&
                !self.isProcessing
            ) {
                nlapiLogExecution('ERROR', 'entered fee', 'yes');
                self.isProcessing = true;
                self.applyEWRstate(type, action, context);
                self.isProcessing = false;
            }

            return true;
        },

        fieldChange: function fieldChange(type, name) {
            var context = nlapiGetContext();
            var executionContext = context.getExecutionContext();
            var website = nlapiGetFieldValue('website');

            if (
                executionContext === 'webstore' &&
                website.toString() === self.siteId &&
                !self.isProcessing &&
                (name === 'shipmethod' || name === 'shipaddress')
            ) {
                nlapiLogExecution('ERROR', 'entered fee', 'yes');
                self.isProcessing = true;
                self.applyEWRinStorePickup(type, name, context);
                self.isProcessing = false;
            }

            return true;
        }
    };
}());
