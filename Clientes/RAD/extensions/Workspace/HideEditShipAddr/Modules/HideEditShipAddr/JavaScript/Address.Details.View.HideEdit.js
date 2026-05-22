define('Address.Details.View.HideEdit', [
    'Address.Details.View',
    'Backbone',
    'underscore'
], function AvailabilityFacetFacetsFacetedNavigationItemView(
    AddressDetailsView,
    Backbone,
    _
) {
    'use strict';

    _.extend(AddressDetailsView.prototype, {
        getContext: _.wrap(AddressDetailsView.prototype.getContext, function fnWrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var checkoutStep = Backbone.history.fragment;
            var hideEdit = checkoutStep === 'shipping/address' || checkoutStep === 'billing' || checkoutStep === 'opc';
            if (!hideEdit) {
                hideEdit = this.options ? this.options.hideEdit : this.hideEdit;
            }
            return _.extend(context, {
                hideEdit: hideEdit
            });
        })
    });
});
