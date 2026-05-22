define('GeoIPLocation.Model', [
    'SC.Model',
    'underscore',
    'Configuration'
], function GeoIPLocationModel(
    SCModel,
    _,
    Configuration
) {
    'use strict';

    return SCModel.extend({

        name: 'GeoIpModel',

        errorTrace: [],

        validateIpsLocationAccess: function validateIpsLocationAccess() {
            var countryData = this.getAllCountriesFromRequest(request);
            var filters = [];
            var columns;
            var restrictedCountries;
            var isRestricted;
            var blocked;
            var logRecord;
            var logDate = this.getTimeAndDateForLog();
            var self = this;
            var idNewRecordLog;
            _.each(countryData.countriesCode, function filterBuilder(cc, index) {
                filters.push(['custrecord_country_code', 'is', cc + '']);
                if (index !== (countryData.countriesCode.length - 1)) {
                    filters.push('OR');
                }
            });
            if (filters && filters.length) {
                columns = [new nlobjSearchColumn('name'), new nlobjSearchColumn('custrecord_country_code')];
                restrictedCountries = nlapiSearchRecord('customrecord_restricted_countries', null, filters, columns);
            }
            this.errorTrace.push('DEBUG FILTER IN customrecord_restricted_countries: ' + JSON.stringify(filters));
            this.errorTrace.push('DEBUG LOG DATE: ' + JSON.stringify(logDate));
            isRestricted = restrictedCountries && restrictedCountries.length > 0;

            blocked = isRestricted ? 'Yes' : 'No';
            logRecord = nlapiCreateRecord('customrecord_restricted_countries_ip_log');
            logRecord.setFieldValue('custrecord_country_code_log', countryData.countriesCode);
            logRecord.setFieldValue('custrecord_ip_log', countryData.ips);
            logRecord.setFieldValue('custrecord_date_log', logDate.date);
            logRecord.setFieldValue('custrecord_time_of_day', logDate.time);
            logRecord.setFieldValue('custrecord_blocked_log', blocked);
            idNewRecordLog = nlapiSubmitRecord(logRecord);
            self.errorTrace.push('DEBUG NEW RECORD IP LOG CREATED ' + idNewRecordLog);
            return _.extend(countryData, {
                isRestricted: isRestricted,
                idNewRecordLog: idNewRecordLog
            });
        },
        getTimeAndDateForLog: function getTimeAndDateForLog() {
            var dateTime = new Date();
            var min;
            var timeString;
            var dateString = (dateTime.getMonth() + 1) + '/'
                + (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()) + '/'
                + (dateTime.getFullYear());
            var hour = dateTime.getHours();
            var timePM = (hour - 12) > 0 ? 'PM' : 'AM';
            hour = timePM === 'PM' ? hour - 12 : hour;
            hour = hour - 10 ? '0' + hour : hour;
            min = dateTime.getMinutes();
            min = min < 10 ? '0' + min : min;
            timeString = hour + ':' + min + ' ' + timePM;
            return {
                time: timeString,
                date: dateString
            };
        },
        get: function get() {
            var response = this.validateIpsLocationAccess();
            nlapiLogExecution('DEBUG', 'ip geo location trace', JSON.stringify(this.errorTrace));
            return response;
        },
        getAllCountriesFromRequest: function getAllCountriesFromRequest(request) {
            var ipsArray = _.uniq(this.getCustomerIps(request) || []);
            var countries = [];
            var isoCode;
            var self = this;
            var headers = this.getHeaderForRequest();
            this.errorTrace.push('DEBUG REQUEST HEADERS: ' + JSON.stringify(headers));
            if (ipsArray && ipsArray.length) {
                _.each(ipsArray, function eachIp(ip) {
                    isoCode = self.getCountryForApi(ip, headers);
                    if (isoCode) {
                        countries.push(isoCode);
                    } else {
                        self.errorTrace.push('ERROR UNSOLVED RETURN FORMAT FROM API');
                    }
                });
            }
            return {
                countriesCode: countries,
                warning: 'countries found: ' + countries.length,
                ips: ipsArray,
                redirectUrl: Configuration.get('geoIPLocationRedirectUrlRelative'),
                errorTrace: this.errorTrace
            };
        },
        getCountryForApi: function getCountryForApi(ip, headers) {
            var response;
            var responseObject;
            var url = Configuration.get('geoIPLocationServiceURL') + ip + '?pretty';
            var codeIso;
            this.errorTrace.push('DEBUG SERVICE CALL URL: ' + url);
            try {
                response = this.getFromCache(ip);
                this.errorTrace.push('DEBUG GETTING DATA FROM CACHE: ' + JSON.stringify(response));
                if (!response) {
                    response = nlapiRequestURL(url, null, headers);
                    response = response && response.getBody();
                    this.writeToCache(ip, response);
                }
                try {
                    responseObject = JSON.parse(response);
                    this.errorTrace.push('DEBUG RESPONSE SERVICE: ' + JSON.stringify(responseObject));
                    codeIso = responseObject &&
                            responseObject.registered_country &&
                            responseObject.registered_country.iso_code;
                    return codeIso || null;
                } catch (e) {
                    this.errorTrace.push('ERROR PARSE RESPONSE FROM API FORM IP: ' + ip);
                    nlapiLogExecution('ERROR', 'PARSE RESPONSE FROM API ' + url, response);
                }
            } catch (e) {
                this.errorTrace.push('ERROR GETTING RESPONSE FROM API: ' + ip);
                nlapiLogExecution('ERROR', 'GETTING RESPONSE FROM API ' + url, JSON.stringify(e));
            }
            return null;
        },
        getHeaderForRequest: function getHeaderForRequest() {
            var credentials = Configuration.get('geoIPLocationUserId') + ':' + Configuration.get('geoIPLocationLicenseKey');
            var creds = nlapiEncrypt(credentials, 'base64');
            this.errorTrace.push('DEBUG ENCRYPT CREDENTIALS: ' + credentials + ' > ' + creds);
            return {
                Authorization: 'Basic ' + creds,
                Accept: 'application/json'
            };
        },
        getCustomerIps: function getCustomerIp(request) {
            var result = [];
            var forwardedHeader = request.getHeader('Forwarded') || request.getHeader('forwarded') || '';

            if (!forwardedHeader) {
                result.push(request.getHeader('True-Client-IP') || request.getHeader('NS-Client-IP'));
            } else {
                result = this.getIpListFromForwardedHeader(request);
            }
            this.errorTrace.push('DEBUG REQUEST IP ORIGIN: ' + result);
            return result;
        },
        getIpListFromForwardedHeader: function getIpListFromForwardedHeader(request) {
            var forwardedHeaders = {};
            var allHeaders = request.getAllHeaders() || [];
            var currentHeaderValue;
            var headerName;
            var chValueAux;
                // eslint-disable-next-line no-restricted-syntax
            for (headerName in allHeaders) {
                if (headerName === 'Forwarded' || headerName === 'forwarded') {
                    currentHeaderValue = allHeaders[headerName] || '';
                        // get only for= part of the list
                    currentHeaderValue = currentHeaderValue.split(';');
                    currentHeaderValue = _.filter(currentHeaderValue, function filter(val) {
                        return val.indexOf('for=') > -1;
                    });
                        // there is only one section for
                    currentHeaderValue = (currentHeaderValue.length && currentHeaderValue[0]) || '';
                        // removing empty space
                    currentHeaderValue = currentHeaderValue.replace(/ /g, '');
                        // get each ip
                    currentHeaderValue = currentHeaderValue.split(',') || [];
                        // eslint-disable-next-line no-loop-func
                    _.each(currentHeaderValue, function eachValue(chValue) {
                        chValueAux = chValue.replace(/for=/, '');
                        forwardedHeaders[chValueAux] = forwardedHeaders[chValueAux] ? forwardedHeaders[chValueAux] : chValueAux;
                    });
                }
            }

            return _.values(forwardedHeaders);
        },

        getFromCache: function getFromCache(hash) {
            var cache = nlapiGetCache('GEO_LOCATION');
            var cachedInfo = cache.get(hash);
            this.errorTrace.push('DEBUG cachedInfo ' + cachedInfo);
            if (cachedInfo) {
                return cachedInfo;
            }
            return null;
        },
        writeToCache: function writeToCache(hash, cacheData) {
            var cache = nlapiGetCache('GEO_LOCATION');
            this.errorTrace.push('PUSHING DATA IN CACHE: ' + hash + ' > ' + cacheData);
            cache.put(hash, cacheData);
        }

    });
});

