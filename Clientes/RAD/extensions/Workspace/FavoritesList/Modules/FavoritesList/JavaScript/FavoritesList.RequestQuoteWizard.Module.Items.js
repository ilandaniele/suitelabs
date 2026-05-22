define('FavoritesList.RequestQuoteWizard.Module.Items', [
    'underscore',
    'ShareFavorites.Model',
    'RequestQuoteWizard.Module.Items',
    'Profile.Model'
], function FavoritesListRequestQuoteWizardModuleItems(
    _,
    ShareFavoritesModel,
    RequestQuoteWizardModuleItems,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        generatePdfUrl: function generatePdfUrl(user, useRetailPrices) {
            var pdfModel = new ShareFavoritesModel();
            var url = pdfModel.url();

            var urlParams = {
                userid: user.get('internalid'),
                listid: this.model.get('plInternalId'),
                enableprice: !user.hidePrices() ? 'T' : 'F',
                useretailprice: useRetailPrices
            };
            var urlSearchParams = new URLSearchParams(urlParams);
            url += '?' + urlSearchParams.toString();
            return url;
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');

            context.pdfUrl = this.generatePdfUrl(user, useRetailPrices);
            return context;
        })
    });
});
