define('Address.AddExtraContext.Hack', [
    'Address.Details.View',
    'Backbone',
    'Backbone.View.render'
],
function HackCheckout(
    AddressDetailsView,
    Backbone
) {
    'use strict';

    AddressDetailsView.addExtraContextProperty = Backbone.View.addExtraContextProperty;
});
