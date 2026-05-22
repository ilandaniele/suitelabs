/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Transaction.Line.Views.Cell.Navigable.View', [
    'Transaction.Line.Views.Cell.Navigable.View',
    'themehelper_transaction_line_views_cell_navigable.tpl',
    'underscore'
], function ThemeHelperTransactionLineViewsCellNavigableView(
    TransactionLineViewsCellNavigableView,
    TransactionLineViewsCellNavigableViewTpl,
    _
) {
    'use strict';

    _.extend(TransactionLineViewsCellNavigableView.prototype, {
        template: TransactionLineViewsCellNavigableViewTpl
    });
});
