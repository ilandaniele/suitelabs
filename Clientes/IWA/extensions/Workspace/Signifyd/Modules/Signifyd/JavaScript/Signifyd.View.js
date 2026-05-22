// @module Folio3.Signifyd.MyCoolModule
define('Signifyd.View'
    , [
        'signifyd.tpl'
        , 'Backbone'
        , 'jQuery'
        , 'underscore'
    ]
    , function (
        signifyd_tpl
        , Backbone
        , jQuery
        , _
    ) {
        'use strict';

        // @class Folio3.Signifyd.MyCoolModule.View @extends Backbone.View
        return Backbone.View.extend({

            template: signifyd_tpl

            , initialize: function (options) {
                this.application = options.container;

                //this.cart = LiveOrderModel.getInstance();
            }

            , events: {}

            , bindings: {}

            , childViews: {}

            //@method getContext @return Folio3.Signifyd.MyCoolModule.View.Context
            , getContext: function getContext() {
                var cart = this.application.getComponent('Cart');
                var lines = cart.getLines();
                var self = this;
                if(!this.showScript) {
                    lines.then(function (lines) {
                        if (!!lines && lines.length > 0) {
                            var baseURL = SC.ENVIRONMENT.siteSettings.touchpoints.home;
                            if (SC.ENVIRONMENT.siteSettings.touchpoints.home.indexOf('?') > -1) {
                                baseURL = SC.ENVIRONMENT.siteSettings.touchpoints.home.substr(0, SC.ENVIRONMENT.siteSettings.touchpoints.home.indexOf('?'));
                            }
                            var hostingURL = btoa(baseURL);
                            console.log(hostingURL);
                            self.sessionId = 'SIG-SCC-' + hostingURL + "-";
                            var id = lines[0].internalid;
                            self.sessionId += id;
                            if (!!window && !!window.sessionStorage) {
                                window.sessionStorage.setItem('signifydsessionid', self.sessionId);
                            }
                            // try {
                            //     for (var i = 0; i < lines.length; i++) {
                            //         if (!!lines[i].options && lines[i].options.length > 0) {
                            //             lines[i].options = lines[i].options.filter(function (option) {
                            //                 if (option.cartOptionId === 'custcol_f3_signifyd_session_id') {
                            //                     option.value = sessionId;
                            //                 }
                            //                 return true;
                            //             });
                            //         }
                            //         cart.updateLine(lines[i]);
                            //     }
                            // } catch (e) {
                            // }
                            self.showScript = true;
                            self.render();
                        }

                    });
                }
                return {
                    sessionId: this.sessionId,
                    showScript : this.showScript
                };
            }
        });
    });
