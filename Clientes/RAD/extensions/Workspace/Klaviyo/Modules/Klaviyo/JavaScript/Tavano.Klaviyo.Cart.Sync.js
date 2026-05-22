
define('Tavano.Klaviyo.Cart.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

    var isCartUpdateInProgress = false;

	var KlaviyoCartSync = {

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

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];
				

				_.each(customFields,function(customField){
					
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{

						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}
						
					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },


        sendAddLineEvent:  function(cart,environment_component){

			var self = this;



			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);

			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {


					var klaviyoObject = {};


					var session = environment_component.getSession()

					// ---------------------------
					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
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
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;

					

					var Items = [];
				
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						
						var matrixParent = line.item.extras.matrix_parent;

						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine)


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail);

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
	
					

					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					
					// Add new Line row
					// Not necessary
					// if (lines && lines.length > 0){
					// 	klaviyoObject["AddedItemProductName"] = lines[0].item.extras.keyMapping_name;
					// 	klaviyoObject["AddedItemProductID"] = lines[0].item.itemid;
					// 	klaviyoObject["AddedItemSKU"] = lines[0].item.extras.keyMapping_sku;
					// 	klaviyoObject["AddedItemImageURL"] = lines[0].item.extras.keyMapping_images.length > 0 ?lines[0].item.extras.keyMapping_images[0].url:"";
					// 	klaviyoObject["AddedItemURL"] = lines[0].item.extras.keyMapping_url;
					// 	klaviyoObject["AddedItemPrice"] = lines[0].rate;
					// 	klaviyoObject["AddedItemQuantity"] = lines[0].quantity;
					// }
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;
	
	
					cart.getSummary().then(function(summary) {
	
						
	
						klaviyoObject["$value"] = summary.subtotal;
	
	
	
						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},

        sendUpdateLineEvent:  function(cart,environment_component){

			var self = this;
		

			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);


			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {

					var klaviyoObject = {};

					var session = environment_component.getSession()

					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
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
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;



					var Items = [];

					
					
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						var matrixParent = line.item.extras.matrix_parent;


						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine);


						// Handle Images
						
						if (matrixParent){

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
				
					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;



					
					
	
	
					cart.getSummary().then(function(summary) {
	
						klaviyoObject["$value"] = summary.subtotal;
	

						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},



    }

	return KlaviyoCartSync;
});
