
define('NSeComm.ZipCodeShippingPrices', [
    'ZipCodeShippingPrices.Model',
    'underscore'
], function NSeCommZipCodeShippingPrices(
    ZipCodeShippingPricesModel,
    _
) {
    'use strict';

    var shippingCost = '0.00';
    var cart;
    var zipCodeShippingPricesModel;

    var loadingPage;
    var finishedLoadingPage;
    var function1TimesExecuted;
    var function2TimesExecuted;
    var changeShipMethod;
    var changeZipCodeCount;
    var changeZipCode;

    // cuando cambio el shipping method se ejecuta 3 veces (1 para funcion1, 2 para funcion2)
    // cuando cambio el zipcode se ejecuta 6 veces (4 para funcion1, 2 para funcion2)
    // cuando cambio recargo la página se ejecuta 4 veces (2 para funcion1, 2 para funcion2)

    // identificar cuando es la ultima llamada es lo que no se, y necesito

    function updateShippingCost() {
        cart.getShipAddress().then(function shipAddress(shipaddress) {
            var zipCode = shipaddress.zip;

            zipCodeShippingPricesModel.fetch({
                data: {
                    action: 'getShippingCost',
                    zipCode: zipCode
                }
            }).done(function zipCodeShippingPricesPromise() {
                shippingCost = zipCodeShippingPricesModel.get('shippingCost');

                cart.getShipMethod().then(function shippingMethod(shipmethod) {
                    var shipMethodId = shipmethod.internalid;
                    var shipMethodData = { ship_method: { internalid: shipMethodId } };
                    cart.setShipMethod(shipMethodData);
                    console.log('setShipMethod triggered');
                });
            });
        });
        // }
    }

    function getShippingMethodsFunction(environment) {
        return function getShippingMethods(context) {
            var orcaShippingMethod = environment.getConfig('zipCodeShippingPrices.orcaShippingMethod');
            var shippingMethods = context.shippingMethods;

            var values = {
                funcion: 'FUNCTION 1',
                loadingPage: loadingPage,
                finishedLoadingPage: finishedLoadingPage,
                changeShipMethod: changeShipMethod,
                changeZipCode: changeZipCode,
                changeZipCodeCount: changeZipCodeCount,
                function1TimesExecuted: function1TimesExecuted,
                function2TimesExecuted: function2TimesExecuted,
                shippingCost: shippingCost
            };

            function1TimesExecuted++;
            if (!changeShipMethod && !loadingPage && !finishedLoadingPage) {
                // this runs ONLY when zip code changes
                if (changeZipCode) {
                    if (changeZipCodeCount > 1) {
                        changeZipCodeCount--;
                    } else {
                        changeZipCodeCount = 2;
                        changeZipCode = false;
                        function1TimesExecuted = 0;
                        function2TimesExecuted = 0;
                    }
                }
            }


            if (shippingCost && shippingCost !== '0.00') {
                shippingMethods = _(context.shippingMethods).forEach(function replaceShippingPrice(shippingMethod) {
                    if (shippingMethod.name === orcaShippingMethod) {
                        shippingMethod.rate_formatted = shippingCost;
                    }
                });
            } else {
                shippingMethods = _(context.shippingMethods).filter(function filterShippingMethods(shippingMethod) {
                    return shippingMethod.name !== orcaShippingMethod;
                });
            }

            if ((function1TimesExecuted === 4 && function2TimesExecuted === 2)
            || (function1TimesExecuted === 3 && function2TimesExecuted === 1)) {
                console.log('entered times executed 4 and 2 or 3 and 1');
                updateShippingCost();
                function1TimesExecuted = 0;
                function2TimesExecuted = 0;
                changeZipCodeCount = 2;
                changeZipCode = true;
            }

            if (!changeShipMethod) {
                if (finishedLoadingPage) {
                    function1TimesExecuted = 0;
                    function2TimesExecuted = 0;
                    finishedLoadingPage = false;
                } else if (loadingPage && function1TimesExecuted === 2) {
                    loadingPage = false;
                    function1TimesExecuted = 0;
                    function2TimesExecuted = 0;
                    finishedLoadingPage = true;
                }

                // set here case for change zip code
            } else if (function2TimesExecuted === 2 && function1TimesExecuted === 1) {
                changeShipMethod = false;
                function2TimesExecuted = 0;
                function1TimesExecuted = 0;
            }

            values = {
                funcion: 'FUNCTION 1',
                loadingPage: loadingPage,
                finishedLoadingPage: finishedLoadingPage,
                changeShipMethod: changeShipMethod,
                changeZipCode: changeZipCode,
                changeZipCodeCount: changeZipCodeCount,
                function1TimesExecuted: function1TimesExecuted,
                function2TimesExecuted: function2TimesExecuted,
                shippingCost: shippingCost
            };

            console.log(values);

            return shippingMethods;
        };
    }

    // Called 2 times when changes ship method selected.
    function getShippingMethodsForChangeShipMethodFunction(environment) {
        return function getShippingMethods(context) {
            var orcaShippingMethod = environment.getConfig('zipCodeShippingPrices.orcaShippingMethod');
            var shippingMethods = context.shippingMethods;

            var values = {
                funcion: 'FUNCTION 2',
                loadingPage: loadingPage,
                finishedLoadingPage: finishedLoadingPage,
                changeShipMethod: changeShipMethod,
                changeZipCode: changeZipCode,
                changeZipCodeCount: changeZipCodeCount,
                function1TimesExecuted: function1TimesExecuted,
                function2TimesExecuted: function2TimesExecuted,
                shippingCost: shippingCost
            };
            console.log('FUNCTION 2');
            console.log(values);


            function2TimesExecuted++;
            if (!changeShipMethod && !loadingPage && !finishedLoadingPage) {
                // this runs ONLY when zip code changes
                if (changeZipCode) {
                    if (changeZipCodeCount > 1) {
                        changeZipCodeCount--;
                    } else {
                        changeZipCodeCount = 2;
                        changeZipCode = false;
                        function1TimesExecuted = 0;
                        function2TimesExecuted = 0;
                    }
                }
            }
            //  else {
            //     function2TimesExecuted++;
            // }


            if (shippingCost && shippingCost !== '0.00') {
                shippingMethods = _(context.shippingMethods).forEach(function replaceShippingPrice(shippingMethod) {
                    if (shippingMethod.name === orcaShippingMethod) {
                        shippingMethod.rate_formatted = shippingCost;
                    }
                });
            } else {
                shippingMethods = _(context.shippingMethods).filter(function filterShippingMethods(shippingMethod) {
                    return shippingMethod.name !== orcaShippingMethod;
                });
            }

            if ((function1TimesExecuted === 4 && function2TimesExecuted === 2)
            || (function1TimesExecuted === 3 && function2TimesExecuted === 1)) {
                console.log('entered times executed 4 and 2 or 3 and 1');
                // nunca entra aca, vaya a saber por que que entre con 3 de function 1 y 1 de function 2
                updateShippingCost();
                function1TimesExecuted = 0;
                function2TimesExecuted = 0;
                changeZipCodeCount = 2;
                changeZipCode = true;
            }

            if (!changeShipMethod) {
                if (finishedLoadingPage) {
                    function1TimesExecuted = 0;
                    function2TimesExecuted = 0;
                    finishedLoadingPage = false;
                } else if (loadingPage && function2TimesExecuted === 2) {
                    loadingPage = false;
                    function1TimesExecuted = 0;
                    function2TimesExecuted = 0;
                    finishedLoadingPage = true;
                }

                // set here case for change zip code
            } else if (function2TimesExecuted === 2 && function1TimesExecuted === 1) {
                changeShipMethod = false;
                function2TimesExecuted = 0;
                function1TimesExecuted = 0;
            }

            values = {
                funcion: 'FUNCTION 2',
                loadingPage: loadingPage,
                finishedLoadingPage: finishedLoadingPage,
                changeShipMethod: changeShipMethod,
                changeZipCode: changeZipCode,
                changeZipCodeCount: changeZipCodeCount,
                function1TimesExecuted: function1TimesExecuted,
                function2TimesExecuted: function2TimesExecuted,
                shippingCost: shippingCost
            };

            console.log(values);

            return shippingMethods;
        };
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var checkout = container.getComponent('Checkout');
            cart = container.getComponent('Cart');

            if (layout && environment && checkout && cart) {
                zipCodeShippingPricesModel = new ZipCodeShippingPricesModel();
                loadingPage = true;
                finishedLoadingPage = false;
                changeShipMethod = false;
                changeZipCode = false;
                function1TimesExecuted = 0;
                function2TimesExecuted = 0;
                changeZipCodeCount = 2;

                layout.addToViewContextDefinition(
                    'OrderWizard.Module.Shipmethod',
                    'shippingMethods',
                    'object',
                    getShippingMethodsFunction(environment));

                layout.addToViewContextDefinition(
                    'OrderWizard.Module.ShowShipments',
                    'shippingMethods',
                    'object',
                    getShippingMethodsForChangeShipMethodFunction(environment));

                cart.on('beforeSetShipMethod', function selectedShipMethod() {
                    console.log('entered beforeSetShipMethod Event');
                    if (!loadingPage && !changeZipCode) {
                        changeShipMethod = true;
                        console.log('beforeSetShipMethod: Activated changeShipMethod flag');
                    }

                    if (!changeZipCode) {
                        console.log('beforeSetShipMethod: cleaned variables time executed');
                        function1TimesExecuted = 0;
                        function2TimesExecuted = 0;
                    }
                });
                updateShippingCost();
            }
        }
    };
});
