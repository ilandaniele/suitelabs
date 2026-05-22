define('SuiteLabs.PayPalOptions.Main', [
    'PayPalOptions.PDP.View',
    'jQuery',
    'PayPalOptions.Cart.Summary.View',
    'PayPalOptions.View'
], function SuiteLabsPayPalOptionsMain(
    PayPalOptionsPDPView,
    jQuery
) {
    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var pdp = container.getComponent('PDP');
            var sdkUrl = environment.getConfig('paypalOptions.sdkUrl');

            if (!environment.isPageGenerator() && sdkUrl) {
                pdp.addChildView('Product.Price', function payPalOptionsPDPView() {
                    return new PayPalOptionsPDPView({
                        pdp: pdp
                    });
                });

                jQuery.getScript(sdkUrl);
            }
        }
    };
});
