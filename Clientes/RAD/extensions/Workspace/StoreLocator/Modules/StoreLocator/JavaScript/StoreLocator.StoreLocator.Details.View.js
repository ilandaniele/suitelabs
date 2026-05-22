define('StoreLocator.StoreLocator.Details.View', [
    'StoreLocator.Details.View',
    'underscore',
    'AjaxRequestsKiller',
    'StoreLocator.LocationRoute.Model',
    'StoreLocator.LocationInfo.View',
    'StoreLocator.LocationRoute.View',
    'StoreLocator.LocationSteps.View',
    'Utils'
], function StoreLocatorStoreLocatorDetailsView(
    StoreLocatorDetailsView,
    _,
    AjaxRequestsKiller,
    StoreLocatorLocationRouteModel,
    StoreLocatorLocationInfoView,
    StoreLocatorLocationRouteView,
    StoreLocatorLocationStepsView,
    Utils
) {
    'use strict';


    _.extend(StoreLocatorDetailsView.prototype, {
        initialize: _.wrap(StoreLocatorDetailsView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.locationRouteModel = new StoreLocatorLocationRouteModel();
        }),
        getBreadcrumbPages: function getBreadcrumbPages() {
            var breadCrumbs = [];
            breadCrumbs.push({
                text: Utils.translate('Stores'),
                href: '/storelist'
            });
            breadCrumbs.push({
                text: this.model.get('name'),
                href: '/stores/' + this.model.get('urlcomponent')
            });
            return breadCrumbs;
        },
        beforeShowContent: function beforeShowContent() {
            var urlcomponent = this.routerArguments[0];
            return this.model.fetch({
                data: {
                    urlcomponent: urlcomponent
                },
                killerId: AjaxRequestsKiller.getKillerId()
            });
        },
        childViews: _.extend(StoreLocatorDetailsView.prototype.childViews, {
            'StoreLocationInfo': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationInfoView({
                    application: this.application,
                    model: this.model
                });
            },
            'StoreLocationRoute': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationRouteView({
                    application: this.application,
                    locationModel: this.model,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map,
                    collection: this.collection
                });
            },
            'StoreLocationSteps': function StoreLocationStepsCustom() {
                return new StoreLocatorLocationStepsView({
                    application: this.application,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map
                });
            }
        })
    });
});
