define('ShareFavorites.Model', [
    'Backbone',
    'underscore'
], function ShareFavoritesModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/ShareFavorites.Service.ss'))
    });
});
