define('SuiteLabs.ProductBanner.Main', [
    'ProductBanner.View',
    'underscore'
], function SuiteLabsProductBannerMain(
    ProductBannerView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdpComponent = container.getComponent('PDP');
            var environmentComponent = container.getComponent('Environment');
            var bannersConfig;
            var banner;
            var i;

            if (environmentComponent && pdpComponent) {
                bannersConfig = environmentComponent.getConfig('productBanner');

                if (bannersConfig.banners && bannersConfig.banners.length) {
                    for (i = 0; i < bannersConfig.banners.length; i++) {
                        banner = bannersConfig.banners[i];

                        pdpComponent.addChildView(banner.placeholder, _.bind(function BannerViews() {
                            return new ProductBannerView({
                                content: this.content,
                                key: this.key
                            });
                        }, banner));
                    }
                }
            }
        }
    };
});
