define('FacetsSettings.Facets', [
    'Facets',
    'underscore'
], function FacetsSettingsFacets(
    Facets,
    _
) {
    'use strict';

    _.extend(Facets, {
        facetConfigParsers: _.extend(Facets.facetConfigParsers, {
            'float': function float(value) {
                return parseFloat(value).toFixed(2);
            }
        })
    });
});
