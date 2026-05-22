define('SEOImprovements.Home.View', [
    'Home.View',
    'underscore'
], function SEOImprovementsHomeView(
    HomeView,
    _
) {
    'use strict';

    _.extend(HomeView.prototype, {
        getMetaDescription: _.wrap(HomeView.prototype.getMetaDescription, function getMetaDescription(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var environmentComponent = this.options.application.getComponent('Environment');
            return ret || environmentComponent.getConfig('seo.siteDescription');
        }),
        getTitle: _.wrap(HomeView.prototype.getTitle, function getTitle(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var environmentComponent = this.options.application.getComponent('Environment');
            return ret || environmentComponent.getConfig('seo.siteTitle') || environmentComponent.getConfig('siteSettings.displayName');
        })
    });
});
