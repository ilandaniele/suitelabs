define('StoreLocator.LocationSteps.View', [
    'Backbone',
    '_store_locator_location_steps.tpl',
    'underscore'
], function StoreLocatorLocationStepsView(
    Backbone,
    StoreLocatorLocationStepsTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationStepsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationRouteModel = options.locationRouteModel;
            this.locationRouteModel.on('change:leg', _.bind(this.render, this));
        },

        getContext: function getContext() {
            return {
                locationRouteModel: this.locationRouteModel,
                hasSteps: this.locationRouteModel.get('leg') &&
                    this.locationRouteModel.get('leg').steps &&
                    this.locationRouteModel.get('leg').steps.length > 0
            };
        }
    });
});
