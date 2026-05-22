
define(
	'Tavano.Klaviyo.Klaviyo.Checkout'
,   [
		
		
		'Tavano.Klaviyo.LoaderSync.Checkout',
		'Tavano.Klaviyo.Checkout.Sync.Checkout',
		
		'Tavano.Klaviyo.Profile.Sync.Checkout',
		'Tavano.Klaviyo.AddOrderSource.Checkout',
		'Tavano.Klaviyo.Checkout.Profile.Model'
		
	]
,   function (
		
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoCheckoutSync,
		
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoAddOrderSourceCheckout,
		TavanoKlaviyoCheckoutProfileModel
		
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{
			

			var userprofilecomponent = container.getComponent("UserProfile");
			var checkout = container.getComponent('Checkout');
			var cart = container.getComponent('Cart');
			var environment_component = container.getComponent("Environment");



			// ---------------------
			// Order Source
			// ---------------------
			
			TavanoKlaviyoAddOrderSourceCheckout.addOrderSourceModule(checkout,environment_component)



			// Manage Guest Checkout
			// Manage Login/Register
			checkout && checkout.on("afterShowContent", function() {


				if (userprofilecomponent){

					userprofilecomponent.getUserProfile().then(function(profile) {
					

						if (!window.isProfileLoaded && profile && profile.isloggedin){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					});

				}else{

					// We might be in a version with no support for UserProfile Component
					var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
					klaviyoProfileModel.fetch().done(function(result){


						
						if (!window.isProfileLoaded && result && result.email){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					})

				}

			})

			
			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					

					
					if (userprofilecomponent){

						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && profile && profile.isloggedin){

								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
								
							}

						});

					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
						klaviyoProfileModel.fetch().done(function(result){


							TavanoKlaviyoProfileSync.addProfileFromService(result);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && result && result.email){
								
								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
							}


						})
					}

					
				}, 2000);

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});
