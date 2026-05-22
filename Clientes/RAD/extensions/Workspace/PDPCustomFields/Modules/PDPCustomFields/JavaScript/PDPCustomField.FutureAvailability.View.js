define('PDPCustomField.FutureAvailability.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_future_availability.tpl',
    'underscore'
], function PDPCustomFieldFutureAvailabilityViewModule(
    BaseView,
    FutureAvailabilityTpl,
    _
) {
    'use strict';

    function FutureAvailabilityView(options) {
        BaseView.call(this, options);
        this.template = FutureAvailabilityTpl;
    }

    FutureAvailabilityView.prototype = Object.create(BaseView.prototype);

    FutureAvailabilityView.prototype.constructor = FutureAvailabilityView;

    FutureAvailabilityView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var intervalsToShow = [];
        var configuredIntervals = this.environment.getConfig('pdpCustomFieldsIntervals', []);
        var showAvailability;
        var forecastAvailabilityDetail;

        if (
            item.custitem_forecast_availability_detail
            && item.custitem_forecast_availability_detail !== '{}'
            && configuredIntervals
            && configuredIntervals.length > 0
        ) {
            forecastAvailabilityDetail = JSON.parse(item.custitem_forecast_availability_detail);

            _.each(configuredIntervals, function eachInterval(interval) {
                if (
                    forecastAvailabilityDetail[interval.index]
                    && forecastAvailabilityDetail[interval.index].quantity
                ) {
                    showAvailability = true;
                    intervalsToShow.push(forecastAvailabilityDetail[interval.index]);
                }
            });
        }

        return {
            pdpCustomFieldsIntervalsList: intervalsToShow,
            showIntervalsFields: intervalsToShow && intervalsToShow.length > 0,
            showAvailability: showAvailability
        };
    };

    return FutureAvailabilityView;
});
