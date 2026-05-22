define('HeaderReorganization.Header.Profile.View', [
    'Header.Profile.View',
    'header_reorganization_header_profile.tpl',
    'underscore'
], function HeaderReorganizationHeaderProfileView(
    HeaderProfileView,
    HeaderReorganizationHeaderProfileTpl,
    _
) {
    'use strict';

    _.extend(HeaderProfileView.prototype, {
        template: HeaderReorganizationHeaderProfileTpl
    });
});
