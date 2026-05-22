
define(
    'FSCModule', [
        'FSCModule.View'
    ], function (FSCModuleView) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                /** @type {LayoutComponent} */
                var cart = container.getComponent('Cart');
                var layout = container.getComponent('Layout');

                function addFCSModuleView() {
                    return new FSCModuleView({
                        container: container,
                        cart: cart
                    });
                }

                if (cart) {
                    layout.addChildView('Message.Placeholder', addFCSModuleView());
                    cart.addChildView('FreeGift.Info', addFCSModuleView());
                }
            }
        };
    });
