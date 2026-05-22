define('ThemeHelper.Address.Edit.Fields.View', [
    'Address.Edit.Fields.View',
    'theme_helper_address_edit_fields.tpl',
    'underscore'
], function ThemeHelperAddressEditFieldsView(
    AddressEditFieldsView,
    AddressEditFieldsTpl,
    _
) {
    'use strict';

    _.extend(AddressEditFieldsView.prototype, {
        template: AddressEditFieldsTpl
    });
});
