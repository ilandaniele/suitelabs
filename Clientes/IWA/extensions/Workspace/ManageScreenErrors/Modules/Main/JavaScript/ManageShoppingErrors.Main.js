
define('ManageShoppingErrors.Main', [
    'ProductDetails.Full.View',
    'underscore',
    'Utils',
    'Utils.Extend'
], function ManageShoppingErrorsMain(
    ProductDetailsFullView,
    _,
    Utils
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype, {

        bindModel: _.wrap(ProductDetailsFullView.prototype.bindModel, function bindModel(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.model.areAttributesValid = _.wrap(this.model.areAttributesValid, function areAttributesValid(fnValid) {
                var result = fnValid.apply(this, _.toArray(arguments).slice(1));
                if (Utils.isPhoneDevice()) {
                    Utils.animateToError();
                }
                return result;
            });
        })
    });
});
