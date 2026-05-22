define('AwaLabs.SEOImprovements', [
], function SEOImprovements() {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var environmentComponent = application.getComponent('Environment');
            if (layout) {
                layout.addToViewContextDefinition('Header.Logo.View', 'logoUrl', 'string', function fn() {
                    return environmentComponent.getConfig('header.logoUrl');
                });
                layout.addToViewContextDefinition('Header.Logo.View', 'siteName', 'string', function fn(context) {
                    return context.headerLinkTitle || environmentComponent.getConfig('seo.siteTitle');
                });
            }
        }
    };
});
