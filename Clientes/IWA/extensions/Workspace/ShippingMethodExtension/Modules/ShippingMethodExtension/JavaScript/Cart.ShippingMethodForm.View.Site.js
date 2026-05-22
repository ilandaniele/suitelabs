/*
 © 2017 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
 */

/* eslint-disable */
// @module Cart

define(
    'Cart.ShippingMethodForm.View.Site',
    [
        'cart_shippingMethod_form.tpl',
        'Profile.Model',
        'Backbone',
        'Backbone.CompositeView',
        'jQuery',
        'Handlebars'
    ],
    /* eslint-disable */
    function (
        /* eslint-enable */
        cartShippingMethodFormTpl,
        ProfileModel,
        Backbone,
        BackboneCompositeView,
        jQuery, Handlebars
    ) {
        'use strict';

        Handlebars.registerHelper('equalsShipMethod', function (val1, val2) {
            return val1 === val2;
        });

        return Backbone.View.extend({
            template: cartShippingMethodFormTpl,
            /* eslint-disable */
            initialize: function (options) {
                /* eslint-enable */
                this.model = options.model;
            },

            getContext: function () {
                var shipAddress = this.model.get('shipaddress'),
                    shipMethod = this.model.get('shipmethod'),
                    profileModel = ProfileModel.getInstance(),
                    isLoggedIn = profileModel.get('isLoggedIn') === 'T';

                var self = this,
                    shipping_methods = this.model.get('shipmethods').map(function (shipmethod) {
                        return {
                            name: shipmethod.get('name')
                            , rate: shipmethod.get('rate')
                            , rate_formatted: shipmethod.get('rate_formatted')
                            , internalid: shipmethod.get('internalid')
                            , isActive: shipmethod.get('internalid') === self.model.get('shipmethod')
                        };
                    });

                var shipping_methods_sorted = _.sortBy(shipping_methods, 'rate');

                var noShipAddress = function () {
                    if (!shipMethod || !shipAddress || (shipAddress === "-------null") || (shipAddress === "US-------null")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                if (shipping_methods_sorted.length > 0 && !shipping_methods_sorted[0].internalid) {
                    var self = this;
                    this.model.save().always(function () {
                        /* eslint-disable */
                        self.showContent();
                    });
                }
                return {
                    //  @propery {Boolean} shipAddress
                    noShipAddress: noShipAddress(),
                    //  @propery {String} shipAddress
                    ShipAddress: this.model.get('shipaddress'),
                    //  @propery {String} shipMethod
                    shipMethod: shipMethod,
                    //  @propery {Array} shippingMethods
                    ShippingMethods: shipping_methods_sorted,
                    //  @propery {Boolean} noShippingMethods
                    oneShippingMethod: this.model.get('shipmethods').length === 1,
                    //  @propery {Boolean} noShippingMethods
                    noShippingMethods: this.model.get('shipmethods').length === 0,
                    //  @propery {Boolean} isLoggedIn
                    isLoggedIn: isLoggedIn
                }
            }
        });
    });


    //@class Cart.PromocodeForm.View.Initialization.options
    //@property {LiveOrder.Model} model
    //@property {ApplicationSkeleton} application
