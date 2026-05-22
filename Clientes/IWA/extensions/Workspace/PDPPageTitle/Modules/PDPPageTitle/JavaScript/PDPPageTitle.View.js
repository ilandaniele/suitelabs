define('PDPPageTitle.View', [
    'ProductDetails.Full.View',
    'underscore',
    'SC.Configuration'
], function PDPPageTitleView(
    ProductDetails,
    _,
    Configuration
) {
    'use strict';

    return _(ProductDetails.prototype).extend({
        getTitle: function getTitle() {
            var pageTitle;
            var itemTitle;

            pageTitle = Configuration.get('productDetail.websiteDisplayName');

            if (!pageTitle) {
                pageTitle = Configuration.get('siteSettings.displayname');
            }
            itemTitle = this.model.get('item').get('pagetitle');

            // Removes Forced Site Name on Product Name
            itemTitle = itemTitle.split('|')[0].trim();

            return itemTitle + ' | ' + pageTitle;
        }
    });
});
