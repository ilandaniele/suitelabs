define('PayPal', [
    'PayPal.View'
], function PayPal(
    PayPalView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var configuration = environment.getConfig();

            if (pdp) {
                pdp.addChildView('StockDescription', function addPayPalCarousel() {
                    return new PayPalView({
                        container: container,
                        configuration: configuration.paypalExpress || {}
                    });
                });
            }
        }
    };
});
