define('CategoriesCustomSort', [
    'Facets.Translator',
    'Configuration',
    'underscore'
],
function CategoriesCustomSort(
    FacetsTranslator,
    Configuration,
    _
) {
    'use strict';

    _.extend(FacetsTranslator.prototype, {
        getApiParams: _.wrap(FacetsTranslator.prototype.getApiParams, function getApiParams(fn) {
            var params = fn.apply(this, _.toArray(arguments).slice(1));
            var categorySort = Configuration.get('categoryResults.sort');

            if (this.isCategoryPage && categorySort && params.sort.indexOf('commercecategory') === 0) {
                params.sort = categorySort;
            }

            return params;
        }),

        setDefaultOrder: function setDefaultOrder() {
            if (this.categoryUrl && this.categoryUrl.length && this.isCategoryPage) {
                this.configuration.defaultOrder = Configuration.get('categoryResults.sort');
            }
        },

        getUrl: _.wrap(FacetsTranslator.prototype.getUrl, function getUrl(fn) {
            this.setDefaultOrder();

            return fn.apply(this, _.toArray(arguments).slice(1));
        }),

        parseUrlOptions: _.wrap(FacetsTranslator.prototype.parseUrlOptions, function parseUrlOptions(fn) {
            this.setDefaultOrder();

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });
});
