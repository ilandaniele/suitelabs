/**
 * Created by ammann on 7/7/17.
 */
/* eslint-disable */
define('Cart.Summary.View.Site', [
    'Cart.Summary.View',
    'Profile.Model',
    'Cart.ShippingMethodForm.View.Site',
    'underscore'
],
    function CartSummaryViewSite(
        View,
        ProfileModel,
        ShippingMethodFormView,
        _
    ) {
        'use strict';

        _.extend(View.prototype, {
            childViews: _.extend(View.prototype.childViews || {}, {
                'Cart.ShippingMethods': function () {
                    return new ShippingMethodFormView({
                        model: this.model
                    })
                }
            })
        });

        View.prototype.installPlugin('postContext', {
            name: 'themeHorizonContext',
            priority: 10,
            execute: function execute(context, view) {
                var modelOption = view.model,
                    shipAddress = modelOption.get('shipaddress'),
                    shipMethod = modelOption.get('shipmethod'),
                    summary = modelOption.get('summary'),
                    profileModel = ProfileModel.getInstance(),
                    isLoggedIn = profileModel.get('isLoggedIn') === 'T';

                var customerCategory = profileModel.attributes.category;
                var custPriceLevel = profileModel.attributes.priceLevel;

                var noShipAddress = function () {
                    if (!shipMethod || !shipAddress || (shipAddress === "-------null") || (shipAddress === "US-------null")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                    totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost),
                    hidePromo = isLoggedIn && profileModel.get('priceLevel') != '1' && profileModel.get('priceLevel') != '5';

                // remove existing promocode
                var promocodes = view.model.get('promocodes') || [];
                if (hidePromo && promocodes.length > 0) {
                    view.model
                        .save({ 'promocodes': [] })
                        .always(function promocodeSaveFinished() {
                            view.model.trigger('promocodeUpdated', 'removed');
                        });
                }

                _.extend(context, {
                    noShipAddress: noShipAddress,
                    totalShippingCost: totalShippingCost,
                    //  @propery {Boolean} isLoggedIn
                    isLoggedIn: isLoggedIn,
                    showPromocodeForm: context.showPromocodeForm && !hidePromo,
                    //  @property {Boolean} isDealer
                    isDealer: custPriceLevel != 1 && custPriceLevel != 5 //customerCategory === 'Dealer (Approved)'
                });
            }
        });
    });
