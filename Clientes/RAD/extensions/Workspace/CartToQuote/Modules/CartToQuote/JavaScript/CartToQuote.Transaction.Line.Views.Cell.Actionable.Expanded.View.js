define('CartToQuote.Transaction.Line.Views.Cell.Actionable.Expanded.View', [
    'underscore',
    'Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'Profile.Model'
], function CartToQuoteTransactionLineViewsCellActionableExpandedView(
    _,
    TransactionLineViewsCellActionableExpandedView,
    ProfileModel
) {
    'use strict';

    _.extend(TransactionLineViewsCellActionableExpandedView.prototype, {
        getContext: _.wrap(TransactionLineViewsCellActionableExpandedView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var profile = ProfileModel.getInstance();
            context.showCheckbox = !!this.options.showCheckbox;
            context.isChecked = this.model.checked;
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                this.model.get('item') &&
                !this.model.get('item').get('isbackorderable') &&
                this.model.get('item').get('quantityavailable') === 0
            ;
            return context;
        })
    });
});
