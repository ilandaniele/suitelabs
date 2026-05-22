define('AwaLabs.InventoryDisplayFix', [
    'SC.Configuration',
    'jQuery',
    'underscore'
], function AwaLabsInventoryDisplayFix(
    Configuration,
    jQuery,
    _
) {
    'use strict';

    /* eslint-disable global-require */
    var inventoryDisplayWebsiteModelModule;

    try {
        inventoryDisplayWebsiteModelModule = require('SuiteCommerce.InventoryDisplay.Website.Model');
        inventoryDisplayWebsiteModelModule.WebsiteModel.prototype.fetch = function fetch() {
            return jQuery.Deferred().resolve({
                dropShipSpecialOrderItemsAlwaysInStock: Configuration.get('inventoryDisplay.dropShipSpecialOrderItemsAlwaysInStock')
            });
        };
    } catch (error) {
        console.log('Error overriding the InventoryDisplay.Website.Model', error);
    }

    return {
        mountToApp: function mountToApp(container) {
            var promise;
            var websiteModel;
            var inventoryDisplayMessageView;
            var inventoryDisplayWebsiteModel;
            var inventoryDisplayMessageSpecialOrderItemView;
            var inventoryDisplayMessageDropShipItemView;
            var inventoryDisplayMessageRegularItemView;
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var websiteId = environment.getSiteSetting('id');

            try {
                inventoryDisplayMessageView = require('SuiteCommerce.InventoryDisplay.Message.View');
                if (inventoryDisplayMessageView && inventoryDisplayMessageView.InventoryDisplayMessageView) {
                    _.extend(inventoryDisplayMessageView.InventoryDisplayMessageView.prototype, {
                        isEnabledMessagingForItem: function isEnabledMessagingForItem() {
                            return !this.item.custitem_ns_sc_ext_id_hide_invt_msg;
                        }
                    });
                }
            } catch (e) {
                console.log('Error in item AwaLabs.ItemOptions', e);
            }

            if (pdp) {
                try {
                    inventoryDisplayWebsiteModel = require('SuiteCommerce.InventoryDisplay.Website.Model');
                    inventoryDisplayMessageSpecialOrderItemView = require('SuiteCommerce.InventoryDisplay.Message.SpecialOrderItem.View');
                    inventoryDisplayMessageDropShipItemView = require('SuiteCommerce.InventoryDisplay.Message.DropShipItem.View');
                    inventoryDisplayMessageRegularItemView = require('SuiteCommerce.InventoryDisplay.Message.RegularItem.View');
                    websiteModel = new inventoryDisplayWebsiteModel.WebsiteModel();
                    promise = websiteModel.fetch({
                        data: {
                            websiteId: websiteId
                        }
                    });
                    pdp.addChildView('Product.Stock.Info', function ProductStockInfoChildView() {
                        var item = pdp.getItemInfo().item;
                        var view;
                        if (item.itemtype !== 'Kit') {
                            return;
                        }
                        if (item.isspecialorderitem) {
                            view = new inventoryDisplayMessageSpecialOrderItemView.SpecialOrderItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        } else if (item.isdropshipitem) {
                            view = new inventoryDisplayMessageDropShipItemView.DropShipItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        } else {
                            view = new inventoryDisplayMessageRegularItemView.ItemMessageView({
                                pdp: pdp,
                                model: websiteModel
                            });
                        }
                        promise.done(function promiseDone() {
                            view.loaded();
                        });
                        return view; // eslint-disable-line consistent-return
                    });
                } catch (e) {
                    console.log('ERROR in InventoryDisplayFix', e);
                }
            }
        }
    };
});
