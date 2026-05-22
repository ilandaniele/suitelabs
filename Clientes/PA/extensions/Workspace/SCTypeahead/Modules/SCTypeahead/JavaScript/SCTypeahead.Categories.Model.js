define('SCTypeahead.Categories.Model', [
    'Backbone',
    'Backbone.CachedModel',
    'underscore',
    'Utils'
], function(
    Backbone,
    BackboneCachedModel,
    _,
    Utils
) {
    'use strict';

    return BackboneCachedModel.extend({
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/SCTypeahead.Service.ss"
            )
        )
    });
});
