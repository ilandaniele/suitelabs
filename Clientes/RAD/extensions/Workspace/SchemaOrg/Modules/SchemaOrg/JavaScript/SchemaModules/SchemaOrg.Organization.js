define('SchemaOrg.Organization', [
    'SchemaOrg.BaseModule',
    'underscore'
], function SchemaOrgOrganization(
    SchemaOrgBaseModule,
    _
) {
    'use strict';

    return _.extend({}, SchemaOrgBaseModule, {
        moduleType: 'organization',
        moduleMode: 'static',
        createJSONLD: function createJSONLD() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoImage = environmentComponent.getConfig('schemaOrg.siteLogo') || this.view.$('.header-logo-image').attr('src');
            var name = environmentComponent.getConfig('schemaOrg.siteName') || SC.ENVIRONMENT.siteSettings.displayname;
            var description = environmentComponent.getConfig('schemaOrg.siteDescription') || '';
            return {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                'url': location.origin,
                'logo': logoImage,
                'name': name,
                'description': description
            };
        }
    });
});
