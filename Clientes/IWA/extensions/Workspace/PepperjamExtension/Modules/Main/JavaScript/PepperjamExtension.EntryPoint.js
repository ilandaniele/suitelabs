define('PepperjamExtension.EntryPoint', [
    'PepperJamTracker',
    'Tracker',
    'Utils'
], function PepperjamExtensionEntryPoint(
    PepperJamTracker,
    Tracker,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp (container) {
            if (!SC.isPageGenerator()) {
                var url = window.location.href;
                var checkoutComponent = container.getComponent('Checkout');
                var clickIdParameter = Utils.getParameterByName(url, 'clickId');
                if (clickIdParameter) {
                    sessionStorage.setItem('clickId', clickIdParameter);
                } else if (sessionStorage.getItem('clickId')) {
                    clickIdParameter = sessionStorage.getItem('clickId');
                }
                if (checkoutComponent) {
                    var cartComponent = container.getComponent('Cart');
                    cartComponent.getLines().then(function(lines) {
                        if (lines && lines.length > 0) {
                            sessionStorage.setItem('cartLines', JSON.stringify(lines)); // Cart lines are not present in confirmation page.
                        }
                    });
                }
                if (clickIdParameter) {
                    Tracker.getInstance().trackers.push(PepperJamTracker);

                // Code not working when no click id is present.
                // } else {
                //     var layoutComponent = container.getComponent('Layout');
                //     var environmentComponent = container.getComponent('Environment');
                //     layoutComponent.on('afterShowContent', function afterShowContent() {
                //         var impressionId = environmentComponent.getConfig('PepperJamTracking.impressionId');
                //         jQuery.getScript('//container.pepperjam.com/' + impressionId);
                //     });
                }
            }
        }
    };
});
