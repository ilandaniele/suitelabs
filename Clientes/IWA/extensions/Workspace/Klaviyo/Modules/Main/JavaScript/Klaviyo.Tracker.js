define('Klaviyo.Tracker', [
    'GoogleTagManager',
    'Configuration',
    'LiveOrder.Model',
    'Profile.Model',
    'underscore'
], function KlaviyoTracker(
    GoogleTagManager,
    Configuration,
    LiveOrderModel,
    ProfileModel,
    _
) {
    'use strict';

    var getItems = function getItems() {
        var liveOrder = LiveOrderModel.getInstance();
        var lines = liveOrder.get('lines');
        var result = [];

        lines.each(function eachLine(line) {
            var item = line.get('item');

            result.push({
                'ProductID': item.get('itemid'),
                'SKU': item.get('_sku'),
                'ProductName': item.get('_name'),
                'Quantity': line.get('quantity'),
                'ItemPrice': line.get('rate'),
                'RowTotal': line.get('amount'),
                'ProductURL': window.location.protocol + '//' + window.location.host + item.get('_url')
            });
        });

        return result;
    };

    return {
        trackAddToCart: function trackAddToCart(line) {
            var eventName = 'klaviyoAddToCart';
            var liveOrder;
            var eventData;
            var item;

            if (line) {
                liveOrder = LiveOrderModel.getInstance();
                item = line.get('item');

                eventData = {
                    event: eventName,
                    ecommerce: {
                        currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                        add: {
                            data: {
                                '$value': liveOrder.get('summary').subtotal,
                                'AddedItemSKU': item.get('itemid'),
                                'AddedItemProductID': item.get('itemid'),
                                'AddedItemProductName': item.get('_name'),
                                'AddedItemPrice': line.get('rate'),
                                'AddedItemQuantity': line.get('quantity'),
                                'Items': getItems()
                            }
                        }
                    }
                };

                GoogleTagManager.pushData(eventData);
            }
        },

        trackProceedToCheckout: function trackProceedToCheckout() {
            var eventName = 'klaviyoProceedToCheckout';
            var liveOrder;
            var eventData;
            var profile;
            var items;

            liveOrder = LiveOrderModel.getInstance();
            profile = ProfileModel.getInstance();
            items = getItems();

            eventData = {
                event: eventName,
                ecommerce: {
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    add: {
                        data: {
                            '$event_id': profile.get('email') + '_' + parseInt(Date.now() / 1000, 10),
                            '$value': liveOrder.get('summary').subtotal,
                            'ItemNames': _.pluck(items, 'ProductName'),
                            'CheckoutURL': window.location.protocol
                                + '//'
                                + window.location.host
                                + Configuration.siteSettings.touchpoints.checkout,
                            'Items': items
                        }
                    }
                }
            };

            GoogleTagManager.pushData(eventData);
        }
    };
});
