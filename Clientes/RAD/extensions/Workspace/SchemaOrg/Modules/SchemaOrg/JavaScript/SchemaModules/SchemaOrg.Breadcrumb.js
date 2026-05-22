define('SchemaOrg.Breadcrumb', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgBreadcrumb(
    SchemaOrgBaseModule,
    _
) {
    'use strict';
    
    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'breadcrumb',
        createJSONLD: function createJSONLD() {
            if (!this.view.pages.length) {
                return {};
            }
            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': _.map(this.view.pages, function mapPages(page, index) {
                    return {
                        '@type': 'ListItem',
                        'position': index + 1,
                        'name': page.text,
                        'item': location.origin + page.href
                    };
                })
            };
        }
    });
});
