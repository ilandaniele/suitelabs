define('StoreLocator.LocationInfo.View', [
    'Backbone',
    '_store_locator_location_info.tpl'
], function StoreLocatorLocationInfoView(
    Backbone,
    StoreLocatorLocatorDetailsTpl
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocatorDetailsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.model = options.model;
        },

        getContext: function getContext() {
            console.log('model', this.model);
            return {
                model: this.model
            };
        }
    });
});
