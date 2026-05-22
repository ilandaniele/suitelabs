define('CSVToCart.Model', [
    'SCModel'
], function CSVToCartModelModule(
    SCModelModule
) {
    'use strict';

    var SCModel = SCModelModule.SCModel;

    function CSVToCartModel() {
        SCModel.call(this);
    }

    CSVToCartModel.prototype = Object.create(SCModel.prototype);

    CSVToCartModel.prototype.constructor = CSVToCartModel;

    return CSVToCartModel;
});
