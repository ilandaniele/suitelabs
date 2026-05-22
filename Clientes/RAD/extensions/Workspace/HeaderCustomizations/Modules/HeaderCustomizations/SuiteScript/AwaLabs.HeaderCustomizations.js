define('AwaLabs.HeaderCustomizations', [
    'Configuration'
], function HeaderCustomizations(
    Configuration
) {
    'use strict';

    Configuration.get().publish = Configuration.get().publish || [];
    Configuration.get().publish.push({
        key: 'SCCategoryConfiguration',
        model: 'HeaderCustomizations.SCCategoryConfiguration.Model',
        call: 'get'
    });
});
