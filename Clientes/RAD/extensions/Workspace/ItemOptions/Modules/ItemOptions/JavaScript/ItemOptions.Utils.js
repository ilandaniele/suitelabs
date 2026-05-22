define('ItemOptions.Utils', [
    'underscore'
], function ItemOptionsUtils(
    _
) {
    'use stritct';

    return {
        getAvailableOptions: function getAvailableOptions(options) {
            var availableOptions = [];
            _.each(options, function eachOptions(opt) {
                if (opt && opt.values && opt.values.length > 0) {
                    availableOptions.push(opt);
                }
            });
            return availableOptions;
        },
        getSelectedOptions: function getSelectedOptions(options) {
            var selectedOptions = [];
            _.each(options, function eachOptions(option) {
                if (option && option.value) {
                    selectedOptions.push(option.value);
                }
            });
            return selectedOptions;
        },
        getPreferedOptions: function getPreferedOptions(item) {
            var preferedOptions = [];
            if (item && item.custitem_sc_prefered_options) {
                preferedOptions = item.custitem_sc_prefered_options.split('_');
            }
            return preferedOptions;
        }
    };
});
