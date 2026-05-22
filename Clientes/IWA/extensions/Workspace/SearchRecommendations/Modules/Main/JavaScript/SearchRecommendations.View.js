define('SearchRecommendations.View', [
    'SCView',
    'search_recommendations.tpl'
], function SearchRecommendationsViewModule(
    SCViewComponent,
    SearchRecommendationsTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SearchRecommendationsView() {
        SCView.call(this);
        this.template = SearchRecommendationsTpl;
    }

    SearchRecommendationsView.prototype = Object.create(SCView.prototype);

    SearchRecommendationsView.prototype.constructor = SearchRecommendationsView;

    SearchRecommendationsView.prototype.getContext = function getContext() {
        return {};
    };

    return SearchRecommendationsView;
});
