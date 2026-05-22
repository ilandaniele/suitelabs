define('PayPalOptions.View', [
    'paypal_options.tpl',
    'SCView',
    'jQuery',
    'Utils',
    'underscore'
], function PayPalOptionsViewModule(
    PayPalOptionsTpl,
    SCViewComponent,
    jQuery,
    Utils,
    _
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    var SCView = SCViewComponent.SCView;

    function PayPalOptionsView(options) {
        var windowResizeFn;
        var self = this;

        SCView.call(this);

        this.environment = options.environment;
        this.getAmount = options.getAmount;
        this.template = PayPalOptionsTpl;

        windowResizeFn = _.throttle(function windowResizeThrottled() {
            self.render();
        }, 1000);

        this.windowResizeHandler = _.bind(windowResizeFn, this);

        jQuery(window).on('resize', this.windowResizeHandler);
    }

    PayPalOptionsView.prototype = Object.create(SCView.prototype);

    PayPalOptionsView.prototype.constructor = PayPalOptionsView;

    PayPalOptionsView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        var promise = new jQuery.Deferred();

        this.getAmount().then(function getAmount(amount) {
            self.amount = amount;
            SCView.prototype.render.apply(self, args);
            promise.resolve();
        });

        return promise;
    };

    PayPalOptionsView.prototype.getContext = function getContext() {
        var paypalCheckoutBtn;
        var paypalLaterBtn;

        if (Utils.isDesktopDevice()) {
            paypalCheckoutBtn = '/images/paypal/Yellow-Button_PP-Checkout-500.png';
            paypalLaterBtn = '/images/paypal/Blue-Button_PP-Pay-Later-500.png';
        } else {
            paypalCheckoutBtn = '/images/paypal/Yellow-Button_PP-Checkout-300.png';
            paypalLaterBtn = '/images/paypal/Blue-Button_PP-Pay-Later-300.png';
        }

        return {
            paypalCheckoutBtn: paypalCheckoutBtn,
            paypalLaterBtn: paypalLaterBtn,
            cartTotal: this.amount
        };
    };

    return PayPalOptionsView;
});
