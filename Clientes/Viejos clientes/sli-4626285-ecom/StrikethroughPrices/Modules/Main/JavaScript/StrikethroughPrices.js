define('StrikethroughPrices', [
    'StrikethroughPricesPDP.View',
    'StrikethroughPricesMiniCart.View'
], function StrikethroughPrices(
    StrikethroughPricesPDPView,
    StrikethroughPricesMiniCartView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDP = container.getComponent('PDP');
            // var Cart = container.getComponent('Cart');
            // var PLP = container.getComponent('PLP');
            var Layout = container.getComponent('Layout'); // el cartelito de cart

            if (PDP) {
                PDP.addChildViews(PDP.PDP_FULL_VIEW, {
                    'Quantity': {
                        'StrikethroughPrices.View': {
                            childViewIndex: 1,
                            childViewConstructor: function addStrikethroughPDP() {
                                return new StrikethroughPricesPDPView({
                                    container: container,
                                    PDP: PDP
                                });
                            }
                        }
                    }
                });

                PDP.on('afterShowContent', function afterShowContent() {
                    PDP.cancelableTrigger('changeColorPDP', {});
                });
            }


            // La vista de VIEW CART
            // if (Cart) {
            //     Cart.addChildView('Item.Price', function addStrikethroughCart() {
            //         return new StrikethroughPricesPDPView({
            //             container: container
            //         });
            //     });
            // }
            //
            // if (PLP) {
            //     PLP.addChildView('Item.Price', function addStrikethroughPLP() {
            //         return new StrikethroughPricesPDPView({
            //             container: container
            //         });
            //     });
            //
            //     PLP.addChildView('ProductViewsPrice.Price', function addStrikethroughPLP() {
            //         return new StrikethroughPricesPDPView({
            //             container: container
            //         });
            //     });
            // }

            // La vista del carrito en home
            if (Layout) {
                Layout.addChildView('Header.MiniCartItemCell', function addStrikethroughPLP() {
                    return new StrikethroughPricesMiniCartView({
                        container: container,
                        Layout: Layout
                    });
                });

                Layout.on('afterShowContent', function afterShowContent() {
                    Layout.cancelableTrigger('changeColor', {});
                });
            }
        }
    };
});
