define('FreeShippingMethod.View', [
    'FreeShippingMethod.Model',
    'freeshippingmethod.tpl',
    'SCView'
], function FreeShippingMethodViewModule(
    FreeShippingMethodModel,
    FreeShippingMethodTpl,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FreeShippingMethodView(options) {
        var self = this;

        SCView.call(this);
        this.options = options || {};
        this.template = FreeShippingMethodTpl;
        this.model = options.FreeShippingMethodModel;

        this.Cart.on('beforeSetShipMethod', function shipMethodUsed(shippingMethod) {
            self.Cart.getLines().then(function getLines(lines) {
                var i;
                var excluded = false;
                var isFreeShippingItem = false;
                if (lines.length > 0) {
                    for (i = 0; i < lines.length; i++) {
                        // check how to get property custitem185
                        isFreeShippingItem = lines[i].custitem185;
                        if (isFreeShippingItem) {
                            excluded = shippingMethod.internalid === '110';
                            self.modelPromise = this.model.save({
                                data: {
                                    excluded: excluded,
                                    cartItemId: lines[i].internalid
                                }
                            });
                        }
                    }
                }
            });
        });
    }

    FreeShippingMethodView.prototype = Object.create(SCView.prototype);
    FreeShippingMethodView.prototype.constructor = FreeShippingMethodView;
    FreeShippingMethodView.prototype.getContext = function getContext() {
        // dummy property here
        this.Cart.getShipMethod().then(function shipMethod(shipmethod) {
            if (shipmethod.internalid === '105') {
                //
            } else {
                //
            }
        });
        // ver como hacer esto, cada vez que se hace un cambio de shipping method o en el getContext
        return {};
    };

    return FreeShippingMethodView;
});
