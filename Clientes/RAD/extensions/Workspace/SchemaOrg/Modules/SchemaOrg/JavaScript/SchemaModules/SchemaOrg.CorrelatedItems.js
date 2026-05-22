define('SchemaOrg.CorrelatedItems', [
    'SchemaOrg.ItemRelations',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgItemRelations,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgItemRelations, {
        moduleType: 'correlatedItems',
        relationName: 'Correlated Items'
    });
});
