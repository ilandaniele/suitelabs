define('AwaLabs.BackInStockNotification', [
    'Profile.Model',
    'BackInStockNotification.PDP.View',
    'InventoryDisplay.PDP.View',
    'BackInStockNotification.StockNotifications.Subscription.Create.View'
], function BackInStockNotification(
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var profile;
            var pdpInfo;
            var itemInfo;
            var itemStock;
            if (layout && pdp) {
                layout.addToViewContextDefinition('Cart.AddToCart.Button.View', 'isCurrentItemPurchasable', 'boolean', function fn(context) {
                    profile = ProfileModel.getInstance();
                    pdpInfo = pdp && pdp.getStockInfo();
                    if (profile.get('isTrade')) {
                        return true;
                    }
                    if (pdpInfo) {
                        return pdpInfo.isInStock;
                    }
                    return context.isCurrentItemPurchasable;
                });
                layout.addToViewContextDefinition('Cart.AddToCart.Button.View', 'isTradeAndNotIsBackOrderable', 'boolean', function fn() {
                    profile = ProfileModel.getInstance();
                    itemInfo = pdp && pdp.getItemInfo();
                    itemStock = pdp && pdp.getStockInfo();

                    return profile.get('isTrade') &&
                        itemInfo &&
                        itemInfo.item &&
                        !itemInfo.item.isbackorderable &&
                        itemStock &&
                        !itemStock.isInStock;
                });
            }
        }
    };
});
