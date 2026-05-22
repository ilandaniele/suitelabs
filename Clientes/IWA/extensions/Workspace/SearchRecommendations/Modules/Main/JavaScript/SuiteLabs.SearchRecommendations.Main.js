define('SuiteLabs.SearchRecommendations.Main', [
    'SearchRecommendations.View'
], function SuiteLabsSearchRecommendationsMain(
    SearchRecommendationsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            if (layout) {
                layout.addChildView('SiteSearch', function addSearchRecommendationsView() {
                    return new SearchRecommendationsView({ container: container });
                });
            }
        }
    };
});
