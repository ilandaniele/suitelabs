
define(
	'SignifydTrackerExtension.Checkout',   
	[ 
		'SignifydTracker',
        'Tracker'
	]
,   function 
	(
		SignifydTracker,
        Tracker
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var layout = container.getComponent('Layout');
            var environmentComponent = container.getComponent('Environment');
            var pdp = container.getComponent('PDP');
            var cart = container.getComponent('Cart');
            var isSessionIdSet;

            if (!SC.isPageGenerator()) {

                SignifydTracker.application = container;
                SignifydTracker.setUp();

                Tracker.getInstance().trackers.push( SignifydTracker );

                var sessionId = SignifydTracker.getCookie("SignifydSessionId");
                var data = {
                    fieldId: "custbody_f3_signifyd_session_id",
                    type: "string",
                    value: sessionId
                }
                
                layout.on('afterShowContent', function afterShowContent() {
                    if (!isSessionIdSet) {
                        isSessionIdSet = true;
                        cart.setTransactionBodyField(data).then(function() {
                            console.log(data.fieldId + ' was set to ' + data.value);
                        }).fail(function(error) {
                            console.log('setTransactionBodyField failed.');
                        });
                    }
                });
            }
		}
	};
});

