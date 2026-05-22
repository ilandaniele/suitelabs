
/* eslint-disable */
define('OrderWizard.Module.CartSummary.Site', [
    'OrderWizard.Module.CartSummary',
    'underscore'
],
    function CartSummaryViewSite(
        View,
        _
    ) {
        'use strict';

        View.prototype.installPlugin('postContext', {
            name: 'themeHorizonContext',
            priority: 10,
            execute: function execute(context, view) {
                var modelOption = context.model,
                    summary = modelOption.get('summary'),
                    totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost);
                _.extend(context, {
                    totalShippingCost: totalShippingCost,
                    confirmationStep: view.options.wizard.currentStep == 'confirmation'
                });
            }
        });

        _.extend(View.prototype, {
            getContext: _.wrap(View.prototype.getContext, function (fn) {
                var currentContext = fn.apply(this, _.toArray(arguments).slice(1));

                var hash = window.location.hash;
                var summary = currentContext.model.get("summary");
                var totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost);
                return _.extend(currentContext, {
                    isShippingAddressPage: hash.indexOf('#shipping/address') >= 0,
                    totalShippingCost: totalShippingCost
                });
            })
        });


    });
