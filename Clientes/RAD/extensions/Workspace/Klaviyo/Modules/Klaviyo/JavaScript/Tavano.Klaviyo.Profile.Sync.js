
define('Tavano.Klaviyo.Profile.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});
