define('ShippingMethodExtension.View'
,	[
		'OrderWizard.Module.Shipmethod'
	
	,	'Backbone'
    ,   'Utils'
    ,   'underscore'
    ]
, function (
    OrderWizardModuleShipmethod
	
	,	Backbone
    ,   Utils
    ,   _
)
{
    'use strict';

    // @class ssd.ProductDetailsExtension.ProductDetails.View @extends Backbone.View
    _.extend(OrderWizardModuleShipmethod.prototype, {

        getContext: function getContext() {
            var self = this;
            var show_enter_shipping_address_first =
                !this.model.get('isEstimating') &&
                !this.profileModel.get('addresses').get(this.model.get('shipaddress'));
            var shipping_methods = this.wizard.model.get('shipmethods').map(function(shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === self.model.get('shipmethod')
                };
            });

            var isDealer = true; //TODO: add dealer and local pickup logic 
            var filtered_shipping_methods = shipping_methods;
            if(!isDealer)
            {
                var filtered_shipping_methods = _.find(shipping_methods, function(shipMethod){
                    return shipMethod.internalid != 1898 && shipMethod.internalid != 772; //Local Pickup && Customer Prepaid
                });
            }
            
            var sorted_filtered_shipping_methods = filtered_shipping_methods;
            if (filtered_shipping_methods.length > 1){
                sorted_filtered_shipping_methods = _.sortBy(filtered_shipping_methods, function(shipmethod){
                    return shipmethod.rate_formatted;
                    
                });
            }
    
            // @class OrderWizard.Module.Shipmethod.Context
            return {
                // @property {LiveOrder.Model} model
                model: this.model,
                // @property {Boolean} showEnterShippingAddressFirst
                showEnterShippingAddressFirst: show_enter_shipping_address_first,
                // @property {Boolean} showLoadingMethods
                showLoadingMethods: this.reloadingMethods,
                // @property {Boolean} hasShippingMethods
                hasShippingMethods: !!sorted_filtered_shipping_methods.length,
                // @property {Boolean} display select instead of radio buttons
                showSelectForShippingMethod: sorted_filtered_shipping_methods.length > 5,
                // @property {Array} shippingMethods
                shippingMethods: sorted_filtered_shipping_methods,
                // @property {Boolean} showTitle
                showTitle: !this.options.hide_title,
                // @property {Straing} title
                title: this.options.title || Utils.translate('Delivery Method')
            };
            // @class OrderWizard.Module.Shipmethod
        }
    });
});
