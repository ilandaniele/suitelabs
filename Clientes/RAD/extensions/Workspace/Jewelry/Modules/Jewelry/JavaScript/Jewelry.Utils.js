define('Jewelry.Utils', [

], function JewelryItemKeyMapping(

) {
    'use strict';

    return {
        isJewelry: function isJewelry(item, environmentComponent) {
            var jewelryConfig = environmentComponent.getConfig('jewelry');
            var productCategory = item[jewelryConfig.productTypeFieldId];

            return productCategory && productCategory === jewelryConfig.productTypeFieldValue;
        },

        getJewelrySummary: function getJewelrySummary(summary) {
            var summaryJewelry = summary && summary.jewelry;

            if (summaryJewelry) {
                summaryJewelry.singleItem = summaryJewelry.jewelry_count && summaryJewelry.jewelry_count <= 1;
            }
            return summaryJewelry;
        },

        getNewItemCount: function getNewItemCount(itemCount, summary) {
            var summaryJewelry = summary && summary.jewelry;

            return itemCount - (summaryJewelry && summaryJewelry.jewelry_count ? summaryJewelry.jewelry_count : 0);
        },

        cartContextDefinitions: function cartContextDefinitions(cart) {
            var self = this;
            
            cart.addToViewContextDefinition('Cart.Summary.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.summary);
            });

            cart.addToViewContextDefinition('Cart.Summary.View', 'itemCount', 'number', function itemCount(context) {
                return self.getNewItemCount(context.itemCount, context.summary);
            });
        },

        layoutContextDefinitions: function layoutContextDefinitions(layout, environment) {
            var self = this;

            layout.addToViewContextDefinition('Header.MiniCart.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'radItems', 'number', function itemsInCart(context) {
                return self.getNewItemCount(context.itemsInCart, context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'showPluraLabel', 'number', function showPluraLabel(context) {
                var radItems = self.getNewItemCount(context.itemsInCart, context.model.summary);
                return radItems === 0 || radItems > 1;
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'isJewelry', 'boolean', function isJewelry(context) {
                return self.isJewelry(context.model.item || context.model, environment);
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'shippingWarning', 'string', function shippingWarning() {
                return environment.getConfig('jewelry.shippingWarning');
            });
        }
    };
});
