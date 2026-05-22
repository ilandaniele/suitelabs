define('SchemaOrg.RelatedItems', [
    'SchemaOrg.ItemRelations',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgItemRelations,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgItemRelations, {
        moduleType: 'relatedItems',
        relationName: 'Related Items'
    });
});
