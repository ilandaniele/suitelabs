define('MultiAddToCart.Model', [
    'Backbone',
    'Utils',
    'underscore'
], function MultiAddToCartModel(
    Backbone,
    Utils,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(
            // eslint-disable-next-line no-undef
            getExtensionAssetsPath(
                'services/MultiAddToCart.Service.ss'
            ),
            false
        ),

        // @method parse
        parse: function parse(result) {
            _.each(result && result.categories, function loopCategories(subcategory) {
                subcategory.categories = _.sortBy(subcategory.categories, function sortSubcategories(sub2category) {
                    return sub2category.name;
                });
            });
            // One single category
            if (result && result.categories && result.categories[0].categories && result.categories[0].categories.length === 0) {
                result.categories = _.sortBy(result.categories, function sortSubcategories(sub1category) {
                    return sub1category.name;
                });
            }
            return result;
        }

    });
});
