define('NSeComm.FileUpload.Cart', [
    'FileUpload.Cart.View'
], function NSeCommFileUploadCart(
    FileUploadCartView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var environment = container.getComponent('Environment');
            var config = environment.getConfig('uploadFileText');
            var layout = container.getComponent('Layout');

            function addFileUploadCartView() {
                return new FileUploadCartView({
                    config: config
                });
            }

            if (cart) {
                cart.addChildView('Item.Sku', addFileUploadCartView);

                cart.addChildViews(cart.CART_MINI_VIEW, {
                    'Item.SelectedOptions': {
                        'miniCartFileUploadView': {
                            childViewIndex: 1,
                            childViewConstructor: addFileUploadCartView
                        }
                    }
                });

                layout.addChildView('Line.SelectedOptions', addFileUploadCartView);
            }
        }
    };
});
