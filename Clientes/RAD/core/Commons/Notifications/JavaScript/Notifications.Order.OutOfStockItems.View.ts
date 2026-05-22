/*
	© 2024 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Notifications.Order.OutOfStockItems.View"/>
// @module Notifications.Order.OutOfStockItems.View

import * as notifications_order_outofstockitems_tpl from 'notifications_order_outofstockitems.tpl';
import { GlobalViewsMessageView } from '../../GlobalViews/JavaScript/GlobalViews.Message.View';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

// @class Notifications.Order.OutOfStockItems.View @extends Backbone.View
const NotificationsOrderOutOfStockItems: any = BackboneView.extend({
    template: notifications_order_outofstockitems_tpl,

    initialize: function(model) {
        this.model = model;
    },
    render: function() {
        if (this.model.checkIfOutOfStockError()) {
            this.message = this.model.getOutOfStockErrorMessage();
        }
        this._render();
    },

    // @property {ChildViews} childViews
    childViews: {
        'OutOfStock.Notification': function() {
            return new GlobalViewsMessageView({
                message: this.message,
                type: 'error',
                closable: true
            });
        }
    },

    // @method getContext @return Notifications.Order.OutOfStockItems.View.Context
    getContext: function() {
        // @class Notifications.Order.OutOfStockItems.View.Context
        return {
            // @property {Boolean} hasMessage
            hasMessage: !!this.message
        };
    }
});

export = NotificationsOrderOutOfStockItems;
