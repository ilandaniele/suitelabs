define('StrikethroughPricesMiniCart.View', [
    'strikethrough_prices_mini_cart.tpl',
    'SCView',
    'jQuery'
], function StrikethroughPricesMiniCartViewModule(
    StrikethroughPricesMiniCartTpl,
    SCViewComponent,
    jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function StrikethroughPricesMiniCartView(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};
        this.template = StrikethroughPricesMiniCartTpl;

        this.options.Layout.cancelableOn('changeColor', function changeColor() {
            var selector = jQuery('.header-menu-cart').find('.product-views-price-old');

            if (selector.length > 0) {
                selector.each(function eachElement() {
                    // this refers to each child
                    jQuery(this).parent('.header-mini-cart-item-cell-product-price').css('color', 'red');
                });
            }
            // self.changeSelectorColor();
        });
    }


    StrikethroughPricesMiniCartView.prototype = Object.create(SCView.prototype);
    StrikethroughPricesMiniCartView.prototype.constructor = StrikethroughPricesMiniCartView;

    StrikethroughPricesMiniCartView.prototype.changeSelectorColor = function changeSelectorColor() {

    };

    StrikethroughPricesMiniCartView.prototype.getContext = function getContext() {
        // var item = this.contextData.item();
        // var salePrice = item.pricelevel20;
        // var regularPrice = item.keyMapping_price;

        // podes estar en el cart sin un producto en sale agregado y estar a la vez en una pdp con
        // un producto en sale

        // this.$('.header-menu-cart').children('.product-views-price-old')
        //
        // this.$('.header-menu-cart').find('.product-views-price-old').parent().css('color','red')
        //
        // jQuery('.product-views-price-old').parents('')
        // this.$('.product-views-price-old')
        // .parents('.header-mini-cart-item-cell-product-price')
        // .
        //
        // if ($elem.parents('.left').length) {
        //
        // }
        // if()
        // if (salePrice !== regularPrice) {
        //     jQuery('.header-mini-cart-item-cell-product-price').css({
        //         'color': 'red !important'
        //     });
        //
        //     jQuery('.header-mini-cart-item-cell-product-price.product-views-price-old').css({
        //         'color': 'black'
        //     });
        // }

        return { };
    };

    return StrikethroughPricesMiniCartView;
});
