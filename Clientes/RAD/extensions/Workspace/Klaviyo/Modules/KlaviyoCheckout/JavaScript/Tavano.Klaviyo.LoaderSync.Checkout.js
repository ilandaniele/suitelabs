
define('Tavano.Klaviyo.LoaderSync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});
