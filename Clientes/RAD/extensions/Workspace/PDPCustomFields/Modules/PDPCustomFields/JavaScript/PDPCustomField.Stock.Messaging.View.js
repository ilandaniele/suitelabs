define('PDPCustomField.Stock.Messaging.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_stock_messaging.tpl'
], function PDPCustomFieldStockMessagingViewModule(
    BaseView,
    PDPCustomFieldStockMessagingTpl
) {
    'use strict';

    function StockMessageView(options) {
        BaseView.call(this, options);
        this.template = PDPCustomFieldStockMessagingTpl;
    }

    StockMessageView.prototype = Object.create(BaseView.prototype);

    StockMessageView.prototype.constructor = StockMessageView;

    StockMessageView.prototype.getContext = function getContext() {
        return {
            stockMessage: this.getItem().custitem_pdp_stock_messaging
        };
    };

    return StockMessageView;
});
