define('AwaLabs.OrderStatusImprovementsHandlebarsExtras', [
    'Utils',
    'Handlebars'
], function AwaLabsOrderStatusImprovementsHandlebarsExtras(
    Utils,
    Handlebars
) {
    'use strict';

    Handlebars.registerHelper('formatPriceDecimals', function formatPriceDecimals(priceString) {
        var price = (priceString && priceString[0] === '$') ? priceString.substr(1) : priceString;
        price = parseFloat(price.split(',').join('')).toFixed(2); // removed commas
        return new Handlebars.SafeString(Utils.formatCurrency(price));
    });
});
