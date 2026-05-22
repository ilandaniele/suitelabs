define('WishlistNotifyText', [
    'ProductList.Control.View',
    'wishlist_notify_text_product_list_control.tpl',
    'underscore'
], function WishlistNotifyText(
    ProductListControlView,
    WishlistNotifyTextTpl,
    _
) {
    'use strict';

    _.extend(ProductListControlView.prototype, {
        render: _.wrap(ProductListControlView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_product_list_control') {
                this.template = WishlistNotifyTextTpl;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });

    return {
        mountToApp: function mountToApp(container) {
            var pdpComponent = container.getComponent('PDP');

            if (pdpComponent) {
                pdpComponent.addToViewContextDefinition('ProductList.Control.View', 'showNotifyLaterText', 'boolean', function showNotifyLaterText() {
                    var iteminfo = pdpComponent.getItemInfo();
                    var stockStatus = iteminfo.item.custitemstockstatus;
                    return stockStatus === 'On Backorder';
                });
            }
        }
    };
});
