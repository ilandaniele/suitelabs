define('PLPStockAvailability.View', [
    'SCView',
    'plpstockavailability.tpl'
], function PLPStockAvailabilityView(
    SCViewComponent,
    PLPStockAvailabilityTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function PLPStockAvailabilityViewMain(options) {
        SCView.call(this, options);
        this.options = options || {};
        this.container = options.container;
        this.template = PLPStockAvailabilityTpl;
        this.contextDataRequest = ['item'];
    }
    PLPStockAvailabilityViewMain.prototype.contextDataRequest = ['item'];

    // Inherit parent instance methods.
    PLPStockAvailabilityViewMain.prototype = Object.create(SCView.prototype);

    // Restore the constuctor.
    PLPStockAvailabilityViewMain.prototype.constructor = PLPStockAvailabilityViewMain;

    PLPStockAvailabilityViewMain.prototype.getContext = function () {
        return {
            quantity: this.contextData.item().quantityavailable
        };
    };

    PLPStockAvailabilityViewMain.prototype.validateContextDataRequest = function () {
        return true;
    };

    // Return the AMD constructor.
    return PLPStockAvailabilityViewMain;
});
