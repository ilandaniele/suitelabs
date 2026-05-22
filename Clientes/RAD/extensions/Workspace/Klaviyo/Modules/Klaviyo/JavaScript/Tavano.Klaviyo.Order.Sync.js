
define('Tavano.Klaviyo.Order.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoOrderSync = {
        
        sendOrderDetailsInfo : function(cart,userprofilecomponent){

            self.cart = cart;

            if (cart){

                cart.on("beforeSubmit",function(data){

                    // Pre-save the following information
                    // Shipping Address
                    // Billing Address
                    // Customer Information

                    userprofilecomponent.getUserProfile().then(function(profile) {
                        
                        var profile = {
                            "$email": profile.email,
                            "$first_name": profile.firstname,
                            "$last_name": profile.lastname,
                            "$phone_number": profile.phoneinfo ? profile.phoneinfo.phone : "",
                            "$address1": profile.addresses.length > 0 ? profile.addresses[0].addr1 : "",
                            "$address2": profile.addresses.length > 0 ? profile.addresses[0].addr2 : "",
                            "$city": profile.addresses.length > 0 ? profile.addresses[0].city : "",
                            "$zip": profile.addresses.length > 0 ? profile.addresses[0].zip : "",
                            "$region":profile.addresses.length > 0 ? profile.addresses[0].state : "",
                            "$country": profile.addresses.length > 0 ? profile.addresses[0].country : "",
                        }

                        sessionStorage.setItem('customer_properties', JSON.stringify(profile));    
                        
                    });


                    self.cart.getShipAddress().then(function(shippingAddress) {
                        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));    
                    })

                    self.cart.getBillAddress().then(function(billingAddress) {
                        sessionStorage.setItem('billingAddress', JSON.stringify(billingAddress));    
                    })



                    cart.getLines().then(function(lines) {

                        

                        var Items = _.map(lines,function(line){
                            return {
                                "ProductID" : line.item.itemid,
                                "SKU": line.item.extras.keyMapping_sku,
                                "ProductName": line.item.extras.keyMapping_name,
                                "Quantity":line.quantity,
                                "ItemPrice":line.rate,
                                "RowTotal":line.amount,
                                "ProductURL":line.item.extras.keyMapping_url,
                                "ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
                            }
                        })
        
                        var ItemNames = _.map(lines,function(line){
                            return line.item.extras.keyMapping_name
                        })

                        sessionStorage.setItem('ItemNames', JSON.stringify(ItemNames));    

                        sessionStorage.setItem('Items', JSON.stringify(Items));    



                        
                    })

                })
    
                cart.on("afterSubmit",function(data){

                    
                    
                    var klaviyoObject = {};


                    klaviyoObject["$value"] = data.confirmation.summary.total;
                    klaviyoObject["OrderId"] = data.confirmation.tranid;

                    if (data.promocodes && data.promocodes.length > 0){

                        klaviyoObject["DiscountCode"] = "";
                        klaviyoObject["DiscountValue"] = data.confirmation.summary.extras.discounttotal_formatted;
                    }

                    
        
                    // Adding Shipping and Billing Addresses

                    var billingAddress = JSON.parse(sessionStorage.getItem('billingAddress'));
                    var shippingAddress = JSON.parse(sessionStorage.getItem('shippingAddress'));
                    var customer_properties = JSON.parse(sessionStorage.getItem('customer_properties'));
                    var Items = JSON.parse(sessionStorage.getItem('Items'));
                    var ItemNames = JSON.parse(sessionStorage.getItem('ItemNames'));


                    klaviyoObject["ItemNames"] = ItemNames;
                    klaviyoObject["Items"] = Items;
                    

                    klaviyoObject["BillingAddress"] = {

                        "FirstName": billingAddress.fullname,
                        "LastName": billingAddress.fullname,
                        "Company": billingAddress.company,
                        "Address1": billingAddress.addr1,
                        "Address2": billingAddress.addr2,
                        "City": billingAddress.city,
                        "Region": billingAddress.state,
                        "RegionCode":billingAddress.state,
                        "Country": billingAddress.country,
                        "CountryCode": billingAddress.country,
                        "Zip": billingAddress.zip,
                        "Phone": billingAddress.phone,
                    };

                    klaviyoObject["ShippingAddress"] = {
                        
                        "FirstName": shippingAddress.fullname,
                        "LastName": shippingAddress.fullname,
                        "Company": shippingAddress.company,
                        "Address1": shippingAddress.addr1,
                        "Address2": shippingAddress.addr2,
                        "City": shippingAddress.city,
                        "Region": shippingAddress.state,
                        "RegionCode":shippingAddress.state,
                        "Country": shippingAddress.country,
                        "CountryCode": shippingAddress.country,
                        "Zip": shippingAddress.zip,
                        "Phone": shippingAddress.phone,
                    };



                    // Not necessary
                    // klaviyoObject["customer_properties"] = customer_properties;

                    var addedToCartEventData = {
                        'event':'klaviyoPlacedOrder',
                        'klaviyo_data': klaviyoObject
                    };
                    // window["dataLayer"].push(addedToCartEventData);


                })

            }
        }
    }

	return TavanoKlaviyoOrderSync;
});
