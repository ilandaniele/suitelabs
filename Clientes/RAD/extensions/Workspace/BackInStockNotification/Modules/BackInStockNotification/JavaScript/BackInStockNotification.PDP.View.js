define('BackInStockNotification.PDP.View', [
    'underscore',
    'Profile.Model',
    'suitecommerce_stocknotifications_pdp.tpl',
    'SuiteCommerce.StockNotifications.PDP'
], function BackInStockNotificationPDPView(
    _,
    ProfileModel,
    BackinStockTemplateCustom
) {
    'use strict';

    var SuiteCommerceStockNotificationsPDPView;
    var SuiteCommerceStockNotificationsPDP;
    var PDPModel1;

    try {
        SuiteCommerceStockNotificationsPDPView = require('SuiteCommerce.StockNotifications.PDP.View'); // eslint-disable-line global-require
        SuiteCommerceStockNotificationsPDP = require('SuiteCommerce.StockNotifications.PDP'); // eslint-disable-line global-require
        PDPModel1 = require('SuiteCommerce.StockNotifications.PDP.Model'); // eslint-disable-line global-require
        if (SuiteCommerceStockNotificationsPDPView && SuiteCommerceStockNotificationsPDPView.PdpView &&
            SuiteCommerceStockNotificationsPDPView && SuiteCommerceStockNotificationsPDPView.PdpView.prototype) {
            _.extend(SuiteCommerceStockNotificationsPDPView.PdpView.prototype, {
                template: BackinStockTemplateCustom,
                itemShouldShowStockSubscription: function itemShouldShowStockSubscription() {
                    var profile = ProfileModel.getInstance();
                    var isTrade = profile.get('isTrade');
                    var childs = this.pdp.getSelectedMatrixChilds();
                    var stockInfo = this.pdp.getStockInfo();
                    return !(isTrade || (childs && childs.length > 1) || stockInfo.isInStock);
                }
            });
        }

        _.extend(SuiteCommerceStockNotificationsPDP, {
            addPdpChildView: function addPdpChildView(container, pdp) {
                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'Product.Stock.Info': {
                        'StockNotifications.PDP': {
                            childViewIndex: 10,
                            childViewConstructor: function childViewConstructor() {
                                if (!pdp.getItemInfo().item.keyMapping_showGrid) {
                                    return new SuiteCommerceStockNotificationsPDPView.PdpView({
                                        pdp: pdp,
                                        container: container,
                                        model: new PDPModel1.PdpModel()
                                    });
                                }
                                return null;
                            }
                        }
                    }
                });
            }
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});
