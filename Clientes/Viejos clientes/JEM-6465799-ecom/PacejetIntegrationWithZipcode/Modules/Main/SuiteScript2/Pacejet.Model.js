/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/https',
    'N/log',
    './moment.min.js'
], function Pacejet(
    nHttps,
    nLog,
    moment
) {
    'use strict';

    return {
        getPacejetShippingData: function getPacejetShippingData(zipCode, item) {
            var response = {};
            var jsonResponse = {};
            var rate = {};
            var jsonBody = {};
            var dateFast = '';
            var dateLow = '';

            var properties = JSON.parse(item);

            var headers = {
                name: 'Accept-Language',
                value: 'en-us',
                'User-Agent-x': 'SuiteScript-Call',
                'Content-Type': 'application/json',
                'PacejetLocation': 'JemSecurity',
                'PacejetLicenseKey': '5674dc0b-d0c3-b182-9e99-b030830e299a'
            };


            var body = {
                'Location': 'JemSecurity',
                'LicenseID': '5674dc0b-d0c3-b182-9e99-b030830e299a',
                'UpsLicenseID': 'ef3c24c8-2d05-519c-8816-1e94ef9c1895',
                'Destination': {
                    'PostalCode': zipCode,
                    'CountryCode': 'US'
                },
                'PackageDetailsList': [
                    {
                        'ProductDetailsList': [
                            {
                                'Number': properties.id,
                                'Weight': properties.weight,
                                'AutoPack': 'true',
                                'Dimensions': {
                                    'Length': properties.length,
                                    'Width': properties.width,
                                    'Height': properties.height,
                                    'Units': 'IN'
                                },
                                'packUIRmngItem': 'N',
                                'Quantity': {
                                    'Units': 'EA',
                                    'Value': properties.quantity
                                }
                            }
                        ]
                    }
                ],
                'Origin': {
                    'LocationType': 'Facility',
                    'LocationSite': 'MAIN',
                    'LocationCode': '1'
                },
                'CustomFields': [
                    {
                        'name': 'AutoPackShipment',
                        'value': 'TRUE'
                    }
                ]

            };
            jsonBody = JSON.stringify(body);
            response = nHttps.post(
                {
                    url: 'https://shipapi.pacejet.cc/Rates?api-version=2.10',
                    body: jsonBody,
                    headers: headers
                }
            );

            jsonResponse = JSON.parse(response.body);
            dateLow = this.compareDate(jsonResponse.serviceRecommendationList.lowestCostArrivalDateText);
            dateFast = this.compareDate(jsonResponse.serviceRecommendationList.fastestArrivalDateText);

            rate = {
                lowestCostArrivalDate: dateLow,
                lowestCostConsigneeFreight: jsonResponse.serviceRecommendationList.lowestCostConsigneeFreight,
                fastestArrivalDate: dateFast,
                fastestConsigneeFreight: jsonResponse.serviceRecommendationList.fastestConsigneeFreight

            };

            return rate;
        },

        compareDate: function compareDate(date) {
            var today = moment();
            var tomorrow = moment().add(1, 'days');
            var returnDate = date;
            if (returnDate) {
                returnDate = date.split(' - ')[1];
                returnDate = moment(returnDate, 'MM-DD-YYYY');

                if (returnDate.diff(today, 'days') === 0) {
                    returnDate = 'today';
                } else if (returnDate.diff(tomorrow, 'days') === 0) {
                    returnDate = 'tomorrow';
                } else {
                    returnDate = returnDate.format('MMMM Do YYYY');
                }
            }
            return returnDate;
        }
    };
});
