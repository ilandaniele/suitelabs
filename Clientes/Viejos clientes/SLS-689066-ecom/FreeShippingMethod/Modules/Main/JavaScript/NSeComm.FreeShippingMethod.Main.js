
define('NSeComm.FreeShippingMethod', [
    'FreeShippingMethod.View',
    'FreeShippingMethod.Model'
], function NSeCommFreeShippingMethod(
    FreeShippingMethodView,
    FreeShippingMethodModel) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var cart = container.getComponent('Cart');

            if (layout && cart) {
                layout.addChildView('Header', function addChildView() {
                    return new FreeShippingMethodView(
                        {
                            'FreeShippingMethodModel': new FreeShippingMethodModel(),
                            'Cart': cart
                        }
                    );
                });
            }
        }
    };
});
