define('LiveOrder.ShipMethods.Extension', [
    'Application',
    'LiveOrder.Model',
    'SC.Models.Init',
    'Utils',
    'underscore',
    'SiteSettings.Model'
], function LiveOrderShipMethodsSite(Application, LiveOrderModel, ModelsInit, Utils, _) {
    'use strict';

    _.extend(LiveOrderModel, {
        setShippingMethod: function setShippingMethod(data, currentOrder) {
            var shipmethod;
            var isSecure = Utils.isInCheckout(request);
            if ((!this.isMultiShippingEnabled || !data.ismultishipto) &&
                isSecure &&
                data.shipmethod !== currentOrder.shipmethod) {
                shipmethod = _.findWhere(currentOrder.shipmethods, {
                    internalid: data.shipmethod
                });
                if (shipmethod) {
                    ModelsInit.order.setShippingMethod({
                        shipmethod: shipmethod.internalid,
                        shipcarrier: shipmethod.shipcarrier
                    });
                }
                else {
                    ModelsInit.order.removeShippingMethod();
                }
            }
        }
    });

    Application.on('after:LiveOrder.get', function (Model, response) {
        try {
            var order = ModelsInit.order;
            var websiteshippingmethods = response.shipmethods;
            var lines = response.lines;
            var isSecure = Utils.isInCheckout(request);
            var shippingmethods = [];
            var availableshippingmethods = _.map(websiteshippingmethods, function (shipmethod) {
                return shipmethod.name;
            });
            var customFieldValues = ModelsInit.customer.getCustomFieldValues();
            var custShipMeth = _(customFieldValues).findWhere({ name: 'custentity_customer_ship_methods' });
            var customerShippingMethods = custShipMeth && custShipMeth.value;
            var custShipArray = customerShippingMethods && customerShippingMethods.split('\u0005');
            var customerShipList = [];
            var discardedShipMethdos = [];
            var is_logged_in = ModelsInit.session.isLoggedIn2();
            var filteredMethods = [];
            var customerHasShipMethods = false;

            _.each(lines, function (line) {
                if (line.item) {
                    var itemShipMethods = line.item.custitemship_methods;
                    var itemDiscardedMethods = line.item.custitem_discarded_ship_method;
                    var discardedShips = itemDiscardedMethods ? itemDiscardedMethods.split(', ') : '';
                    if (discardedShips.length) {
                        _.each(discardedShips, function (method) {
                            discardedShipMethdos.push(method);
                        });
                    }
                    if (itemShipMethods) {
                        var ships = itemShipMethods.split(',');
                        if (ships) {
                            for (var i = 0; i < ships.length; i++) {
                                var shipmethod = ships[i].trim();
                                ships[i] = shipmethod;
                                if (shippingmethods.indexOf(shipmethod) == -1 && availableshippingmethods.indexOf(shipmethod) != -1) {
                                    shippingmethods.push(shipmethod);
                                }
                            }
                        }
                    }
                }
            });
            var orderShipMethods = [];
            _.each(websiteshippingmethods, function (shipmethod) {
                if ((!shippingmethods || !shippingmethods.length || _.contains(shippingmethods, shipmethod.name)) && !_.contains(discardedShipMethdos, shipmethod.name)) {
                    orderShipMethods.push(shipmethod);
                }
            });
            if (ModelsInit.session.isLoggedIn2()) {
                var pricelevel = ModelsInit.session.getShopperPriceLevel().internalid ? ModelsInit.session.getShopperPriceLevel().internalid : ModelsInit.session.getSiteSettings('defaultpricelevel');
                if (pricelevel != '1' && pricelevel != '5') {
                    orderShipMethods = orderShipMethods.filter(function (shipmethod) {
                        return shipmethod.internalid != '1375';
                    });
                    response.shipmethods = shipping_methods;
                }
            }
            if (orderShipMethods.length > 0) {
                if (is_logged_in && customerShippingMethods && custShipArray && custShipArray.length > 0) {
                    customerHasShipMethods = true;
                    customerShipList = _.filter(orderShipMethods, function filterShip(ship) {
                        return _.find(custShipArray, function (cusShip) { return ship.internalid === cusShip; });
                    });
                }
                if (customerHasShipMethods) {
                    filteredMethods = _.filter(customerShipList, function (id) {
                        return _.find(orderShipMethods, function (ship) { return id.internalid === ship.internalid; });
                    });
                } else {
                    filteredMethods = orderShipMethods;
                }
                if (filteredMethods && filteredMethods.length === 0 && customerHasShipMethods) {
                    return response.shipmethods = [];
                }
                response.shipmethods = filteredMethods;
                if (!response.shipmethod || _.findWhere(filteredMethods, { internalid: response.shipmethod })) {
                    if (filteredMethods.length == 1) {
                        if (response.shipaddress && response.shipaddress !== '-------null') {
                            var shipmethod = filteredMethods[0];
                            if (shipmethod.internalid != parseInt(response.shipmethod) && isSecure) {
                                order.setShippingMethod({
                                    shipmethod: shipmethod.internalid,
                                    shipcarrier: shipmethod.shipcarrier
                                });
                                _.extend(response, Model.get());
                            }
                        }
                    }
                    return;
                } else if (response.shipmethod && !_.findWhere(filteredMethods, { internalid: response.shipmethod })) {
                    if (response.shipaddress && response.shipaddress !== '-------null') {
                        var shipmethod = _(filteredMethods).min('rate');
                        if (shipmethod.internalid != parseInt(response.shipmethod) && isSecure) {
                            order.setShippingMethod({
                                shipmethod: shipmethod.internalid,
                                shipcarrier: shipmethod.shipcarrier
                            });
                            _.extend(response, Model.get());
                        }
                    }
                }
            } else {
                var shipMethodsFiltered = [];
                _.each(websiteshippingmethods, function (shipmethod) {
                    if (!_.contains(discardedShipMethdos, shipmethod.name)) {
                        shipMethodsFiltered.push(shipmethod);
                    }
                });
                response.shipmethods = shipMethodsFiltered;
            }
            if (ModelsInit.session.isLoggedIn2()) {
                var pricelevel = ModelsInit.session.getShopperPriceLevel().internalid ? ModelsInit.session.getShopperPriceLevel().internalid : ModelsInit.session.getSiteSettings('defaultpricelevel');
                if (pricelevel != '1' && pricelevel != '5') {
                    var shipping_methods = response.shipmethods;
                    shipping_methods = shipping_methods.filter(function (shipmethod) {
                        return shipmethod.internalid != '1375';
                    });
                    response.shipmethods = shipping_methods;
                }
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'e', e);
        }
    });
});
