define('SchemaOrg.ItemRelations', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgBaseModule,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgBaseModule, {
        createJSONLD: function createJSONLD() {
            return {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                'name': this.relationName,
                'mainEntity': {
                    '@type': 'ItemList',
                    'itemListElement': _.map(this.view.collection.models, function mapItems(item, index) {
                        return {
                            '@type': 'ListItem',
                            'position': index + 1,
                            'url': item.get('_url'),
                            'image': item.get('_images')[0].url,
                            'name': item.get('_name')
                        };
                    })
                }

            };
        }
    });
});
