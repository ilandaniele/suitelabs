define('AwaLabs.TrackingNumbers', [
    'underscore',
    'TrackingNumbers.OrderHistory.List.View'
], function AwaLabsTrackingNumbers(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');

            if (layout) {
                layout.addToViewContextDefinition('OrderHistory.List.Tracking.Number.View', 'showTracking', 'boolean', function context(context) {
                    var showTracking = false;

                    if (context.trackingNumbers && context.trackingNumbers.length) {
                        showTracking = _.every(context.trackingNumbers, function everyTracking(track) {
                            return track && track.trackingNumber && track.trackingNumber.value;
                        });
                    }

                    return showTracking;
                });
            }
        }
    };
});
