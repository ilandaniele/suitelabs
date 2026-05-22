define('FSCModule.View', [
    'SCView',
    'psecomm_freeshipcompute_fscmodule.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function FSCModuleView(
        SCViewComponent,
        PSeCommFreeShipComputeFSCModuleTpl,
        Backbone,
        jQuery,
        _
    ) {
    'use strict';

    var SCView = SCViewComponent.SCView;
    function FSCModuleViewMain(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};
        this.cart = this.options.cart;
        this.cart.on('afterUpdateLine', function () {
            console.log('update line');
            self.getDiffShipAmount();
        });

        this.cart.on('afterRemoveLine', function () {
            console.log('remove line');
            self.getDiffShipAmount();
        });

        this.cart.on('afterAddLine', function () {
            console.log('after add line');
            self.getDiffShipAmount();
        });

        this.container = options.container;
        this.userprofile = this.container.getComponent('UserProfile');
        this.environment = this.container.getComponent('Environment');
        this.template = PSeCommFreeShipComputeFSCModuleTpl;
        this.isLoggedIn = false;
        this.isOutOfStock = false;
        this.isFlagged = false;
        this.getDiffShipAmount();
    }

    // Inherit parent instance methods.
    FSCModuleViewMain.prototype = Object.create(SCView.prototype);

    // Restore the constuctor.
    FSCModuleViewMain.prototype.constructor = FSCModuleViewMain;

    FSCModuleViewMain.prototype.getDiffShipAmount = function () {
        var self = this;
        this.userprofile.getUserProfile().then(function afterGetUserProfile(profile) {
            self.isLoggedIn = profile.isloggedin;
            self.freeShipAmount = _.findWhere(profile.customfields, {
                id: 'custentity_free_shipping_amount'
            }).value;

            self.highFreeShip = _.findWhere(profile.customfields, {
                id: 'custentity_higher_free_shipping_amount'
            }).value;

            self.cart.getSummary().then(function (summary) {
                self.subtotal = summary.subtotal;
            });

            self.cart.getLines().then(function (lines) {
                var ctr = 0;
                // check each item if it has HIGHER FREE SHIPPING ITEM checked
                _.each(lines, function (a) {
                    self.highPPFItemF = a.item.extras.custitem_higher_ppf_item;
                    console.log('self.highPPFItemF', self.highPPFItemF);

                    if (self.highPPFItemF) {
                        ctr += 1;
                    }
                    console.log('ctr', ctr);

                    if (ctr > 0) {
                        self.isFlagged = true;
                    } else {
                        self.isFlagged = false;
                    }
                    return self.isFlagged;
                });

                // if there is a HIGHER FREE SHIPPING ITEM checked
                if (self.isFlagged === true) {
                    console.log('true here');
                    self.diffShipAmt = self.highFreeShip - self.subtotal;
                    self.diffShipAmt.toFixed(2);
                    self.render();
                } else {
                    // if none
                    console.log('false here');
                    self.diffShipAmt = self.freeShipAmount - self.subtotal;
                    self.diffShipAmt.toFixed(2);
                    self.render();
                }
            });
            self.render();
        });
    };

    FSCModuleViewMain.prototype.getContext = function () {
        var nomessage = false;
        var diffShipAmt2;
        var freeShipMsg = this.environment.getConfig('extensions.fscmodule.FSCCustomNoteFree');
        var diffShipNote1 = this.environment.getConfig('extensions.fscmodule.FSCCustomNote1');
        var diffShipNote2 = this.environment.getConfig('extensions.fscmodule.FSCCustomNote2');

        if (this.diffShipAmt > 0) {
            nomessage = true;
            diffShipAmt2 = this.diffShipAmt.toFixed(2);
        }

        return {
            diffShipNote1: diffShipNote1,
            freeShipMsg: freeShipMsg,
            diffShipNote2: diffShipNote2,
            isLoggedIn: this.isLoggedIn,
            diffShipAmt: diffShipAmt2,
            nomessage: nomessage
        };
    };

    FSCModuleViewMain.prototype.validateContextDataRequest = function () {
        return true;
    };
    FSCModuleViewMain.prototype.contextDataRequest = ['item'];

    // Return the AMD constructor.
    return FSCModuleViewMain;
});
