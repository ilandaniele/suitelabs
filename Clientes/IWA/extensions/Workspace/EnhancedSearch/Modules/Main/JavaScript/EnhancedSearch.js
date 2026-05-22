define('EnhancedSearch', [
    'EnhancedSearch.View'
], function EnhancedSearch(
    EnhancedSearchView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            // var enhancedSearch = environment.getConfig('enhancedSearch.trendingProductsLabel');
            if (layout) {
                layout.addChildView('ItemsSeacher', function addChildView() {
                    return new EnhancedSearchView({
                        container: container,
                        layout: layout
                    });
                });
            }
        }
    };
});
