define('LoginRegisterTrade.Model', [
    'SC.Model',
    'SC.Models.Init',
    'Configuration',
    'Account.Model',
    'Address.Model',
    'SiteSettings.Model',
    'underscore',
    'Backbone.Validation'
], function LoginRegisterTradeModel(
    SCModel,
    ModelsInit,
    Configuration,
    AccountModel,
    AddressModel,
    SiteSettingsModel,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'LoginRegisterTradeModel',

        validation: {
            country: {
                required: true,
                msg: 'Country is required'
            },
            firstName: {
                required: true,
                msg: 'First Name is required'
            },
            lastName: {
                required: true,
                msg: 'Last Name is required'
            },
            email: {
                required: true,
                pattern: 'email',
                msg: 'Valid Email is required'
            },
            email2: [
                {
                    required: true,
                    msg: 'Confirm email is required'
                },
                {
                    equalTo: 'email',
                    msg: 'Email and Confirm Email do not match'
                }
            ],
            companyName: {
                required: true,
                msg: 'Company Name is required'
            },
            password: {
                required: true,
                msg: 'Please enter a valid password'
            },
            password2: [
                {
                    required: true,
                    msg: 'Confirm password is required'
                },
                {
                    equalTo: 'password',
                    msg: 'New Password and Confirm Password do not match'
                }
            ],
            taxId: {
                required: true,
                msg: 'Tax id is required'
            },
            officePhone: {
                required: true,
                fn: _.validatePhone
            },
            street: {
                required: true,
                msg: 'Address is required'
            },
            city: {
                required: true,
                msg: 'City is required'
            },
            state: function validateState(value, _fieldName, form) {
                var countryOfResidence = form.countryOfResidence;
                if (!value && countryOfResidence === '2') {
                    return 'State is required';
                }
                return undefined;
            },
            stateUs: function validateStateUs(value, _fieldName, form) {
                var countryOfResidence = form.countryOfResidence;
                if (!value && countryOfResidence === '1') {
                    return 'State is required';
                }
                return undefined;
            },
            zip: {
                required: true,
                msg: 'Zip Code is required'
            }
        },

        getBusinessTypeList: function getBusinessTypeList() {
            var columns = [
                new nlobjSearchColumn('name').setSort(false),
                new nlobjSearchColumn('internalid')
            ];
            var listSearch = nlapiSearchRecord('customercategory', null, [
                ['isinactive', 'is', 'F']
            ], columns);

            return _.map(listSearch, function fnResults(result) {
                return {
                    id: result.getValue('internalid'),
                    value: result.getValue('name')
                };
            });
        },

        get: function get() {
            var businessOptions = this.getBusinessTypeList();

            return {
                businessOptions: businessOptions
            };
        },

        formatPhone: function formatPhone(phone, formatParam) {
            // fyi: the tilde (~) its used as !== -1
            var phoneNumberString = phone || '';
            var extensionSearch = phoneNumberString.search(/[A-Za-z#]/);
            // eslint-disable-next-line no-bitwise
            var extension = ~extensionSearch ? ' ' + phoneNumberString.substring(extensionSearch) : '';
            // eslint-disable-next-line no-bitwise
            var phoneNumber = ~extensionSearch ? ' ' + phoneNumberString.substring(0, extensionSearch) : phoneNumberString;
            var format = formatParam || SiteSettingsModel.get().phoneformat;
            var result = phoneNumberString;
            var formatTokens;
            var phoneDigits;

            if (/^[0-9()-.\s]+$/.test(phoneNumber) && format) {
                formatTokens = {};
                phoneDigits = phoneNumber.replace(/[()-.\s]/g, '');

                switch (format) {
                // c: country, ab: area_before, aa: area_after, d: digits
                case '(123) 456-7890':
                    formatTokens = {
                        c: ' ',
                        ab: '(',
                        aa: ') ',
                        d: '-'
                    };
                    break;
                case '123 456 7890':
                    formatTokens = {
                        c: ' ',
                        ab: '',
                        aa: ' ',
                        d: ' '
                    };
                    break;
                case '123-456-7890':
                    formatTokens = {
                        c: ' ',
                        ab: '',
                        aa: '-',
                        d: '-'
                    };
                    break;
                case '123.456.7890':
                    formatTokens = {
                        c: ' ',
                        ab: '',
                        aa: '.',
                        d: '.'
                    };
                    break;
                default:
                    result = phoneNumberString;
                }

                switch (phoneDigits.length) {
                case 7:
                    result = phoneDigits.substring(0, 3) +
                        formatTokens.d +
                        phoneDigits.substring(3) +
                        extension;
                    break;
                case 10:
                    result = formatTokens.ab +
                        phoneDigits.substring(0, 3) +
                        formatTokens.aa +
                        phoneDigits.substring(3, 6) +
                        formatTokens.d +
                        phoneDigits.substring(6) + extension;
                    break;
                case 11:
                    result = phoneDigits.substring(0, 1) +
                        formatTokens.c +
                        formatTokens.ab +
                        phoneDigits.substring(1, 4) +
                        formatTokens.aa +
                        phoneDigits.substring(4, 7) +
                        formatTokens.d +
                        phoneDigits.substring(7) + extension;
                    break;
                default:
                    result = phoneNumberString;
                }
            }
            return result.toString();
        },

        mapperData: function mapperData(data) {
            return {
                user: {
                    firstname: data.firstName,
                    lastname: data.lastName,
                    companyname: data.companyName,
                    email: data.email,
                    password: data.password,
                    password2: data.password2,
                    custentity_rad_web_customer_type: Configuration.get('tradeCustomerTypeId'),
                    custentity_rad_pending_trade_approval: 'T',
                    custentity_ps_cust_aprv: 'T',
                    // custentity_ps_bss_crt_date: data.numberOfYearsInBusiness,
                    phoneinfo: {
                        phone: this.formatPhone(data.officePhone),
                        altphone: this.formatPhone(data.cellPhone),
                        fax: this.formatPhone(data.fax)
                    },
                    category: data.businessType,
                    resalenumber: data.taxResaleNumber,
                    vatregnumber: data.taxId,
                    url: data.webSite
                },
                address: {
                    addr1: data.street,
                    addr2: data.street2,
                    company: data.companyName,
                    city: data.city,
                    state: data.countryOfResidence === '1' ? data.stateUs : data.state,
                    zip: data.zip,
                    country: data.country,
                    isresidential: 'F',
                    phone: this.formatPhone(data.officePhone),
                    fullname: data.firstName + ' ' + data.lastName,
                    defaultbilling: 'T',
                    defaultshipping: 'T',
                    custrecord_drop_ship_exempt: 'T'
                }
            };
        },

        registerAccount: function registerAccount(data) {
            var preparedData;
            var user;
            var address;
            var customerAddress;
            var duplicateAddress;

            try {
                preparedData = this.mapperData(data);
                user = AccountModel.register(preparedData.user);
                address = AddressModel.unwrapAddressee(preparedData.address);
                ModelsInit.customer.addAddress(address);
                // manage duplicate address error created by addAddress
                customerAddress = customer.getAddressBook();
                if (customerAddress.length > 1) {
                    duplicateAddress = _.find(customerAddress, function findAddr(addr) {
                        return addr.defaultshipping === 'F';
                    });
                    customer.removeAddress(duplicateAddress.internalid);
                }
                return {
                    success: true,
                    user: user,
                    touchpoint: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints
                };
            } catch (e) {
                return {
                    success: false
                };
            }
        }
    });
});
