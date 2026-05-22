/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Transaction.Line.Views.Cell.Actionable.View', [
    'Transaction.Line.Views.Cell.Actionable.View',
    'themehelper_transaction_line_views_cell_actionable.tpl',
    'underscore'
], function ThemeHelperTransactionLineViewsCellActionableView(
    TransactionLineViewsCellActionableView,
    TransactionLineViewsCellActionableViewTpl,
    _
) {
    'use strict';

    _.extend(TransactionLineViewsCellActionableView.prototype, {
        template: TransactionLineViewsCellActionableViewTpl
    });
});
