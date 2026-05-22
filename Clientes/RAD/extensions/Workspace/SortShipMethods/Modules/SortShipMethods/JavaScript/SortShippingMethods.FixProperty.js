define('SortShippingMethods.FixProperty', [
    'OrderWizard.Module.Shipmethod',
    'OrderWizard.Module.ShowShipments',
    'Backbone',
    'Backbone.View.render'
],
function HackCheckout(
    OrderWizardModuleShipmethod,
    OrderWizardModuleShowShipments,
    Backbone
) {
    'use strict';

    OrderWizardModuleShipmethod.addExtraContextProperty = Backbone.View.addExtraContextProperty;
    OrderWizardModuleShowShipments.addExtraContextProperty = Backbone.View.addExtraContextProperty;
});
