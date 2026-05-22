define('CheckoutCustomFields.View', [
    'CheckoutCustomFields.tpl',
    'SCView'
], function CheckoutCustomFieldsViewModule(
    CheckoutCustomFieldsTpl,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;
    var customer;
    var FDA;
    var disclaimer;

    function CheckoutCustomFieldsView(options) {
        var self = this;

        SCView.call(this);
        this.options = options || {};
        this.template = CheckoutCustomFieldsTpl;

        customer = self.options.Customer;
        FDA = self.options.FDA;
        disclaimer = self.options.Disclaimer;
    }

    CheckoutCustomFieldsView.prototype = Object.create(SCView.prototype);
    CheckoutCustomFieldsView.prototype.constructor = CheckoutCustomFieldsView;

    CheckoutCustomFieldsView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    CheckoutCustomFieldsView.prototype.getContext = function getContext() {
        return {
            customer: customer,
            FDA: FDA,
            disclaimer: disclaimer
        };
    };

    return CheckoutCustomFieldsView;
});
