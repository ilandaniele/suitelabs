define('AwaLabs.BulbUpsell', [
    'Application',
    'StoreItem.Model',
    'underscore',
    'Configuration',
    'Models.Init'
], function AwaLabsBulbUpsell(
    Application,
    StoreItem,
    _,
    Configuration,
    ModelsInit
) {
    'use strict';

    Application.on('after:Profile.update', function afterProfileUpdate(model, result, data) {
        var customerUpdate;
        try {
            customerUpdate = {
                customfields: {
                    custentity_bulb_option_selected: data.selectedBulb === 'normal' ? 'T' : 'F',
                    custentity_bulb_frosted_selected: data.selectedBulb === 'frosted' ? 'T' : 'F',
                    custentity_no_bulb_option_selected: data.selectedBulb === 'frosted' || data.selectedBulb === 'normal' ? 'F' : 'T'
                }
            };
            ModelsInit.customer.updateProfile(customerUpdate);
        } catch (e) {
            nlapiLogExecution('ERROR', 'Error updating custom entity fields', e);
        }
    });

    Application.on('after:LiveOrder.addLines', function afterAddLines(Model, response, lineData) {
        var bulbItemOption;
        var bulbQtyOption;
        var bulbItemLine;
        var preloadItems;
        var item;
        var bulbEnabled = Configuration.get('bulbs.enabled');

        if (bulbEnabled && lineData && lineData[0] && lineData[0].options) {
            preloadItems = [{
                id: lineData[0].item.internalid,
                type: lineData[0].item.type
            }];

            StoreItem.preloadItems(preloadItems);

            _.each(preloadItems, function anyPreloadedItems(preloadItem) {
                item = StoreItem.get(preloadItem.id, preloadItem.type);
            });

            bulbItemOption = _.findWhere(lineData[0].options, { cartOptionId: 'custcol_bulb_item' });
            bulbQtyOption = _.findWhere(lineData[0].options, { cartOptionId: 'custcol_bulb_qty' });

            if (bulbItemOption && bulbItemOption.value && bulbItemOption.value.internalid &&
                bulbQtyOption && bulbQtyOption.value && bulbQtyOption.value.internalid) {
                bulbItemLine = {
                    item: {
                        internalid: parseInt(bulbItemOption.value.internalid, 10)
                    },
                    options: [
                        {
                            cartOptionId: 'custcol_item_memo',
                            value: {
                                internalid: item && item.itemid
                            }
                        }
                    ],
                    quantity: parseInt(bulbQtyOption.value.internalid, 10)
                };

                Model.addLine(bulbItemLine);
            }
        }
    });
});
