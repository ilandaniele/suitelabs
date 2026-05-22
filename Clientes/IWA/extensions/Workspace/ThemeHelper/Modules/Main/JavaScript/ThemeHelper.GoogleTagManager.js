/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.GoogleTagManager', [
    'Profile.Model',
    'GoogleTagManager',
    'Tracker',
    'underscore'
], function ThemeHelperGoogleTagManager(
    ProfileModel,
    GoogleTagManager,
    Tracker,
    _
) {
    'use strict';

    GoogleTagManager.trackAddToWishlist = function trackAddToWishlist(line) {
        var item;
        var eventName;
        var eventData;
        if (line) {
            item = line.get('item');
            eventName = 'addToWishlist';
            eventData = {
                event: eventName,
                data: {
                    action: 'Add To Wishlist',
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    sku: item.get('itemid'),
                    id: item.get('itemid'),
                    name: item.get('_name'),
                    price: item.get('_priceDetails').onlinecustomerprice,
                    category: 'Shopping - User Interaction',
                    item_category: this.getCategory()
                },
                ecommerce: {
                    items: [
                        {
                            action: 'Add To Wishlist',
                            currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            sku: item.get('itemid'),
                            id: item.get('itemid'),
                            name: item.get('_name'),
                            price: item.get('_priceDetails').onlinecustomerprice,
                            category: 'Shopping - User Interaction',
                            item_category: this.getCategory()
                        }
                    ]
                }
            };
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace
            // data before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData, line);
            this.pushData(eventData);
        }
        return this;
    };

    GoogleTagManager.trackAddToCart = function trackAddToCart(line) {
        var selectedOptions;
        var item;
        var eventName;
        var eventData;
        if (line) {
            selectedOptions = line.get('options').filter(function filter(option) {
                return option.get('value') && option.get('value').label;
            });
            item = line.get('item');
            eventName = 'addToCart';
            eventData = {
                event: eventName,
                ecommerce: {
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    add: {
                        products: [
                            {
                                sku: item.get('itemid'),
                                id: item.get('itemid'),
                                name: item.get('_name'),
                                price: item.get('_priceDetails').onlinecustomerprice,
                                variant: _.map(selectedOptions, function map(option) {
                                    return option.get('value').label;
                                }).join(', '),
                                category: this.getCategory(),
                                quantity: line.get('quantity'),
                                currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                            }
                        ]
                    }
                }
            };
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace
            // data before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData, line);
            this.pushData(eventData);
        }
        return this;
    };

    GoogleTagManager.trackProductClick = function trackProductClick(item) {
        var eventName = 'productClick';
        var eventData = {
            event: eventName,
            ecommerce: {
                click: {
                    actionField: { list: item.get('list') },
                    products: [
                        {
                            name: item.get('name'),
                            price: item.get('price'),
                            sku: item.get('sku', true),
                            id: item.get('sku', true),
                            category: item.get('category'),
                            position: item.get('position'),
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                        }
                    ]
                }
            }
        };
        // We set this item in this Tracker to later be read it by the trackProductView event
        this.item = item;
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        this.pushData(eventData);
        Tracker.trigger(eventName, eventData, item);
        return this;
    };

    GoogleTagManager.trackPageviewForCart = function trackPageviewForCart(data) {
        var eventName;
        var eventData1;
        if (_.isString(data.url)) {
            eventName = 'cartView';
            eventData1 = {
                event: eventName,
                data: {
                    page: data.url,
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    total: data.total || '',
                    items: []
                }
            };
            if (data.items && data.items.length) {
                data.items.each(function each(item) {
                    eventData1.data.items.push({
                        sku: item.get('item').get('itemid'),
                        id: item.get('item').get('itemid'),
                        title: item.get('item').get('displayname'),
                        price: item.get('rate_formatted'),
                        quantity: item.get('quantity'),
                        image: (item.get('item').get('itemimages_detail').urls &&
                            item.get('item').get('itemimages_detail').urls.length &&
                            item.get('item').get('itemimages_detail').urls[0].url) ||
                            '',
                        currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                    });
                });
            }
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace data
            // before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData1, data.url);
            this.pushData(eventData1);
        }
        return this;
    };

    GoogleTagManager.trackProductView = function trackProductView(product) {
        var item = product.getItem();
        var eventName;
        var selectedOptions;
        var price;
        var result;
        var itemList;
        var eventData;
        if (this.item && this.item.get('itemId') === item.get('_id')) {
            item.set('category', this.item.get('category'), { silent: true });
            item.set('list', this.item.get('list'), { silent: true });
        }
        eventName = 'productView';
        selectedOptions = product.get('options').filter(function filter(option) {
            return option.get('value') && option.get('value').label;
        });
        price = product.getPrice();
        result = this.findCategoryAndListInDataLayer(product);
        itemList = item.get('list') || (result ? result.list : '');
        eventData = {
            event: eventName,
            ecommerce: {
                detail: {
                    actionField: {
                        list: itemList
                    },
                    products: [
                        {
                            name: item.get('_name'),
                            sku: product.getSku(),
                            id: product.getSku(),
                            category: item.get('category') || (result ? result.category : ''),
                            variant: _.map(selectedOptions, function map(option) {
                                return option.get('value').label;
                            }).join(', '),
                            price: (price.price ? price.price : 0).toFixed(2),
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            item_list_name: itemList
                        }
                    ]
                }
            },
            page: this.getCategory()
        };
        this.item = null;
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        Tracker.trigger(eventName, eventData, item);
        this.pushData(eventData);
        return this;
    };

    GoogleTagManager.trackTransaction = function trackTransaction(transaction) {
        var self = this;
        var profile = ProfileModel.getInstance();
        var eventName = 'transaction';
        var eventData = {
            event: eventName,
            ecommerce: {
                purchase: {
                    actionField: {
                        id: transaction.get('confirmationNumber'),
                        email: profile.get('email'),
                        phone: profile.get('phone'),
                        affiliation: '',
                        revenue: transaction.get('subTotal') +
                            transaction.get('taxTotal') +
                            transaction.get('shippingCost') +
                            transaction.get('handlingCost'),
                        currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                        subtotal: transaction.get('subTotal'),
                        tax: transaction.get('taxTotal'),
                        shipping: transaction.get('shippingCost') + transaction.get('handlingCost'),
                        coupon: []
                    },
                    products: []
                }
            }
        };
        _.each(transaction.get('promocodes'), function get(promo) {
            eventData.ecommerce.purchase.actionField.coupon.push(promo.code);
        });
        transaction.get('products').each(function each(product) {
            var result = self.findCategoryAndListInDataLayer(product);
            eventData.ecommerce.purchase.products.push({
                name: product.get('name'),
                sku: product.get('sku'),
                id: product.get('internalid'),
                price: product.get('rate'),
                category: result ? result.category || '' : '',
                variant: product.get('options'),
                quantity: product.get('quantity'),
                currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
            });
        });
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        Tracker.trigger(eventName, eventData, transaction);
        this.pushData(eventData);
        return this;
    };
});
