define('ProductBanner.View', [
    'product_banner.tpl',
    'SCView'
], function ProductBannerViewModule(
    ProductBannerTpl,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function ProductBannerView(options) {
        SCView.call(this);

        this.content = options.content;
        this.key = options.key;
        this.template = ProductBannerTpl;

        this.contextDataRequest = ['item'];
    }

    ProductBannerView.prototype = Object.create(SCView.prototype);

    ProductBannerView.prototype.constructor = ProductBannerView;

    ProductBannerView.prototype.render = function render() {
        var item = this.contextData.item();
        var itemBanners = item
            && item.custitem_product_banner
            && item.custitem_product_banner.split(',');
        var bannerFound;
        var i = 0;

        while (!bannerFound && i < itemBanners.length) {
            if (itemBanners[i].trim() === this.key) {
                SCView.prototype.render.apply(this, arguments);
                bannerFound = true;
            }

            i++;
        }
    };

    ProductBannerView.prototype.getContext = function getContext() {
        return {
            content: this.content
        };
    };

    return ProductBannerView;
});
