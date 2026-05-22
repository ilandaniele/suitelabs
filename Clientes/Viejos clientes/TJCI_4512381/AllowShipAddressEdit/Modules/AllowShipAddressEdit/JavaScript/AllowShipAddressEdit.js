
define(
    'AllowShipAddressEdit', [
        'jQuery',
        'underscore'
    ],
    function AllowShipAddressEdit(
        jQuery,
        _
    ) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                var layout = container.getComponent('Layout');
                this.userprofile = container.getComponent('UserProfile');
                if (layout) {
                    this.userprofile.getUserProfile().then(function (profile) {
                        var allowEdits = _.findWhere(profile.customfields, {
                            id: 'custentity_allow_shipping_address_edits'
                        }).value;
                        console.log('allow Edits', allowEdits);

                        if (!allowEdits) {
                            console.log('not allowed');
                            layout.on('afterShowContent', function afterShowContent() {
                                _.defer(function () {
                                    jQuery('.address-details-actions').remove();
                                    jQuery('.address-details-new-address').remove();
                                    jQuery('.overview-shipping-card-button-edit').remove();
                                });
                            });
                        }
                    });
                }
            }
        };
    });
