define('Facets.Translator.ItemResultsSorting', [
    'Facets.Translator',
    'Configuration',
    'underscore'
], function MainView(
    FacetsTranslator,
    Configuration,
    _
) {
    'use strict';

    _.extend(FacetsTranslator.prototype, {
        parseUrlOptions: _.wrap(FacetsTranslator.prototype.parseUrlOptions, function parseUrlOptions(fn) {
            var defaultSort = Configuration.get('typeahead.sort');

            fn.apply(this, _.toArray(arguments).slice(1));

            if (this.options.keywords) {
                this.options.order = defaultSort;
            }
        })
    });
});
