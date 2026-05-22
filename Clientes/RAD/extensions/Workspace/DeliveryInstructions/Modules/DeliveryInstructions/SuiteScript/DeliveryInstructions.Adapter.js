define('DeliveryInstructions.Adapter', [
    'StoreItem.Model',
    'Configuration',
    'SC.Models.Init',
    'LiveOrder.Model',
    'Utils',
    'underscore'
], function DeliveryInstructionsAdapter(
    StoreItem,
    Configuration,
    ModelsInit,
    LiveOrderModel,
    Utils,
    _
) {
    'use strict';

    return {
        integrityCheckOption: function integrityCheckOption(cart, option, isSecureAndLoggedIn) {
            var shippingMethodConfig = _.findWhere(
                Configuration.get('deliveryinstructions.shippingMethods'),
                { internalid: cart.shipmethod && cart.shipmethod.shipmethod }
            );
            var shippingOptionEnabled = shippingMethodConfig && shippingMethodConfig[option];
            var optionConfiguration = Configuration.get('deliveryinstructions')[option];
            var itemId = optionConfiguration.serviceItem + '';
            var canHaveItem = isSecureAndLoggedIn && optionConfiguration.enabled && shippingOptionEnabled;
            var itemsInOrder = _.where(cart.items, { internalid: itemId });

            if (!canHaveItem) {
                _.each(itemsInOrder, function eachItemToDelete(i) {
                    ModelsInit.order.removeItem(i.orderitemid);
                });
            }
        },
        getLiveOrderFields: function getLiveOrderFields() {
            var fieldsToFetch = [
                {
                    items: {
                        internalid: null,
                        orderitemid: null
                    },
                    shipmethod: { 'shipmethod': null }
                }
            ];
            return ModelsInit.order.getFieldValues(fieldsToFetch);
        },
        integrityCheck: function integrityCheck(isSecureAndLoggedIn) {
            var cart = this.getLiveOrderFields();
            this.integrityCheckOption(cart, 'liftGate', isSecureAndLoggedIn);
            this.integrityCheckOption(cart, 'residentialAddress', isSecureAndLoggedIn);
        },
        enforceDeliveryOption: function enforceDeliveryOption(cart, option, needsToBeInOrder) {
            var shippingMethodConfig = _.findWhere(
                Configuration.get('deliveryinstructions.shippingMethods'),
                { internalid: cart.shipmethod && cart.shipmethod.shipmethod }
            );
            var shippingOptionEnabled = shippingMethodConfig && shippingMethodConfig[option];
            var optionConfiguration = Configuration.get('deliveryinstructions')[option];
            var itemId = optionConfiguration.serviceItem + '';
            var needsToHaveItem = needsToBeInOrder[option] && optionConfiguration.enabled && shippingOptionEnabled;
            var itemsInOrder = _.where(cart.items, { internalid: itemId });
            var itemsToDelete;

            if ((!needsToHaveItem && itemsInOrder && itemsInOrder.length) || (needsToHaveItem && itemsInOrder && itemsInOrder.length > 1)) {
                // CASE where there's more than one of the item
                if (needsToBeInOrder && itemsInOrder && itemsInOrder.length > 1) {
                    itemsToDelete = _.rest(itemsInOrder);
                } else {
                    itemsToDelete = itemsInOrder;
                }
                _.each(itemsToDelete, function eachItemToDelete(i) {
                    ModelsInit.order.removeItem(i.orderitemid);
                });
            }

            if (needsToHaveItem && (!itemsInOrder || !itemsInOrder.length)) {
                ModelsInit.order.addItem({
                    // eslint-disable-next-line no-new-wrappers
                    internalid: new String(itemId + '').toString(), // I HATE YOU COMMERCE API
                    quantity: 1
                });
            }
        },
        checkItemsInOrder: function checkItemsInOrder(opts) {
            var cart = this.getLiveOrderFields();
            this.enforceDeliveryOption(cart, 'liftGate', opts);
            this.enforceDeliveryOption(cart, 'residentialAddress', opts);
        },
        adjustHandling: function adjustHandling(liveOrderResponseData) {
            this.adjustHandlingForOption(liveOrderResponseData, 'liftGate');
            this.adjustHandlingForOption(liveOrderResponseData, 'residentialAddress');
            this.adjustHandlingForOption(liveOrderResponseData, 'freight');
        },
        adjustHandlingForOption: function adjustHandlingForOption(transactionData, option) {
            var optionConfiguration = Configuration.get('deliveryinstructions')[option];
            var itemId = optionConfiguration.serviceItem + '';
            var markupId = optionConfiguration.markupItem + '';
            var itemIds = [
                markupId,
                itemId
            ];
            var originalSubtotal = transactionData.summary.subtotal;
            var originalHandling = transactionData.summary.handlingcost;

            var finalSubtotal;
            var finalHandling;

            var itemsInOrder = _.filter(transactionData.lines, function eachLine(l) {
                return l && l.item && l.item.internalid && itemIds.indexOf(l.item.internalid + '') !== -1;
            });

            var optionHandlingTotal = _.reduce(itemsInOrder, function reduceHandling(memo, val) {
                return memo + val.total;
            }, 0);

            finalSubtotal = originalSubtotal - optionHandlingTotal;
            finalHandling = originalHandling + optionHandlingTotal;

            if (itemsInOrder && itemsInOrder.length) {
                transactionData[option] = true;
                _.extend(transactionData.summary, {
                    subtotal: finalSubtotal,
                    subtotal_formatted: Utils.formatCurrency(finalSubtotal),
                    handlingcost: finalHandling,
                    handlingcost_formatted: Utils.formatCurrency(finalHandling)
                });

                transactionData.lines = _.filter(transactionData.lines, function onLine(l) {
                    return !(l && l.item && l.item.internalid && itemIds.indexOf(l.item.internalid + '') !== -1);
                });
            } else {
                transactionData[option] = false;
            }
        },
        recreateConfirmationLines: function recreateConfirmationLines(Model, placedOrder, result) {
            var i;
            var lineItem;
            result.lines = [];
            for (i = 1; i <= placedOrder.getLineItemCount('item'); i++) {
                lineItem = {
                    item: {
                        id: placedOrder.getLineItemValue('item', 'item', i),
                        type: placedOrder.getLineItemValue('item', 'itemtype', i)
                    },
                    quantity: parseInt(placedOrder.getLineItemValue('item', 'quantity', i), 10),
                    rate: parseFloat(placedOrder.getLineItemValue('item', 'rate', i)),
                    options: Model.parseLineOptionsFromSuiteScript(
                        placedOrder.getLineItemValue('item', 'options', i)
                    ),
                    total: Utils.toCurrency(placedOrder.getLineItemValue('item', 'amount', i)),
                    total_formatted: Utils.formatCurrency(
                        placedOrder.getLineItemValue('item', 'amount', i)
                    )
                };

                if (Model.isPickupInStoreEnabled) {
                    if (placedOrder.getLineItemValue('item', 'itemfulfillmentchoice', i) === '1') {
                        lineItem.fulfillmentChoice = 'ship';
                    } else if (
                        placedOrder.getLineItemValue('item', 'itemfulfillmentchoice', i) === '2'
                    ) {
                        lineItem.fulfillmentChoice = 'pickup';
                    }
                }
                result.lines.push(lineItem);
            }

            StoreItem.preloadItems(_(result.lines).pluck('item'));

            _.each(result.lines, function onEachLine(line) {
                // We had to override a full function just for this small detail!
                line.item = StoreItem.get(line.item.id, line.item.type) || { internalid: parseInt(line.item.id, 10), itemtype: line.item.type };
            });
        },
        freightItem: function freightItem(isWhiteGloveOption) {
            var qtyWhiteGloveItems = 0;
            var qtyFreightItems = 0;
            var cartItems = ModelsInit.order.getItems(['internalid', 'quantity', 'custitem46']);
            var maxQuantity = Configuration.get('deliveryinstructions.freight.maxQuantity');
            var freightServiceItem = Configuration.get('deliveryinstructions.freight.serviceItem');
            var freightItems = _.where(cartItems, { internalid: freightServiceItem });
            var freightItemLine;
            var items = _.reject(cartItems, { internalid: freightServiceItem });
            var options = LiveOrderModel.getTransactionBodyField();
            var isWhiteGloveOptionValue = isWhiteGloveOption;
            if (items && items.length > 0) {
                _.each(items, function fnEach(item) {
                    if (item && item.custitem46) {
                        qtyWhiteGloveItems += item.quantity;
                    }
                });
            }
            if (freightItems && freightItems.length > 0) {
                freightItemLine = freightItems[0];
                qtyFreightItems = freightItemLine.quantity;
            }
            if ((isWhiteGloveOption === 'F' || isWhiteGloveOption === true) &&
                qtyWhiteGloveItems > 0 && options.custbody_wg_unchecked && options.custbody_wg_unchecked === 'F') {
                options.custbody_awa_white_glove = 'T';
                isWhiteGloveOptionValue = 'T';
                LiveOrderModel.setTransactionBodyField({ options: options });
            }
            if ((!isWhiteGloveOptionValue || isWhiteGloveOptionValue === 'F') && qtyFreightItems > 0) {
                this.removeFreightItems(freightItems);
            }
            if (isWhiteGloveOptionValue && isWhiteGloveOptionValue === 'T' && qtyFreightItems !== qtyWhiteGloveItems) {
                if (qtyFreightItems > 0) {
                    this.removeFreightItems(freightItems);
                }
                if (qtyWhiteGloveItems > 0) {
                    qtyWhiteGloveItems = qtyWhiteGloveItems < maxQuantity ? qtyWhiteGloveItems : maxQuantity;
                    this.addFreightItems(qtyWhiteGloveItems, freightServiceItem);
                }
            }
        },
        removeFreightItems: function removeFreightItems(freightItems) {
            if (freightItems) {
                _.each(freightItems, function eachItemToDelete(i) {
                    ModelsInit.order.removeItem(i.orderitemid);
                });
            }
        },
        addFreightItems: function addFreightItems(quantity, freightServiceItem) {
            ModelsInit.order.addItem({
                // eslint-disable-next-line no-new-wrappers
                internalid: new String(freightServiceItem + '').toString(),
                quantity: quantity
            });
        }
    };
});
