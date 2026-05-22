/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Header.View', [
    'Header.View',
    'themehelper_header.tpl',
    'underscore'
], function ThemeHelperHeaderView(
    HeaderView,
    ThemehelperHeader,
    _
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        template: ThemehelperHeader
    });
});
