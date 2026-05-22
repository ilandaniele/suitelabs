define('WebsiteItems', [
    'underscore'
], function WebsiteItemsModule(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var configuration = container.getConfig();
            configuration.itemKeyMapping = configuration.itemKeyMapping || {};

            _(configuration.itemKeyMapping).extend({
                _pageTitle: ['custitem_page_title_tfas', 'pagetitle', 'storedisplayname2', 'displayname'],
                _metaTags: ['custitem_meta_tag_html_tfas', 'metataghtml']
            });
        }
    };
});
