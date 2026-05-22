
define(
	'ShippingMethodExtension.Shopping',   
	[ 
		'Profile.Model',
		'Cart.Detailed.View.Site',
		'Cart.ShippingMethodForm.View.Site',
		'Cart.Summary.View.Site'
	]
,   function 
	(
		ProfileModel,
		CartDetailedViewSite,
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

