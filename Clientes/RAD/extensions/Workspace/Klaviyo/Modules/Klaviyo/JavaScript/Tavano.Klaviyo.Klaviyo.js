
define(
	'Tavano.Klaviyo.Klaviyo'
,   [
		'Tavano.Klaviyo.Cart.Sync',
		'Tavano.Klaviyo.ProductView.Sync',
		'Tavano.Klaviyo.LoaderSync',
		'Tavano.Klaviyo.Order.Sync',
		'Tavano.Klaviyo.Profile.Sync',
		'Tavano.Klaviyo.Profile.Model'
	]
,   function (
		TavanoKlaviyoCartSync,
		TavanoKlaviyoProductViewSync,
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoOrderSync,
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoProfileModel
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{

			var registerEvent = true;

			if (SC.isPageGenerator())
				return
			

			var userprofilecomponent = container.getComponent("UserProfile");
			
			var cart = container.getComponent('Cart');
			var pdp = container.getComponent('PDP');
			var layout = container.getComponent('Layout');
			
			
			var environment_component = container.getComponent("Environment");


			// ---------------------
			// Order Submission
			// ---------------------
			TavanoKlaviyoOrderSync.sendOrderDetailsInfo(cart,userprofilecomponent)


			// ---------------------
			// Add To Cart
			// ---------------------
			
			cart.on("afterAddLine",function(){
				TavanoKlaviyoCartSync.sendAddLineEvent(cart,environment_component)
			})


			// ---------------------
			// Update Line
			// ---------------------
			
			cart.on("afterUpdateLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})

			// ---------------------
			// Remove Line
			// ---------------------
			
			cart.on("afterRemoveLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})


			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					
					

					if (userprofilecomponent){
						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);
						});
					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoProfileModel();
						klaviyoProfileModel.fetch().done(function(result){
							TavanoKlaviyoProfileSync.addProfileFromService(result);
						})

					}
					
				}, 2000);

				

				layout.on('afterShowContent', function() {
					if (pdp){
						TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp,environment_component);
						TavanoKlaviyoProductViewSync.sendViewedItem(pdp,environment_component);
						if (pdp && registerEvent) {
							registerEvent = false;
							pdp.on('afterOptionSelection', _.debounce(function (event) {
								TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp, environment_component);
								TavanoKlaviyoProductViewSync.sendViewedItem(pdp, environment_component);
								return true
							}), 200)
						}
					}
				});

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});
