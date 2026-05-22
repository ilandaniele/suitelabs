
define('Tavano.Klaviyo.Checkout.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					Items.push({
						"ProductID" : line.item.itemid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.itemid,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					})


					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(lines,function(line){
					return line.item.itemid
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});
