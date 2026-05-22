define('SuiteLabs.EnhancedPDP', [
    'SuiteLabs.EnhancedPDP.Gallery.View',
    'Product.Option.Model.MaxLength'
], function EnhancedPDP(
    EnhancedPDPGalleryView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');

            if (pdp) {
                pdp.removeChildView('Product.ImageGallery');

                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'Product.ImageGallery': {
                        'ProductGallery.Enhanced': {
                            childViewConstructor: function childViewConstructor() {
                                return new EnhancedPDPGalleryView({
                                    container: container
                                });
                            },
                            childViewIndex: 1
                        }
                    }
                });
            }
        }
    };
});
