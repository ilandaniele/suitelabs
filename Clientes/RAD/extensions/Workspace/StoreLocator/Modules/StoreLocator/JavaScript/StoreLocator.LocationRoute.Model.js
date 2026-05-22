define('StoreLocator.LocationRoute.Model', [
    'Backbone'
], function StoreLocatorLocationRouteModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        toRouteParams: function toRouteParams() {
            var routeParams = {
                origin: {
                    query: this.get('origin')
                },
                destination: {
                    query: this.get('destination')
                },
                travelMode: this.get('mode')
            };
            return routeParams;
        }
    });
});
