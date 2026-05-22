define('NSeComm.FileUpload.Checkout', [
    'FileUpload.Cart.View',
    'NSeComm.FileUpload.Common'
], function NSeCommFileUploadCheckout(
    FileUploadCartView,
    NSeCommFileUploadCommon
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var checkout = container.getComponent('Checkout');
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var config = environment.getConfig('uploadFileText');

            NSeCommFileUploadCommon.mountToApp(container);

            function addFileUploadCartView() {
                return new FileUploadCartView({
                    config: config
                });
            }

            if (checkout) {
                checkout.addChildViews(checkout.WIZARD_VIEW, {
                    'Item.Options': {
                        'cartFileUploadView': {
                            childViewIndex: 1,
                            childViewConstructor: addFileUploadCartView
                        }
                    }
                });
            }

            /**
             * This piece will work for Mini Cart
             */
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'Item.SelectedOptions': {
                        'cartFileUploadView': {
                            childViewIndex: 1,
                            childViewConstructor: addFileUploadCartView
                        }
                    }
                });
            }
        }
    };
});
