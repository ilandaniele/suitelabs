
define(
	'CustomCSSFileExtension'
	, [

	]
	, function (

	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
                var environmentComponent = container.getComponent("Environment");
				
                container.getLayout().on('beforeRender', function () {
                    var url = environmentComponent.getConfig("customCssFile.stylesheetUrl") || "";
                    if(url && url.length > 0) {
                        jQuery('head').append('<link rel="stylesheet" href="' + url + '">');
                    }
                });
			}
		};
	});
