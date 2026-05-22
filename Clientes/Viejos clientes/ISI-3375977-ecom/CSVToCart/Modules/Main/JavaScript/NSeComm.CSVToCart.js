define('NSeComm.CSVToCart', [
    'CSVToCart.View',
    'CSVToCart.Model'
], function NSeCommCSVToCart(
  CSVToCartView,
  CSVToCartModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var csv2CartModel;

            if (cart) {
                csv2CartModel = new CSVToCartModel();
                layout.addChildView('Quick.Order', function childView() {
                    return new CSVToCartView({
                        container: container,
                        cart: cart,
                        model: csv2CartModel
                    });
                });
            }
        }
    };
});
