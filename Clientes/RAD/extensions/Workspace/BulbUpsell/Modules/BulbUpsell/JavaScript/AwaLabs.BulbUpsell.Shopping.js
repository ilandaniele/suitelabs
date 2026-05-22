define('AwaLabs.BulbUpsell.Shopping', [
    'BulbUpsell.View'
], function AwaLabsBulbUpsellShopping(
    BulbUpsellView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var env = application.getComponent('Environment');
            var bulbUpsellEnabled = env && env.getConfig('bulbs.enabled');
            if (pdp && bulbUpsellEnabled) {
                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'BulbUpsellView': {
                        'BulbUpsellView': {
                            childViewIndex: 2,
                            childViewConstructor: function childViewConstructor() {
                                return new BulbUpsellView({
                                    application: application
                                });
                            }
                        }
                    }
                });
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'BulbUpsellView': {
                        'BulbUpsellView': {
                            childViewIndex: 2,
                            childViewConstructor: function childViewConstructor() {
                                return new BulbUpsellView({
                                    application: application
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});
