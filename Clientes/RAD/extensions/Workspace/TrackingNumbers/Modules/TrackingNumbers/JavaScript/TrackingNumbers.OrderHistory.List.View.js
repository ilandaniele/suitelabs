define('TrackingNumbers.OrderHistory.List.View', [
    'OrderHistory.List.View',
    'RecordViews.View',
    'underscore'
], function TrackingNumbersOrderHistoryListViewFn(
    OrderHistoryListView,
    RecordViewsView,
    _
) {
    'use strict';

    _.extend(OrderHistoryListView.prototype, {
        // eslint-disable-next-line no-underscore-dangle
        _buildResultsView: _.wrap(OrderHistoryListView.prototype._buildResultsView, function _buildResultsView(fn) {
            var resultsView = fn.apply(this, _.toArray(arguments).slice(1));

            resultsView.childView = RecordViewsView;

            return resultsView;
        })
    });
});
