
define('NSeComm.WebsiteCustomizations.Main', [
    'NSeComm.WebsiteCustomizations.Main.View'
], function NSeCommWebsiteCustomizationsMain(
        NSeCommWebsiteCustomizationsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            /** @type {LayoutComponent} */
            // Como es suite commerce no conviene hacerlo de la otra manera, porque cambia la version y se rompe
            // var layout = container.getComponent('Layout');

            var PDP = container.getComponent('PDP');
            PDP.addChildViews(PDP.PDP_FULL_VIEW, {
                'Quantity.Pricing': {
                    'NSeComm.WebsiteCustomizations.Main.View': { // es un identificador interno
                        childViewIndex: 1,
                        childViewConstructor: function () {
                            return new NSeCommWebsiteCustomizationsView();
                        }
                    }
                }
            });
        }
    };
});
