/**
 * Created by ammann on 7/21/17.
 */

define('Cart.Detailed.View.Site', [
    'Cart.Detailed.View',
    'underscore',
    'SC.Configuration'
],
    function CartDetailedViewSite(
        View,
        _,
        Configuration
    ) {
        'use strict';

        _.extend(View.prototype, {
            events: _.extend(View.prototype.events || {}, {
                'click input[name="delivery-options"]': 'changeDeliveryOptions'
            }),
            /* eslint-disable */
            changeDeliveryOptions: function (e) {
                /* eslint-enable */
                var shipMethod = this.$(e.target).val();
                var self = this;
                e.preventDefault();
                this.model.set('shipmethod', shipMethod);
                /* eslint-disable */
                this.model.save().always(function () {
                    /* eslint-disable */
                    self.showContent();
                });
            },
            getContext: function () {
                var lines = this.model.get('lines')
                    , product_count = lines.length
                    , item_count = _.reduce(lines.models, function (memo, line) { return memo + line.get('quantity'); }, 0)
                    , product_and_items_count = '';

                if (product_count === 1) {
                    if (item_count === 1) {
                        product_and_items_count = _('1 Product, 1 Item').translate();
                    }
                    else {
                        product_and_items_count = _('1 Product, $(0) Items').translate(item_count);
                    }
                }
                else {
                    if (item_count === 1) {
                        product_and_items_count = _('$(0) Products, 1 Item').translate(product_count);
                    }
                    else {
                        product_and_items_count = _('$(0) Products, $(1) Items').translate(product_count, item_count);
                    }
                }

                // @class Cart.Detailed.View.Context
                return {

                    //@property {LiveOrder.Model} model
                    model: this.model
                    //@property {Boolean} showLines
                    , showLines: !!(lines && lines.length)
                    //@property {Orderline.Collection} lines
                    , lines: lines
                    //@property {String} productsAndItemsCount
                    , productsAndItemsCount: product_and_items_count
                    //@property {Number} productCount
                    , productCount: product_count
                    //@property {Number} itemCount
                    , itemCount: item_count
                    //@property {String} pageHeader
                    , pageHeader: this.page_header
                    , showPaypalButton: Configuration.get('siteSettings.checkout.paypalexpress.available', 'F') === 'T'
                    // @property {String} paypalButtonImageUrl
                    , paypalButtonImageUrl: Configuration.get('paypalButtonImageUrl', 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png')
                };
                // @class Cart.Detailed.View
            }
        });
    });
