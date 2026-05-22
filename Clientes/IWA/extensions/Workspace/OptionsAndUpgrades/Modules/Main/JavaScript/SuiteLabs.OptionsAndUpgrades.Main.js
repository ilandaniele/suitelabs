define('SuiteLabs.OptionsAndUpgrades.Main', [
    'OptionsAndUpgrades.LiveOrder.Model',
    'OptionsAndUpgrades.ProductDetails.Full.View',
    'OptionsAndUpgrades.ItemRelations.Related.View',
    'OptionsAndUpgrades.ItemRelations.RelatedItem.View'
], function OptionsAndUpgradesMain(

) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            // This snippet of code is debatable, it is needed for making the "Add to Cart"
            // checkboxes work on the Options and Upgrades feature, but if enabled then it breaks
            // the navigation of the elements within Available Finishes section. Ben considered that the
            // second thing was more important that's why it is commented out.
            // container.getLayout().on('beforeRender', function beforeRender() {
            //     if (SC.CONFIGURATION && SC.CONFIGURATION.bxSliderDefaults) {
            //         SC.CONFIGURATION.bxSliderDefaults.touchEnabled = false;
            //     }
            // });
            SC.SESSION = SC.SESSION || {};
        }
    };
});
