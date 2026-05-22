define('SuiteLabs.Klaviyo.Shopping', [
    'Klaviyo.Tracker',
    'Tracker'
], function SuiteLabsKlaviyoShopping(
    KlaviyoTracker,
    Tracker
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            if (!SC.isPageGenerator()) {
                Tracker.getInstance().trackers.push(KlaviyoTracker);
            }
        }
    };
});
