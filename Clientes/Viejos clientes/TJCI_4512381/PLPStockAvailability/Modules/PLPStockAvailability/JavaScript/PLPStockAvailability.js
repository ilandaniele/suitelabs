
define(
    'PLPStockAvailability', [
        'PLPStockAvailability.View'
    ], function (PLPStockAvailabilityView) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                var plp = container.getComponent('PLP');
                if (plp) {
                    plp.addChildViews(plp.PLP_VIEW, {
                        'StockDescription': {
                            'PLPStockAvailabilityView': {
                                childViewIndex: 1,
                                childViewConstructor: function childViewConstructor() {
                                    return new PLPStockAvailabilityView({
                                        plp: plp,
                                        container: container
                                    });
                                }
                            }
                        }
                    });
                }
            }
        };
    });
