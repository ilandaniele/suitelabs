define('PriceToggle.Item.Model', [
    'Item.Model',
    'Profile.Model',
    'Configuration',
    'Utils',
    'underscore'
], function PriceToggleItemModel(
    ItemModel,
    ProfileModel,
    Configuration,
    Utils,
    _
) {
    'use strict';

    _.extend(ItemModel.prototype, {
        priceDetailsRetail: function priceDetailsRetail() {
            var priceLevel = Configuration.get('priceTogglePriceToggle', 'pricelevel4');
            var retailPrice = this.get(priceLevel);
            var retailPriceFormatted = this.get(priceLevel + '_formatted') || (
                retailPrice ? Utils.formatCurrency(retailPrice) : ''
            );
            var result;

            if (retailPrice && retailPriceFormatted) {
                result = {
                    onlinecustomerprice: retailPrice,
                    onlinecustomerprice_formatted: retailPriceFormatted
                };
            }

            return result;
        },

        getDefaultPrice: _.wrap(ItemModel.prototype.getDefaultPrice, function getDefaultPrice(fn, detailsObject) {
            var profile = ProfileModel.getInstance();
            var retailDetailsObject;

            if (profile.get('isEnabledRetailPrices')) {
                retailDetailsObject = this.priceDetailsRetail();
            }

            return fn.apply(this, [retailDetailsObject || detailsObject]);
        })
    });
});
