define('HeaderFiltering', [
    'Configuration',
    'jQuery'
], function HeaderFiltering(
    Configuration,
    jQuery
) {
    'use strict';

    var blacklistDomains = Configuration.get('xTouchpoint.blacklist') || [];

    jQuery.ajaxSetup({
        beforeSend: function beforeSend(jqXhr, options) {
            var isBlacklisted;
            var i = 0;

            if (options.contentType.indexOf('charset') < 0) {
                // If there's no charset, we set it to UTF-8
                jqXhr.setRequestHeader('Content-Type', options.contentType + '; charset=UTF-8');
            }

            if (options && options.url) {
                while (!isBlacklisted && i < blacklistDomains.length) {
                    isBlacklisted = options.url.indexOf(blacklistDomains[i]) >= 0;
                    i++;
                }
            }

            if (!SC.dontSetRequestHeaderTouchpoint && !isBlacklisted) {
                // Add header so that suitescript code can know the current touchpoint
                jqXhr.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
            }
        }
    });
});
