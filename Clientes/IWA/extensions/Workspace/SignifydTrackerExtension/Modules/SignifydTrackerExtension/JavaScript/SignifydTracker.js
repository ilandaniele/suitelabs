define( 'SignifydTracker', [
    'SignifydTracker.Model',
	'Tracker',
	'underscore',
	'jQuery'

], function (
    SignifydTrackerModel,
    Tracker,
    _,
    jQuery

) {

    var SignifydTracker = {
        trackTransaction: function ( order ) {
            if ( SC.ENVIRONMENT.jsEnvironment === 'browser' ) {
                try {
                    var config = this.application.getConfig( 'signifyd' );
                    if (config && config.enableSignifyd) {
                        var self = this;
                        //console.log("order", order);
                        var signifydTrackerModel = new SignifydTrackerModel();
                        var request = {
                            "purchase": {
                                "orderSessionId": $.cookie("SignifydSessionId"),
                                "browserIpAddress": "192.168.1.1",
                                "orderId": order.get('confirmationNumber'),
                                "createdAt": (new Date).toISOString(),
                                "transactionId": order.get('confirmationNumber'),
                                "currency": "USD",
                                "orderChannel": "WEB",
                                "totalPrice": order.get('total').toFixed(2).toString(),
                                "discountcodes": self.getDiscountCodes(order),
                                "shipments": self.getShipments(order),
                                "products": self.getProducts(order),
                            }
                        };
                        var promise = signifydTrackerModel.save(request);
                        if(promise) {
                            promise.always(function (response) {
                                //console.log("response", response);
                            });
                        }
                    }
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            
            jQuery.cookie("SignifydSessionId", null, {path:'/'});
            return this;
        },

        getDiscountCodes: function (order) {
            var output = [];
            return output;
        },

        getShipments: function (order) {
            var output = [];

            return output;
        },

        getProducts: function (order) {
            var output = [];
            order.get( 'products' ).each( function ( product ) {
                output.push({
                    "itemId": product.get('sku').toString(),
                    "itemName": product.get('name').toString(),
                    "itemIsDigital": false,
                    "itemCategory": product.get('category') || '',
                    "itemQuantity": product.get('quantity').toString(),
                    "itemPrice": product.get('rate').toString(),
                    "shipmentId": ""
                });
            });

            return output;
        },
        setCookie: function (key, value, expiry) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        },
    
        getCookie: function (key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        },

        setUp: function () {
            
            var signifydSessionId = this.getCookie("SignifydSessionId");
            if(signifydSessionId == null || signifydSessionId == "null") {
                signifydSessionId = Math.random().toString(36).substr(2, 9) + "_" + Math.random().toString(36).substr(2, 9);
                this.setCookie("SignifydSessionId", signifydSessionId, 7);
            }
            if(signifydSessionId != null && document.getElementById('sig-api') == null) {
                var s = document.createElement('script');
                var e = !document.body ? document.querySelector('head') : document.body;
                s.src = 'https://cdn-scripts.signifyd.com/api/script-tag.js';
                s.defer = true;
                s.id="sig-api";
                s.setAttribute("data-order-session-id", signifydSessionId);
                //e.appendChild(s);

                jQuery("head").append(s);
            }
        }
    };

    return SignifydTracker;
} );
