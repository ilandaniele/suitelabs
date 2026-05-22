define('ItemSearchAutoAdd.Product.Model', [
    'Product.Model',
    'Product.Option.Collection',
    'underscore'
], function ItemSearchAutoAddProductModel(
    ProductModel,
    ProductOptionCollection,
    _
) {
    'use strict';

    _.extend(ProductModel.prototype, {
        setOptionsValidation: function setOptionsValidation() {
            var self = this;

            self.get('options').each(function fnEach(option) {
                self.validation[option.get('cartOptionId')] = {
                    fn: function optionValidationFunction(_value, cartOptionId, computedState) {
                        var validation;
                        var selectedOption;
                        var options = computedState && computedState.options && computedState.options.models
                             ? computedState.options
                             : new ProductOptionCollection(computedState.options || []);

                        selectedOption = options.findWhere({
                            cartOptionId: cartOptionId
                        });
                        validation = options && options.models && selectedOption.validate();

                        return validation && validation['value.internalid'];
                    }
                };
            });
        }
    });
});
