define('OrderWizard.Module.Confirmation.Jewelry', [
    'OrderWizard.Module.Confirmation',
    'Backbone',
    'Tracker',
    'underscore'
], function OrderWizardModuleConfirmationJewelry(
    OrderWizardModuleConfirmation,
    Backbone,
    Tracker,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleConfirmation.prototype, {
        trackTransaction: function trackTransaction(confirmation) {
            var summary = confirmation.get('summary');
            var lines = confirmation.get('lines').filter(function eachLine(line) {
                return line.get('rate') > 0;
            });
            var transaction = {
                confirmationNumber: confirmation.get('tranid'),
                subTotal: summary && (summary.totalSubtotal || summary.subtotal),
                total: summary && summary.total,
                taxTotal: summary && summary.taxtotal,
                shippingCost: summary && summary.shippingcost,
                handlingCost: summary && summary.handlingcost,
                products: new Backbone.Collection(),
                promocodes: confirmation.get('promocodes')
            };
            var transactionModel = new Backbone.Model(transaction);

            _(lines).each(function eachLine(line) {
                var options = [];

                line.get('options').each(function eachOption(option) {
                    if (option.get('value').label) {
                        options.push(option.get('value').label);
                    }
                });

                transactionModel.get('products').add(
                    new Backbone.Model({
                        name: line.get('item').get('_name'),
                        id: line.get('item').get('itemid'),
                        rate: line.get('rate'),
                        category: '/' + line.get('item').get('urlcomponent'),
                        options: options.sort().join(', '),
                        quantity: line.get('quantity')
                    })
                );
            });

            Tracker.getInstance().trackTransaction(transactionModel);
        }
    });
});
