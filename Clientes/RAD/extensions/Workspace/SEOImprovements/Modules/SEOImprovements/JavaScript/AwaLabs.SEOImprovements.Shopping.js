define('AwaLabs.SEOImprovements.Shopping', [
    'SC.Shopping.Configuration',
    'Configuration',
    'Utils',
    'SEOImprovements.Home.View',
    'SEOImprovements.PLP.View',
    'SEOImprovements.PDP.View'
], function SEOImprovements(
    SCShoppingConfiguration,
    Configuration,
    Utils
) {
    SCShoppingConfiguration.metaTagMappingOg['og:site_name'] = function ogSiteName() {
        return Configuration.get('siteTitle');
    };

    function seoImage(layout, number) {
        var $image = layout.$('[data-type="social-image"], [itemprop="image"], .product-details-image-gallery-container:not(.bx-clone) img:not(.zoomImg)');
        var myNumber = typeof number === 'undefined' ? 0 : number;
        // eslint-disable-next-line
        var resizedImage = $image.get(myNumber) ? $image.get(myNumber).src : (!myNumber ? Utils.getThemeAbsoluteUrlOfNonManagedResources('img/no_image_available.jpeg', Configuration.get.apply(Configuration, ['imageNotAvailable'])) : '');
        var patt = new RegExp('https?://');
        var imageUrl = resizedImage;

        if (!patt.exec(imageUrl) && resizedImage) {
            imageUrl = window.location.origin + encodeURI(resizedImage);
        }
        return imageUrl;
    }

    SCShoppingConfiguration.metaTagMappingOg['og:image'] = function ogImage(layout) {
        return seoImage(layout, 0);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image0:src'] = function ogImage(layout) {
        return seoImage(layout, 0);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image1:src'] = function ogImage(layout) {
        return seoImage(layout, 1);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image2:src'] = function ogImage(layout) {
        return seoImage(layout, 2);
    };
    SCShoppingConfiguration.metaTagMappingOg['twitter:image3:src'] = function ogImage(layout) {
        return seoImage(layout, 3);
    };

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var environmentComponent = application.getComponent('Environment');
            if (layout) {
                layout.addToViewContextDefinition('Header.Logo.View', 'logo', 'string', function fn() {
                    return environmentComponent.getConfig('header.logoUrl');
                });
                layout.addToViewContextDefinition('Header.Logo.View', 'name', 'string', function fn(context) {
                    return context.headerLinkTitle || environmentComponent.getConfig('seo.siteTitle');
                });
            }
        }
    };
});
