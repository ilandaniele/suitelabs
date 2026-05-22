define('FavoritesList.ProductList.Model', [
    'ProductList.Model',
    'underscore'
], function FavoritesListProductListModel(
    ProductListModel,
    _
) {
    'use strict';

    _.extend(ProductListModel.prototype, {
        getProductId: function getProductId(line) {
            if (line.getItemId) {
                return line.getItemId();
            }
            if (this.application.ProductListModule) {
                return this.application.ProductListModule.Utils.internalGetProductId(line);
            }
            return line.get('_id') + '';
        },
        getItemOptions: function getItemOptions(line) {
            var selectedOptions = line.get('options').filter(function filterOptions(option) {
                return !!option.get('value') && !!option.get('value').internalid;
            });

            return _.reduce(
                selectedOptions,
                function reduceOptions(acc, option) {
                    var value = option.get('value') || {};

                    acc[option.get('cartOptionId')] = {
                        value: value.internalid,
                        displayvalue: value.label
                    };

                    return acc;
                },
                {}
            );
        },
        checked: function checked(line) {
            var itemToAddId = this.getProductId(line);
            var itemToAddOptions = this.getItemOptions(line);
            var self = this;
            var pliOptions;
            return this.get('items').some(function someItem(pli) {
                if (
                    pli.get('item').get('internalid') === itemToAddId
                    || pli.get('item').get('originalid') === itemToAddId
                ) {
                    pliOptions = self.getItemOptions(pli);
                    if (_.isEmpty(pliOptions) && _.isEmpty(itemToAddOptions)) {
                        return true;
                    }
                    return _.isEqual(pliOptions, itemToAddOptions);
                }

                return false;
            });
        }
    });
});
