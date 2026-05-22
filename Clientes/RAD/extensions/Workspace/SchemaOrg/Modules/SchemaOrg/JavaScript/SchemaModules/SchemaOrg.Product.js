define('SchemaOrg.Product', [
    'SchemaOrg.BaseModule',
    'Product.Model',
    'Item.Model',
    'Backbone',
    'Utils',
    'jQuery',
    'underscore'
], function SchemaOrgPDP(
    SchemaOrgBaseModule,
    ProductModel,
    ItemModel,
    Backbone,
    Utils,
    jQuery,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'product',

        init: function initialize(options) {
            var self = this;
            this.model = options.view.model;
            this.itemModel = options.view.model.get('item');
            this.reviews = [];
            this.application = options.application;
            this.pusher = options.pusher;
            this.addToPusher();

            Backbone.Events.on('SchemaOrg:Reviews', function schemaReviews(reviewCollection) {
                self.reviews = reviewCollection;
                self.addToPusher();
            });
        },

        getChildUrl: function getChildUrl(parentItem, item) {
            var productModel = new ProductModel(Utils.deepCopy(parentItem));
            var matrixOptions = productModel.get('options').where({ isMatrixDimension: true });

            _.each(matrixOptions, function eachOption(option) {
                var optionObject = _.findWhere(option.get('values'), { label: item.get(option.get('itemOptionId')) });
                if (optionObject) {
                    option.set('value', {
                        internalid: optionObject.internalid,
                        label: optionObject.label
                    });
                }
            });

            return productModel.getQuery();
        },

        getDescription: function getDescription(item) {
            var description = item.get('custitem_retail_romance_desc')
            || item.get('storedescription')
            || item.get('storedetaileddescription');

            return jQuery('<div/>').html(description).text();
        },

        getImage: function getImage(item, parentItem) {
            var imageNotAvailable = this.application.getComponent('Environment').getConfig('imageNotAvailable');
            var thumbnail = item.getThumbnail();

            if (
                thumbnail
                && parentItem
                && thumbnail.url
                && thumbnail.url.indexOf(imageNotAvailable) >= 0
            ) {
                thumbnail = parentItem.getThumbnail();
            }

            return Utils.resizeImage(
                SC.ENVIRONMENT.siteSettings.imagesizes || [],
                thumbnail.url,
                'fullscreen'
            );
        },

        getName: function getName(item) {
            // Using a custom getName since natively the Item Model will prioritize storedisplayname2
            // which is not user friendly
            return item.get('displayname') || item.get('storedisplayname2') || item.get('itemid') || '';
        },

        generateProductJson: function generateProductJson(item) {
            var itemBaseUrl = location.origin + item.get('_url');

            return {
                '@context': 'https://schema.org',
                '@type': 'Product',
                'url': itemBaseUrl,
                'name': this.getName(item),
                'description': this.getDescription(item),
                'sku': item.get('_sku'),
                'gtin': item.get('upccode'),
                'brand': {
                    '@type': 'Brand',
                    'name': item.get('custitem_brand')
                },
                'image': this.getImage(item),
                'offers': {
                    '@type': 'Offer',
                    'priceCurrency': 'USD',
                    'price': item.getPrice().price,
                    'itemCondition': 'https://schema.org/NewCondition',
                    'availability': 'https://schema.org/' + (item.getStockInfo().isInStock ? 'InStock' : 'OutOfStock'),
                    'url': location.origin + item.get('_url')
                }
            };
        },

        generateProductGroupJson: function generateProductGroupJson(item) {
            var itemBaseUrl = location.origin + item.get('_url');

            return {
                '@context': 'https://schema.org',
                '@type': 'ProductGroup',
                'name': this.getName(item),
                'brand': {
                    '@type': 'Brand',
                    'name': item.get('custitem_brand')
                },
                'description': this.getDescription(item),
                'hasVariant': this.generateChildrenProductJson(item),
                'productGroupID': item.get('_sku'),
                'url': itemBaseUrl
            };
        },

        generateProductVariantJson: function generateProductVariantJson(parentItem, item) {
            return {
                '@type': 'Product',
                'name': this.getName(item),
                'image': this.getImage(item, parentItem),
                'gtin': item.get('upccode'),
                'sku': item.get('_sku'),
                'offers': {
                    '@type': 'Offer',
                    'priceCurrency': 'USD',
                    'price': item.getPrice().price,
                    'itemCondition': 'https://schema.org/NewCondition',
                    'availability': 'https://schema.org/' + (item.getStockInfo().isInStock ? 'InStock' : 'OutOfStock'),
                    'url': location.origin + parentItem.get('_url') + this.getChildUrl(parentItem, item)
                }
            };
        },

        generateChildrenProductJson: function generateChildrenProductJson(item) {
            var childrenInfo = item.get('matrixchilditems_detail');
            var products = [];
            var i;

            for (i = 0; i < childrenInfo.length; i++) {
                products.push(this.generateProductVariantJson(
                    item,
                    new ItemModel(childrenInfo[i])
                ));
            }

            return products;
        },

        createJSONLD: function createJSONLD() {
            var environmentComponent = this.application.getComponent('Environment');
            var childrenInfo = this.itemModel.get('matrixchilditems_detail');
            var hasChildren = childrenInfo && childrenInfo.length;
            var jsonLDObject = hasChildren ? this.generateProductGroupJson(this.itemModel) : this.generateProductJson(this.itemModel);

            if (this.reviews && this.reviews.review_count) {
                jsonLDObject.aggregateRating = {
                    '@type': 'AggregateRating',
                    'ratingValue': this.reviews.average_rating || 0,
                    'bestRating': environmentComponent.getConfig('productReviews.maxRate') || 5,
                    'worstRating': 0,
                    'ratingCount': this.reviews.review_count
                };

                jsonLDObject.review = [];
            }

            return jsonLDObject;
        }
    });
});
