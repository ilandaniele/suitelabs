define('InactivityMessage.ProfileModel', [
    'Backbone',
    'underscore'
], function InactivityMessageProfileModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Profile.Service.ss')
    });
});
