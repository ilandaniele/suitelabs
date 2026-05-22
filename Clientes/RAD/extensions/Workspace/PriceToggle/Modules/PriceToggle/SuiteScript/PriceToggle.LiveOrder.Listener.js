define('PriceToggle.LiveOrder.Listener', [
    'underscore',
    'Utils',
    'Configuration',
    'Application',
    'Profile.Model',
    'LiveOrder.Model'
], function PriceToggleLiveOrderModel(
    _,
    Utils,
    Configuration,
    Application,
    ProfileModel
) {
    'use strict';

    var UtilsAux = {
        errorSubmit: {
            status: 500,
            name: 'ERR_NOT_ALLOW_PROCEED_TO_CHECKOUT',
            message: 'Not allow proceed to checkout'
        },
        formatRetailsPrice: function formatRetailsPrice(result) {
            var priceLevel = Configuration.get('priceTogglePriceToggle');
            var totalRetailSubtotal = 0;

            result.lines = _.map(result.lines, function eachFn(line) {
                line.rate = 0;
                line.rate_formatted = '';
                line.retailRate = line.item[priceLevel] || line.rate;
                line.retailRateFormatted = Utils.formatCurrency(line.retailRate);
                line.retailAmount = line.retailRate * line.quantity;
                line.retailAmountFormatted = Utils.formatCurrency(line.retailAmount);
                line.retailTotal = line.retailAmount;
                line.retailTotalFormatted = line.retailAmountFormatted;

                totalRetailSubtotal += line.retailAmount;
                return line;
            });
            result.summary.retailSubTotal = totalRetailSubtotal;
            result.summary.retailSubTotalFormatted = Utils.formatCurrency(totalRetailSubtotal);
            return result;
        }
    };

    Application.on('after:LiveOrder.get', function beforeLiveOrderGet(_model, response) {
        return UtilsAux.formatRetailsPrice(response);
    });

    Application.on('before:LiveOrder.submit', function beforeLiveOrderGet() {
        var profile = ProfileModel.get();
        var pricingDisabled = _.findWhere(profile.customfields, { name: 'custentity_pricing_disabled' });
        var hidePricesOriginal = Configuration.get('siteSettings.registration.registrationmandatory', null) === 'T'
             && Configuration.get('siteSettings.requireloginforpricing', 'F') === 'T';
        var hidePrices = (pricingDisabled && pricingDisabled.value === 'T') || hidePricesOriginal;
        var isEnabledRetailPrices = profile.isEnabledRetailPrices;
        var allowContactCheckout = !profile.contactId || profile.isAllowContactCheckout;
        var allowProceedToCheckout = !isEnabledRetailPrices && !hidePrices && allowContactCheckout;

        if (!allowProceedToCheckout) {
            throw UtilsAux.errorSubmit;
        }
    });
});
