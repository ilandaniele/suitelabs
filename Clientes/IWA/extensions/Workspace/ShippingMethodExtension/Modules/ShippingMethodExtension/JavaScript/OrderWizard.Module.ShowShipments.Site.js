define('OrderWizard.Module.ShowShipments.Site', [
    'OrderWizard.Module.ShowShipments',
    'Wizard.Module',
    'Backbone.CompositeView',
    'underscore'
], function OrderWizardModuleShowShipmentsSite(
    OrderWizardModuleShowShipments,
    WizardModule,
    BackboneCompositeView,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShowShipments.prototype, {
        initialize: function ()
		{
			WizardModule.prototype.initialize.apply(this, arguments);

			this.application = this.wizard.application;
			this.options.application = this.wizard.application;

            this.addressSource = this.wizard.options.profile.get('addresses');

			this.wizard.model.on('ismultishiptoUpdated', this.render, this);
			this.wizard.model.on('promocodeUpdated', this.render, this);
		},
        getContext: _.wrap(OrderWizardModuleShowShipments.prototype.getContext, function (fn) {
            var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
            var shippingMethodsFiltered = currentContext.model.get('shipmethods').models.map(function (shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === currentContext.model.get('shipmethod'),
                    rate: shipmethod.get('rate')
                };
            });
            shippingMethodsFiltered = _.sortBy(shippingMethodsFiltered, function (ship) {
                return ship.rate;
            });
            
            currentContext.model.trigger('showShipmentsLoaded');
            return _.extend(currentContext, {
                shippingMethods: shippingMethodsFiltered
            });
        })
    });


});
