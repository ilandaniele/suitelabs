define('AwaLabs.Jewelry', [
    'Application',
    'Jewelry.Utils',
    'Utils',
    'Configuration',
    'LiveOrder.Model',
    'Profile.Model',
    'bignumber',
    'underscore',
    'Jewelry.LiveOrder.ServiceController'
], function AwaLabsJewelry(
    Application,
    JewelryUtils,
    Utils,
    Configuration,
    LiveOrderModel,
    Profile,
    BigNumber,
    _
) {
    'use strict';

    var cart = Application.getComponent('Cart');

    Application.on('after:LiveOrder.submit', function afterLiveOrderSubmit(model, result) {
        var actions;

        try {
            result.summary.totalSubtotal = result.summary.subtotal;

            actions = JewelryUtils.getActionsTransaction(result.lines, false, false, 'after:LiveOrder.submit');
            if (actions.thereIsJewelry) {
                result.summary.itemcount -= actions.jewelryCount;

                result.summary.subtotal = parseFloat(context.getSessionObject('jewelrySubtotal'), 10);
                result.summary.subtotal_formatted = Utils.formatCurrency(result.summary.subtotal);

                result.summary.discountedsubtotal = context.getSessionObject('jewelryDiscountedSubtotal');
                result.summary.discountedsubtotal_formatted = Utils.formatCurrency(result.summary.discountedsubtotal);
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'error', e);
        }
        return result;
    });

    Application.on('after:LiveOrder.get', function afterLiveOrderGet(model, result) {
        var lines = result.lines;
        var actions = JewelryUtils.getActionsTransaction(lines, false, false, 'after:LiveOrder.get');
        var subtotal = new BigNumber(result.summary.subtotal);
        var discountedsubtotal = new BigNumber(result.summary.discountedsubtotal);

        result.summary.totalSubtotal = result.summary.subtotal;
        // Remove the flat item line and add jewelry summary cost
        if (actions.thereIsFlatRateLine) {
            result.lines = _.filter(lines, function filterLines(line) {
                return line.internalid !== actions.flatRateLine.internalid;
            });
            result.summary.itemcount -= 1;

            subtotal = subtotal.minus(actions.flatRateLineAmount);
            result.summary.subtotal = parseFloat(subtotal.toFixed(), 10);
            result.summary.subtotal_formatted = Utils.formatCurrency(result.summary.subtotal);
            discountedsubtotal = discountedsubtotal.minus(actions.flatRateLineAmount);
            result.summary.discountedsubtotal = discountedsubtotal.toFixed();
            result.summary.discountedsubtotal_formatted = Utils.formatCurrency(result.summary.discountedsubtotal);
        }
        if (actions.thereIsJewelry) {
            result.summary.itemcount -= actions.jewelryCount;
            subtotal = subtotal.minus(actions.jewelrySubtotal);
            result.summary.subtotal = parseFloat(subtotal.toFixed(), 10);
            result.summary.subtotal_formatted = Utils.formatCurrency(result.summary.subtotal);

            discountedsubtotal = discountedsubtotal.minus(actions.jewelrySubtotal);
            result.summary.discountedsubtotal = discountedsubtotal.toFixed();
            result.summary.discountedsubtotal_formatted = Utils.formatCurrency(result.summary.discountedsubtotal);
            context.setSessionObject('jewelrySubtotal', result.summary.subtotal);
            context.setSessionObject('jewelryDiscountedSubtotal', result.summary.discountedsubtotal);
        }

        // If there is only jewelry items and the shopper is a trade customer, filter shipmethods
        if (result.summary.itemcount === 0 && Profile.get().isTrade) {
            result.shipmethods = _.filter(result.shipmethods, function filterShipmethod(shipmethd) {
                var founded = shipmethd.internalid === Configuration.get('jewelry.defaultShipmethod');
                if (shipmethd.rate === 0) {
                    shipmethd.rate_formatted = Configuration.get('jewelry.defaultShipmethodNoChargeMessage') ?
                        Configuration.get('jewelry.defaultShipmethodNoChargeMessage') : 'No Charge';
                }
                return founded;
            });
        }
        result.summary.jewelry = {
            active: actions.thereIsJewelry && actions.thereIsFlatRateLine && !!actions.flatRateLineAmount,
            flatrate: actions.flatRateLineAmount,
            flatrate_formatted: actions.flatRateLineAmountFormatted,
            text: Configuration.get('jewelry.linetext'),
            jewelry_count: actions.jewelryCount,
            jewelry_subtotal: actions.jewelrySubtotal,
            jewelry_subtotal_formatted: actions.jewelrySubtotalFormatted,
            jewelry_subtotal_retail: actions.jewelrySubtotalRetail,
            jewelry_subtotal_formatted_retail: actions.jewelrySubtotalRetailFormatted
        };
    });

    Application.on('before:LiveOrder.get', function beforeLiveOrderGet(model) {
        // Online exclude lines inside the checkout
        var excludeLines = model.isSecure && session.isLoggedIn2();
        var actions = JewelryUtils.getActionsLiveOrder(excludeLines, false, 'before:LiveOrder.get');
        var updateShippingMethodsCost = false;
        // Compare the shipping cost in the summary with the shipping listed
        // if they are diferent add remove dummy line to fix the the shipping methods cost
        var orderFields = model.getFieldValues();
        var summary = orderFields.summary;
        var shipmethods = model.getShipMethods(orderFields);
        var shipmethod = orderFields.shipmethod ? orderFields.shipmethod.shipmethod : null;

        var currentShipmethod = shipmethod && _.find(shipmethods, function findShipmethod(sm) {
            return sm.internalid === shipmethod;
        });
        if (actions.thereIsJewelry && ((!currentShipmethod) || (!!currentShipmethod && currentShipmethod.rate !== summary.shippingcost))) {
            updateShippingMethodsCost = true;
        }
        if (excludeLines && updateShippingMethodsCost) {
            if (actions.thereIsFlatRateLine && !!actions.flatRateLine && !!actions.flatRateLine.internalid) {
                order.removeItem(actions.flatRateLine.internalid);
            }

            order.addItem({
                internalid: Configuration.get('jewelry.serviceitemid').toString(),
                quantity: 1,
                options: {}
            });

            if (!actions.thereIsFlatRateLine && actions.flatRateLine) {
                order.removeItem(actions.flatRateLine.internalid);
            }
        }
    });

    Application.on('after:LiveOrder.addLine', function afterProfileGet() {
        var actions = JewelryUtils.getActionsLiveOrder();
        if (actions.thereIsJewelry && !actions.thereIsFlatRateLine) {
            order.addItem({
                internalid: Configuration.get('jewelry.serviceitemid').toString(),
                quantity: 1,
                options: {}
            });
        }
    });

    Application.on('after:LiveOrder.addLines', function afterProfileGet() {
        // Get dynamic config
        var actions = JewelryUtils.getActionsLiveOrder();
        if (actions.thereIsJewelry && !actions.thereIsFlatRateLine) {
            order.addItem({
                internalid: Configuration.get('jewelry.serviceitemid').toString(),
                quantity: 1,
                options: {}
            });
        }
    });

    cart.on('afterRemoveLine', function afterProfileGet() {
        // Get dynamic config
        var actions = JewelryUtils.getActionsLiveOrder();
        if (!actions.thereIsJewelry && actions.thereIsFlatRateLine) {
            LiveOrderModel.removeLine(actions.flatRateLine.internalid);
        }
    });

    Application.on('after:Transaction.get', function afterTransactionGet(model, result) {
        var lines = result.lines;
        var actions = JewelryUtils.getActionsTransaction(lines, false, false, 'after:Transaction.get');
        if (actions.thereIsFlatRateLine) {
            result.lines = _.filter(lines, function filterLines(line) {
                return line.internalid !== actions.flatRateLine.internalid;
            });
            result.summary.itemcount -= 1;

            result.summary.subtotal -= actions.flatRateLineAmount;
            result.summary.subtotal_formatted = Utils.formatCurrency(result.summary.subtotal);

            result.summary.discountedsubtotal -= actions.flatRateLineAmount;
            result.summary.discountedsubtotal_formatted = Utils.formatCurrency(result.summary.discountedsubtotal);
        }

        result.summary.jewelry = {
            active: actions.thereIsJewelry && actions.thereIsFlatRateLine && !!actions.flatRateLineAmount,
            flatrate: actions.flatRateLineAmount,
            flatrate_formatted: actions.flatRateLineAmountFormatted,
            text: Configuration.get('jewelry.linetext'),
            jewelry_count: actions.jewelryCount,
            jewelry_subtotal: actions.jewelrySubtotal,
            jewelry_subtotal_formatted: actions.jewelrySubtotalFormatted,
            jewelry_subtotal_retail: actions.jewelrySubtotalRetail,
            jewelry_subtotal_formatted_retail: actions.jewelrySubtotalRetailFormatted
        };
    });
});
