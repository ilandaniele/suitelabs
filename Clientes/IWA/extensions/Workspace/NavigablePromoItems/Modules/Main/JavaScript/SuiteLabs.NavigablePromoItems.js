define('SuiteLabs.NavigablePromoItems', [
    'Cart.Detailed.View',
    'Cart.Lines.Free.View',

    'suitelabs_cart_lines_free.tpl',

    'Configuration',
    'GlobalViews.Message.View',

    'underscore'
], function NavigablePromoItems(
    CartDetailedView,
    CartLinesFreeView,

    cartLinesFreeTpl,

    Configuration,
    GlobalViewsMessageView,

    _
) {
    'use strict';

    var configuration = Configuration.navPromoItems || {
        promoTexts: []
    };

    _(CartDetailedView.prototype).extend({
        childViews: _(CartDetailedView.prototype.childViews).extend({
            'FreeGift.Info': function freeGiftInfo() {
                var message;
                var freeGifts = _(this.model.get('lines').models || []).filter(function eachLine(line) {
                    return line.get('free_gift') === true;
                });
                var freeGiftCode;
                var freeGiftData;

                if (freeGifts.length === 1) {
                    try {
                        freeGiftCode = String(freeGifts[0].get('free_gift_info').promotion_couponcode);
                        freeGiftData = _(configuration.promoTexts).findWhere({ promoCode: freeGiftCode }) || {};
                    } catch (e) {
                        freeGiftData = {};
                    }
                    message = _.translate(
                        freeGiftData.promoText || 'The following item is free but it may generate shipping costs.'
                    );
                } else if (freeGifts.length > 1) {
                    message = _.translate(
                        'The following items are free but they may generate shipping costs.'
                    );
                }

                return message ? new GlobalViewsMessageView({
                    message: message,
                    type: 'info',
                    closable: false
                }) : null;
            }
        })
    });

    _(CartLinesFreeView.prototype).extend({
        initialize: _(CartLinesFreeView.prototype.initialize).wrap(
            function initialize(fn) {
                this.template = cartLinesFreeTpl;
                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        )
    });
});
