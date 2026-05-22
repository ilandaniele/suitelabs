define('OrderWizard.Module.ShowShipments.HideEdit', [
    'OrderWizard.Module.ShowShipments',
    'Address.Details.View',
    'underscore'
], function AvailabilityFacetFacetsFacetedNavigationItemView(
    OrderWizardModuleShowShipments,
    AddressDetailsView,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShowShipments.prototype, {
        childViews: _.extend(OrderWizardModuleShowShipments.prototype.childViews, {
            'Shipping.Address': function ShippingAddress() {
                return new AddressDetailsView({
                    hideActions: !!this.options.hide_edit_address_button,
                    hideDefaults: true,
                    hideEdit: true,
                    hideRemoveButton: true,
                    manage: 'shipaddress',
                    model: this.addressSource.get(this.model.get('shipaddress')),
                    hideSelector: true
                });
            }
        })
    });
});
