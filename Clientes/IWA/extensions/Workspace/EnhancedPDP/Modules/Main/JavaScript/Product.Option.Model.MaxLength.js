define('Product.Option.Model.MaxLength', [
    'Product.Option.Model',
    'Utils',
    'Backbone',
    'underscore'
], function ProductOptionModelMaxLength(
    ProductOptionModel,
    Utils,
    Backbone,
    _
) {
    'use strict';

    _.extend(ProductOptionModel.prototype, {
        validation: _.extend(ProductOptionModel.prototype.validation, {
            'value.internalid': {
                fn: function optionValueValidator() { // eslint-disable-line
                    var value = this.get('value') && this.get('value').internalid;
                    var maxLength = 160;
                    var optionsConfiguration;
                    var selectedOptionConfig;

                    if (this.get('isMandatory') && !value) {
                        return Utils.translate('Please specify a value for this option');
                    }

                    if (value) {
                        if (this.get('type') === 'text' || this.get('type') === 'textarea') {
                            // This piece of validation is custom
                            try {
                                optionsConfiguration = SC.CONFIGURATION.ItemOptions.optionsConfiguration;
                                selectedOptionConfig = _.findWhere(optionsConfiguration, { cartOptionId: this.get('cartOptionId') });

                                if (selectedOptionConfig.maxLength) {
                                    maxLength = selectedOptionConfig.maxLength;
                                }
                            } catch (error) {
                                console.log('There was an error when validating the item options, details: ' + error.message);
                            }

                            if (this.get('isMandatory') && !String(value).trim()) {
                                return Utils.translate('Please enter a valid input for this string');
                            }
                            // End of validation customization

                            if (value.length > maxLength) {
                                return Utils.translate(
                                    'Please enter a string shorter (maximum length: $(0))',
                                    maxLength
                                );
                            }
                        } else if (
                            this.get('type') === 'email' &&
                            !Backbone.Validation.patterns.email.test(value)
                        ) {
                            return Utils.translate('Please enter a valid email');
                        } else if (
                            this.get('type') === 'integer' &&
                            !Backbone.Validation.patterns.netsuiteInteger.test(value)
                        ) {
                            return Utils.translate('Please enter a valid integer number');
                        } else if (
                            this.get('type') === 'float' &&
                            !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid decimal number');
                        } else if (
                            this.get('type') === 'currency' &&
                            !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid currency number');
                        } else if (
                            this.get('type') === 'phone' &&
                            !Backbone.Validation.patterns.netsuitePhone.test(value)
                        ) {
                            return Utils.translate('Please enter a valid phone');
                        } else if (
                            this.get('type') === 'percent' &&
                            !Backbone.Validation.patterns.netsuitePercent.test(value)
                        ) {
                            return Utils.translate('Please enter a valid percent');
                        } else if (
                            this.get('type') === 'url' &&
                            !Backbone.Validation.patterns.netsuiteUrl.test(value)
                        ) {
                            return Utils.translate('Please enter a valid url');
                        } else if (
                            this.get('type') === 'select' &&
                            !_.findWhere(this.get('values'), { internalid: value })
                        ) {
                            return Utils.translate('Please select a valid value for this option');
                        }
                    }
                }
            }
        })
    });
});
