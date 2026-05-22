
define(
	'ShippingMethodExtension.Checkout',   
	[ 
		'Profile.Model',
		'OrderWizard.Module.CartSummary.Site',
		'OrderWizard.Module.Shipmethod.Site',
		'OrderWizard.Module.ShowShipments.Site',
		'Cart.ShippingMethodForm.View.Site',
		'Cart.Summary.View.Site'

	]
,   function 
	(
		ProfileModel,
		OrderWizardModuleCartSummarySite,
		OrderWizardModuleShipmethodSite,
		OrderWizardModuleShowShipmentsSite,
		CartShippingMethodFormViewSite,
		CartSummaryViewSite
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			
		}
	};
});

