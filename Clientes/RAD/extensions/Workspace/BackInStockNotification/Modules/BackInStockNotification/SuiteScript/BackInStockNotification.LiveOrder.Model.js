define('BackInStockNotification.LiveOrder.Model', [
    'underscore',
    'LiveOrder.Model',
    'StoreItem.Model',
    'SC.Models.Init',
    'Configuration'
], function BackInStockNotificationLiveOrderModel(
    _,
    LiveOrderModel,
    StoreItem,
    ModelsInit,
    Configuration
) {
    'use strict';


    _.extend(LiveOrderModel, {
        invalidAddToCartError: {
            status: 500,
            code: 'INVALID_ADD_TO_CART_ERROR',
            message: 'Invalid add to cart error'
        },
        validateAddLine: function validateAddLine(lines) {
            // is Out of stock and (Anonymous users or is not Trade) throw error
            var item;
            var customFields = ModelsInit.customer.getCustomFieldValues();
            var isTradeField = _.findWhere(customFields, { name: 'custentity_rad_web_customer_type' });
            var isNotTrade = !(isTradeField && isTradeField.value && isTradeField.value === Configuration.get('ProfileUtilsTradeCustomerType'));
            var self = this;
            if (isNotTrade) {
                StoreItem.preloadItems(_.pluck(lines, 'item'));
                _.each(lines, function each(line) {
                    item = StoreItem.get(line.item.internalid, line.item.type);
                    if (item && !item.isinstock) {
                        throw self.invalidAddToCartError;
                    }
                });
            }
        },
        addLines: _.wrap(LiveOrderModel.addLines, function addLine(fn, lines) {
            this.validateAddLine(lines);
            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });
});
