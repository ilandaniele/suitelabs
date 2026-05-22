
define('Tavano.Klaviyo.ProductView.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProductViewSync = {


        addPossiblePriceLevels: function(line,session,klaviyoObject){

            for (var i=1; i < 50; i++ ){

                var priceLevel = line.item["pricelevel" + i];
                var priceLevelFormatted = line.item["pricelevel" + i + "_formatted"];

                if (priceLevel && priceLevelFormatted){
                    klaviyoObject["pricelevel" + i] = priceLevel;
                    klaviyoObject["pricelevel" + i + "_formatted"] = priceLevelFormatted;

                    // Adding the price level assigned to the customer in a new variable
                    // if ( i.toString() == session.priceLevel ){
                    //     klaviyoObject["PriceForCustomer"] = priceLevel;
                    //     klaviyoObject["PriceForCustomer_formatted"] = priceLevelFormatted;
                    // }
                }
                
            }
        },


        addCustomFields : function(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixChild){
            
            var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

            _.each(customFields,function(customField){
                if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){

                    klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]

                }else{
                    klaviyoObject[customField.klaviyokey] = itemToSend[customField.nsid]
                }
                
            })

        },
        
        sendProductDetailsInfo : function(pdp,environment_component,klaviyoObject){
            
            var line = pdp.getItemInfo();

            if (!line)
                return
            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;

            
            
            if (line){

                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var parentItem = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })

                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                
                

                // storedisplayname || storedisplayname2 || displayname
                var klaviyoObject = {
                    "ProductName": itemToSend.displayname || itemToSend.storedisplayname || itemToSend.storedisplayname2 ,
                    "ProductID" : itemToSend.internalid,
                    "SKU": itemToSend.keyMapping_sku,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "URL":location.href,
                    "Price":itemToSend.keyMapping_price,
                    // "CompareAtPrice": line.item.keyMapping_comparePriceAgainst
                    
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);

                // Sending always all the images available in custom attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }
                


                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }
                

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

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------
                var price_levelInternalId = session.priceLevel;

                klaviyoObject["pricelevelID"] = price_levelInternalId;

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);
                


                var eventData = {
                    'event':'klaviyoProductViewed',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        },
        sendViewedItem : function(pdp,environment_component){
            var line = pdp.getItemInfo();
            var parentItem = line;
            
            if (!line)
                return

            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;
            

            
            
            if (line){


                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })


                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                var klaviyoObject = {
                    "Title": itemToSend.itemid,
                    "ItemId": itemToSend.internalid,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "Metadata": {
                        "Price": itemToSend.keyMapping_price,
                        // "CompareAtPrice": itemToSend.keyMapping_comparePriceAgainst
                    }
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);


                // Sending always all the images available in custome attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }

                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }

                var session = environment_component.getSession()
                
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

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------

                var price_levelInternalId = session.priceLevel;
                klaviyoObject["pricelevelID"] = price_levelInternalId;
                

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);

                var eventData = {
                    'event':'klaviyoViewedItem',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        }
    }

	return TavanoKlaviyoProductViewSync;
});
