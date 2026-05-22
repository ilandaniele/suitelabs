define('SchemaOrg.ProductList', [
    'SchemaOrg.BaseModule',
    'Utils',
    'underscore'
], function SchemaOrgProductList(
    SchemaOrgBaseModule,
    Utils,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'productlist',
        createJSONLD: function createJSONLD() {
            return {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                'name': this.view.model.get('category') && this.view.model.get('category').get('name'),
                'url': this.view.model.get('category') && this.view.model.get('category').get('fullurl'),
                'itemListElement': _.map(this.view.model.get('items').models, function mapItems(item, index) {
                    return {
                        '@type': 'ListItem',
                        'position': index + 1,
                        'url': item.get('_url'),
                        'image': Utils.resizeImage(
                            SC.ENVIRONMENT.siteSettings.imagesizes || [],
                            item.get('_images')[0].url,
                            'thumbnail'
                        ),
                        'name': item.get('_name')
                    };
                })
            };
        }
    });
});
