define('InactivityMessage.Model', [
    'Backbone',
    'underscore'
], function InactivityMessageModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/InactivityMessage.Service.ss'))
    });
});
