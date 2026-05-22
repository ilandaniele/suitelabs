define('ShareFavorites.ServiceController', [
    'ServiceController',
    'ShareFavorites.Model'
], function ShareFavoritesServiceController(
    ServiceController,
    ShareFavoritesModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'ShareFavorites.ServiceController',
        get: function get() {
            var listid = this.request.getParameter('listid');
            var enablePrice = this.request.getParameter('enableprice') === 'T';
            var useRetailPrices = this.request.getParameter('useretailprice') === 'T';
            return ShareFavoritesModel.get(listid, enablePrice, useRetailPrices, this.response);
        }
    });
});
