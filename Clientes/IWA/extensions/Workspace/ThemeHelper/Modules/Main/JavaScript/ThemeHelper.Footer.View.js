/*
    © 2024 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Footer.View', [
    'themehelper_footer.tpl',
    'Footer.View',
    'underscore'
], function ThemeHelperFooterView(
    FooterTpl,
    FooterView,
    _
) {
    'use strict';

    _.extend(FooterView.prototype, {
        render: _.wrap(FooterView.prototype.render, function render(fn) {
            var ret;

            this.template = FooterTpl;
            ret = fn.apply(this, _.toArray(arguments).slice(1));            

            return ret;
        })
    });
});
