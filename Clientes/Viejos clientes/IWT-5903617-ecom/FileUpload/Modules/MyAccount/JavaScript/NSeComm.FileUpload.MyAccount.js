define('NSeComm.FileUpload.MyAccount', [
    'FileUpload.Cart.View',
    'NSeComm.FileUpload.Common'
], function NSeCommFileUploadMyAccount(
    FileUploadCartView,
    NSeCommFileUploadCommon
) {
    'use strict';

    /**
     * This works for MyAccount: order history and MiniCart
     */
    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var config = environment.getConfig('uploadFileText');

            NSeCommFileUploadCommon.mountToApp(container);

            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'Item.SelectedOptions': {
                        'cartFileUploadView': {
                            childViewIndex: 1,
                            childViewConstructor: function addMyAccountSummaryChildView() {
                                return new FileUploadCartView({
                                    config: config
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});
