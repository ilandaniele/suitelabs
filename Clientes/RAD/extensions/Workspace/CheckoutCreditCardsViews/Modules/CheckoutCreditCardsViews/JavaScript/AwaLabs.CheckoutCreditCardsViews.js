define('AwaLabs.CheckoutCreditCardsViews', [
    'OrderWizard.Module.PaymentMethod.Creditcard',
    'Utils',
    'underscore'
], function AwaLabsCheckoutCreditCardsViews(
    OrderWizardModulePaymentMethodCreditcard,
    Utils,
    _
) {
    'use strict';

    var prototype = OrderWizardModulePaymentMethodCreditcard.prototype;

    _.extend(prototype, {
        childViews: _.extend(prototype.childViews, {
            'CreditCard.List': _.wrap(prototype.childViews['CreditCard.List'], function creditCardList(fn) {
                this.itemsPerRow = 2;
                if (!Utils.isDesktopDevice() && !Utils.isTabletDevice()) {
                    this.itemsPerRow = 1;
                }

                return fn.apply(this, _.toArray(arguments).slice(1));
            })
        })
    });
});
