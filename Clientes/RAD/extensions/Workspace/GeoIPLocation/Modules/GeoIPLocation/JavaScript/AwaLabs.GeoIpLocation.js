define('AwaLabs.GeoIpLocation', [
    'jQuery',
    'underscore',
    'Utils'
], function AwaLabsGeoIpLocation(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            jQuery.getScript(_.getAbsoluteUrl(getExtensionAssetsPath('services/restrictedIp.ssp')));
        }
    };
});
