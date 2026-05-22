define('NSeComm.FileUpload.PDP', [
    'FileUpload.PDP.View',

    'ProductDetails.QuickView.View',
    'Product.Model',

    'underscore'
], function NSeCommFileUploadPDP(
    FileUploadPDPView,

    ProductDetailsQuickViewView,
    ProductModel,

    _
) {
    'use strict';

    ProductDetailsQuickViewView.prototype.initialize = _(ProductDetailsQuickViewView.prototype.initialize).wrap(function initialize(fn) {
        var result = fn.apply(this, _(arguments).toArray().slice(1));

        this.on('afterViewRender', function afterViewRender() {
            var viewArguments = this.arguments;
            var viewFirstArgument = viewArguments && viewArguments[0];
            var fromCartRegex = /internalid=item[\d]+set[\d]+/;
            var isFromCart = Boolean(viewFirstArgument.match(fromCartRegex));

            if (isFromCart) {
                this.$('[data-action="go-to-fullview"]').hide();
            }
        });

        return result;
    });

    ProductModel.prototype.getVisibleOptions = _(ProductModel.prototype.getVisibleOptions).wrap(function getVisibleOptions(fn) {
        var visibleOptions = fn.apply(this, _(arguments).toArray().slice(1));
        var invisibleOptions = ['custcol_ns_file', 'custcol_ns_file_id'];

        return _(visibleOptions).filter(function filterOption(option) {
            return !_(invisibleOptions).contains(option.get('cartOptionId'));
        });
    });

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var config = environment.getConfig('uploadFileText');
            var pdpFileUploadView;

            if (pdp) {
                // we need this view to be a single instance
                pdpFileUploadView = new FileUploadPDPView({
                    pdp: pdp,
                    config: config
                });

                pdp.addChildView('Product.Options', function addProductOptionsChildView() {
                    return pdpFileUploadView;
                });

                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'Product.Options': {
                        'pdpFileUploadView': {
                            childViewIndex: 1,
                            childViewConstructor: function addQuickViewChildView() {
                                return pdpFileUploadView;
                            }
                        }
                    }
                });
            }
        }
    };
});
