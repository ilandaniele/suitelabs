define('BackInStockNotification.StockNotifications.Subscription.Create.View', [
    'underscore',
    'suitecommerce_stocknotifications_subscription_create.tpl'
], function BackInStockNotificationStockNotificationsSubscriptionCreateView(
    _,
    backInStockSubscriptionCustom
) {
    'use strict';

    var SuiteCommerceStockNotificationsSubscriptionCreateView;
    try {
        SuiteCommerceStockNotificationsSubscriptionCreateView =
            require('SuiteCommerce.StockNotifications.Subscription.Create.View'); // eslint-disable-line global-require
        _.extend(SuiteCommerceStockNotificationsSubscriptionCreateView.SubscriptionCreateView.prototype, {
            template: backInStockSubscriptionCustom
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});
