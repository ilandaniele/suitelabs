define('AwaLabs.FacetsSettings', [
    'Profile.Model',
    'Configuration',
    'underscore',
    'FacetsSettings.Facets'
], function FacetsSettings(
    ProfileModel,
    Configuration,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('Facets.Empty.View', 'displayNotLoggedInCatagoryMessage', 'boolean',
                    function displayNotLoggedInCatagoryMessage(context) {
                        return ProfileModel.getInstance().get('isLoggedIn') === 'F' && !context.keywords;
                    });
            }
            Configuration.searchApiMasterOptions = this.addFacetsAndExcludes(Configuration.searchApiMasterOptions);
        },
        addFacetsAndExcludes: function addFacetsAndExcludes(apiOptions) {
            var facetExclude = Configuration.get('excludeFacets.facets') || [];
            var masterFacets = Configuration.get('masterFacets.facets') || [];
            _.each(apiOptions, function eachApiOptions(value) {
                value['facet.exclude'] = facetExclude.join(',');
                _.each(masterFacets, function eachMasterFacet(masterFacet) {
                    if (!value[masterFacet.id]) {
                        value[masterFacet.id] = masterFacet.value;
                    }
                });
            });
            return apiOptions;
        }
    };
});

