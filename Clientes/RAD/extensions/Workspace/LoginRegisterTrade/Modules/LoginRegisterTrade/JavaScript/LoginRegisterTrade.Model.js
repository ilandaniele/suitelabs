/* global getExtensionAssetsPath */
define('LoginRegisterTrade.Model', [
    'SCModel',
    'Utils',
    'underscore'
], function LoginRegisterTradeModelDefinition(
    SCModelComponent,
    Utils,
    _
) {
    'use strict';

    var validateTaxId = function validateTaxId(data) {
        // nine digits number
        if ((!data || (!(/^\d{9}$/.test(data)) && !(/\d{2}-\d{7}/.test(data)))) && this.get('selectedCountry') === 'US') {
            return Utils.translate('Please enter your nine digit Tax ID Number');
        } else if (data && (!(/^\d{9}$/.test(data)) && !(/\d{2}-\d{7}/.test(data)))) {
            return Utils.translate('Please enter your nine digit Tax ID Number');
        }
        return undefined;
    };

    var validateResale = function validateResale(data) {
        if (data && data.length < 9 && this.get('selectedCountry') === 'US') {
            return Utils.translate('Resale Number is invalid');
        }
        return undefined;
    };

    var validateBusinessYears = function validateBusinessYears(businessYears) {
        if (businessYears && _.isNaN(parseInt(businessYears, 10))) {
            return Utils.translate('Please enter a valid number of years');
        }
        return undefined;
    };

    var validatePhoneNotRequired = function validatePhoneNotRequired(phone) {
        var minLength = 7;
        var value;

        if (_.isNumber(phone)) {
            // phone is a number so we can't ask for .length
            // we elevate 10 to (minLength - 1)
            // if the number is lower, then its invalid
            // eg: phone = 1234567890 is greater than 1000000, so its valid
            //     phone = 123456 is lower than 1000000, so its invalid
            if (phone < Math.pow(10, minLength - 1)) {
                return Utils.translate('Phone Number is invalid');
            }
        } else if (phone && this.get('selectedCountry') === 'US') {
            // if its a string, we remove all the useless characters
            value = phone.replace(/[()-.\s]/g, '');
            // we then turn the value into an integer and back to string
            // to make sure all of the characters are numeric

            // first remove leading zeros for number comparison
            while (value.length && value.substring(0, 1) === '0') {
                value = value.substring(1, value.length);
            }
            if (parseInt(value, 10).toString() !== value || value.length < minLength) {
                return Utils.translate('Phone Number is invalid');
            }
        }
        return undefined;
    };

    var validateZipCode = function validateZipCode(value, _valName, form) {
        var countries = SC.ENVIRONMENT.siteSettings.countries || {};
        if (
            !value && (
                (!form.country || countries[form.country])
                && countries[form.country]
                && countries[form.country].isziprequired === 'T'
            )
        ) {
            return Utils.translate('Zip Code is required');
        }

        return undefined;
    };

    var validateOfficePhone = function validateOfficePhone(phone) {
        var minLength = 10;
        var maxLength = 10;
        var isValid = true;
        var value;

        if (_.isNumber(phone)) {
            // phone is a number so we can't ask for .length
            // we elevate 10 to (minLength - 1)
            // if the number is lower, then its invalid
            // eg: phone = 1234567890 is greater than 1000000, so its valid
            //     phone = 123456 is lower than 1000000, so its invalid
            if (phone < Math.pow(10, minLength - 1)) {
                isValid = false;
            }
        } else if (phone && this.get('selectedCountry') === 'US') {
            // if its a string, we remove all the useless characters
            value = phone.replace(/[()-.\s]/g, '');
            // we then turn the value into an integer and back to string
            // to make sure all of the characters are numeric

            // first remove leading zeros for number comparison
            while (value.length && value.substring(0, 1) === '0') {
                value = value.substring(1, value.length);
            }
            if (parseInt(value, 10).toString() !== value || value.length < minLength || value.length > maxLength) {
                isValid = false;
            }
        } else if (phone && this.get('selectedCountry') === 'Other') {
            if (phone < Math.pow(7, minLength - 1)) {
                return 'Phone number must be at least 7 digit long.';
            }
        } else if (!phone) {
            return _('Phone Number is required').translate();
        }
        if (!isValid) {
            return _('Phone Number is invalid. Should be Area Code and Phone Number').translate();
        }
        return undefined;
    };

    var SCModel = SCModelComponent.SCModel;

    var LoginRegisterTradeModel = function LoginRegisterTradeModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/LoginRegisterTrade.Service.ss')
            );
        };

        this.validation = {
            country: {
                required: true,
                msg: Utils.translate('Country is required')
            },
            firstName: {
                required: true,
                msg: Utils.translate('First Name is required')
            },
            lastName: {
                required: true,
                msg: Utils.translate('Last Name is required')
            },
            email: {
                required: true,
                pattern: 'email',
                msg: Utils.translate('Valid Email is required')
            },
            email2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm email is required')
                },
                {
                    equalTo: 'email',
                    msg: Utils.translate('Email and Confirm Email do not match')
                }
            ],
            companyName: {
                required: true,
                msg: Utils.translate('Company Name is required')
            },
            password: {
                required: true,
                minLength: 8,
                msg: Utils.translate('Please enter a valid password, min length 8.')
            },
            password2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm password is required')
                },
                {
                    equalTo: 'password',
                    msg: Utils.translate('New Password and Confirm Password do not match')
                }
            ],
            taxId: {
                fn: validateTaxId
            },
            taxResaleNumber: {
                fn: validateResale
            },
            officePhone: {
                fn: validateOfficePhone
            },
            cellPhone: {
                fn: validatePhoneNotRequired
            },
            street: {
                required: true,
                msg: Utils.translate('Address is required')
            },
            city: {
                required: true,
                msg: Utils.translate('City is required')
            },
            state: {
                fn: Utils.validateState
            },
            zip: {
                fn: validateZipCode
            },
            numberOfYearsInBusiness: {
                fn: validateBusinessYears
            }
        };
    };

    LoginRegisterTradeModel.prototype = Object.create(SCModel.prototype);

    LoginRegisterTradeModel.prototype.constructor = LoginRegisterTradeModel;

    return LoginRegisterTradeModel;
});
