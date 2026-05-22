define('NS.RestrictListOfShippingMethods', [
    'NS.RestrictListOfShippingMethods.ShippingLogic',
    'Application',
    'Configuration'
], function NSRestrictListOfShippingMethods (
    NSShippingLogic,
    Application,
    Configuration
) {
    'use strict';

    var nsConfiguration = Configuration.get().parkdesigns;

	if (nsConfiguration.enabled) { //Enabled
        NSShippingLogic.start();
    }
});
