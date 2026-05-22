
define(
	'SignifydTrackerExtension',   
	[ 
		'SignifydTracker.Model',
		'SignifydTracker',
        'Tracker'
	]
,   function 
	(
		SignifydTrackerModel,
		SignifydTracker,
        Tracker
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			if (!SC.isPageGenerator()) {

                SignifydTracker.application = container;
                SignifydTracker.setUp();

                Tracker.getInstance().trackers.push( SignifydTracker );
            }
		}
	};
});

