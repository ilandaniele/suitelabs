define('PayPal.View', [
    'SCView',

    'paypal.tpl',

    'jQuery'
], function PayPalViewModule(
    SCViewComponent,

    paypalTpl,

    jQuery
) {
    'use strict';

    var URL_PAYPAL_API = 'https://www.paypalobjects.com/api/checkout.js';

    var SCView = SCViewComponent.SCView;

    var PayPalView = function PayPalView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = paypalTpl;
        this.attributes = {
            'id': 'PayPalView',
            'class': 'paypal-view'
        };
        this.contextDataRequest = ['item'];

        this.pdp = this.options.container.getComponent('PDP');
        this.paypalPromise = null;
        this.paypalObject = null;

        this.on('afterPayPalViewRender', this.afterRender);
        this.pdp.on('afterQuantityChange', jQuery.proxy(this.renderButton, this));
        this.pdp.on('afterOptionSelection', jQuery.proxy(this.renderButton, this));
    };

    // Inherit parent instance methods.
    PayPalView.prototype = Object.create(SCView.prototype);

    // Restore the constuctor.
    PayPalView.prototype.constructor = PayPalView;

    PayPalView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
        this.trigger('afterPayPalViewRender');
    };

    PayPalView.prototype.afterRender = function afterRender() {
        var self = this;

        this.paypalPromise = this.paypalPromise || this.loadPayPalAPI();
        this.paypalPromise.then(function onLoad() {
            self.paypalObject = window.paypal || null;
            self.renderButton();
        });
    };

    PayPalView.prototype.loadPayPalAPI = function loadPayPalAPI() {
        return jQuery.getScript(URL_PAYPAL_API);
    };

    PayPalView.prototype.renderButton = function renderButton() {
        var self = this;
        var configuration = this.options.configuration;
        var itemInfo = this.pdp.getItemInfo() || {};
        var item;

        var matrixChilds = this.pdp.getAllMatrixChilds();
        var selectedMatrixChilds = this.pdp.getSelectedMatrixChilds();

        if (matrixChilds.length) {
            item = selectedMatrixChilds.length === 1 ? selectedMatrixChilds[0] : {};
        } else {
            item = itemInfo.item || this.contextData.item();
        }
        console.log('item', item);

        // Remove previous rendered button, if exists
        this.$('#paypal-button-container').empty();

        // Render the PayPal button
        return this.paypalObject && this.paypalObject.Button.render({
            // Set your environment
            env: !configuration.testMode ? 'production' : 'sandbox',

            // Specify the style of the button
            style: {
                label: (configuration.buttonLabel || 'PayPal').toLowerCase(),
                fundingicons: configuration.fundingIcons || false,
                branding: configuration.branding || true,
                size:  'large', // small | medium | large | responsive
                shape: 'rect',  // pill | rect
                color: 'gold'   // gold | blue | silver | black
            },

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox: configuration.sandboxClientId,
                production: configuration.clientId
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // Wait for the PayPal button to be clicked
            payment: function payment(data, actions) {
                var isPurchasable = Boolean(item.ispurchasable);
                var itemCurrency = item.currency || itemInfo.item.currency || 'USD';
                var itemQuantity = itemInfo.quantity || 1;

                self.hideErrorMessage();

                if (!isPurchasable) {
                    throw new Error('Item is NOT purchasable');
                }
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: item.keyMapping_price * itemQuantity,
                            currency: itemCurrency
                        },
                        item_list: {
                            items: [{
                                name: item.keyMapping_name,
                                sku: item.keyMapping_sku,
                                price: item.keyMapping_price,
                                currency: itemCurrency,
                                quantity: itemQuantity
                            }]
                        }
                    }]
                });
            },

            // onInit is called when the button first renders
            onInit: function onInit() {
                self.hideErrorMessage();
            },

            // Wait for the payment to be authorized by the customer
            onAuthorize: function onAuthorize(data, actions) {
                return actions.payment.execute().then(function() {
                    console.log('Payment Complete!', data);
                });
            },

            // If an error prevents buyer checkout, alert the user that an error has occurred
            onError: function onError(err) {
                console.log('PayPal Payment Error', err);
                self.showErrorMessage();
            }
        }, '#paypal-button-container');
    };

    PayPalView.prototype.showErrorMessage = function showErrorMessage() {
        this.$('#paypal-button-error-msg').removeClass('hide');
    };

    PayPalView.prototype.hideErrorMessage = function hideErrorMessage() {
        this.$('#paypal-button-error-msg').addClass('hide');
    };

    PayPalView.prototype.getContext = function getContext() {
        return {};
    };

    // Return the AMD constructor.
    return PayPalView;
});
