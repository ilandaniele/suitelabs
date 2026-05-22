define('PayPalOptions.Cart.Summary.View', [
    'Cart.Summary.View',
    'PayPalOptions.View',
    'paypal_options_cart_summary.tpl',
    'jQuery',
    'underscore'
], function SuiteLabsPayPalOptionsMain(
    CartSummaryView,
    PayPalOptionsView,
    PayPalOptionsTpl,
    jQuery,
    _
) {
    _.extend(CartSummaryView.prototype, {
        render: _.wrap(CartSummaryView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_cart_summary') {
                this.template = PayPalOptionsTpl;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        }),

        childViews: _.extend({}, CartSummaryView.prototype.childViews, {
            'PayPalOptions.Messaging': function PayPalOptionsMessaging() {
                var self = this;

                return new PayPalOptionsView({
                    environment: this.options.application.getComponent('Environment'),
                    getAmount: function getAmount() {
                        var cart = self.options.application.getComponent('Cart');
                        var promise = jQuery.Deferred();

                        cart.getSummary().then(function getSummary(summary) {
                            promise.resolve(summary.subtotal);
                        });

                        return promise;
                    }
                });
            }
        })
    });
});
