define('CartToQuote.Model', [
    'Backbone',
    'Utils'
], function CartToQuoteModel(
    Backbone,
    Utils
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CartToQuote.Service.ss'))
    });
});
