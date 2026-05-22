/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/log',
    'N/search'
], function EnhancedSearch(
    nLog,
    nSearch
) {
    'use strict';

    var TRENDING_PRODUCTS_SAVED_SEARCH_ID = 'customsearch_trending_products';
    var TRENDING_CATEGORIES_SAVED_SEARCH_ID = 'customsearch_trending_categories';

    return {
        getTrendingProducts: function getTrendingProducts() {
            var items = [];

            var itemsSearch = nSearch.load({
                id: TRENDING_PRODUCTS_SAVED_SEARCH_ID
            });

            itemsSearch.run().each(function forEachResult(result) {
                items.push({
                    id: result.getValue('internalid'),
                    name: result.getValue('name'),
                    manufacturer: result.getValue('manufacturer'),
                    sku: result.getValue('sku'),
                    url: result.getValue('url')
                });

                return true;
            });

            return items;
            // return {
            //     downloadableItems: results
            // };
        },
        getTrendingCategories: function getTrendingCategories() {
            var categories = [];

            var categoriesSearch = nSearch.load({
                id: TRENDING_CATEGORIES_SAVED_SEARCH_ID
            });

            categoriesSearch.run().each(function forEachResult(result) {
                categories.push({
                    id: result.getValue('internalid'),
                    name: result.getValue('name'),
                    url: result.getValue('url')
                });

                return true;
            });
            return categories;
        }
    };
});
