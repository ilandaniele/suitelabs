define('AwaLabs.ItemOptions', [
    'ItemOptions.Utils',
    'Utils',
    'underscore',
    'Profile.Model'
], function AwaLabsItemOptions(
    ItemOptionsUtils,
    Utils,
    _,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var profile = ProfileModel.getInstance();
            var environmentComponent = application.getComponent('Environment');
            if (pdp) {
                pdp.addToViewContextDefinition('ProductLine.Stock.View', 'isNotTrade', 'boolean', function fn() {
                    return !profile.get('isTrade');
                });
                pdp.on('beforeShowContent', function beforeShowContent() {
                    var iteminfo = pdp.getItemInfo();
                    var availableOptions;
                    var valueCount;
                    var firstValue;
                    var selectedOptions;
                    var preferedOptions;
                    var itemOptionsMobileTemplates = environmentComponent.getConfig('ItemOptions.mobileTemplates') || [];
                    var optionsConfig = environmentComponent.getConfig('ItemOptions.optionsConfiguration', []);
                    var mobileTemplate;

                    if (iteminfo && iteminfo.options) {
                        selectedOptions = ItemOptionsUtils.getSelectedOptions(iteminfo.options);
                        if (selectedOptions.length === 0) {
                            availableOptions = ItemOptionsUtils.getAvailableOptions(iteminfo.options);
                            preferedOptions = ItemOptionsUtils.getPreferedOptions(iteminfo.item);
                            if (preferedOptions && preferedOptions.length > 0) {
                                _.each(preferedOptions, function eachPreferedOptions(prefOpt) {
                                    _.each(availableOptions, function eachAvailableOptions(opt) {
                                        var options = _.findWhere(opt.values, { label: prefOpt });
                                        if (options && options.internalid) {
                                            pdp.setOption(opt.cartOptionId, options.internalid);
                                        }
                                    });
                                });
                            } else if (availableOptions && availableOptions.length > 0) {
                                _.each(availableOptions, function eachAvailableOptions(opt) {
                                    valueCount = opt.values[0].internalid ? 1 : 2;
                                    if (opt.values.length === valueCount) {
                                        firstValue = opt.values[valueCount - 1];
                                        pdp.setOption(opt.cartOptionId, firstValue.internalid);
                                    }
                                });
                            }
                        }
                    }
                    if (iteminfo && iteminfo.options) {
                        if (optionsConfig && optionsConfig.length > 0 && itemOptionsMobileTemplates &&
                            itemOptionsMobileTemplates.length > 0 && Utils.isPhoneDevice()) {
                            _.each(itemOptionsMobileTemplates, function each(optConfig) {
                                var option = _.findWhere(optionsConfig, { cartOptionId: optConfig.cartOptionId });
                                if (option && option.cartOptionId && optConfig.template) {
                                    mobileTemplate = require(optConfig.template); // eslint-disable-line global-require
                                    option.templates = {
                                        selector: mobileTemplate,
                                        selected: mobileTemplate
                                    };
                                }
                            });
                        }
                    }
                });
            }
        }
    };
});
