
define(
	'Signifyd'
,   [
		'Signifyd.View'
	]
,   function (
		SignifydView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');

			if(layout)
			{
				layout.addChildView('Header.Logo', function() {
					return new SignifydView({ container: container });
				});
			}

			var checkout = container.getComponent('Checkout');
			checkout.addModuleToStep(
				{
					step_url: 'opc'
					, module: {
						id: 'SessionView'
						, index: 6
						, classname: 'Signifyd.Session.View'
					}
				});
			checkout.addModuleToStep(
				{
					step_url: 'review'
					, module: {
						id: 'SessionView'
						, index: 99
						, classname: 'Signifyd.Session.View'
					}
				});


		}
	};
});
