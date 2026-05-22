define('StoreLocator.StoreLocator.Model', [
    'Application',
    'StoreLocator.Model',
    'Configuration',
    'underscore'
], function StoreLocatorStoreLocatorModel(
    Application,
    StoreLocator,
    Configuration,
    _
) {
    'use strict';

    _.extend(StoreLocator, {
        columns: {
            'address1': new nlobjSearchColumn('custrecord_ef_st_s_address1'),
            'address2': new nlobjSearchColumn('custrecord_ef_st_s_address2'),
            'city': new nlobjSearchColumn('custrecord_ef_st_s_city'),
            'country': new nlobjSearchColumn('custrecord_ef_st_s_country'),
            'state': new nlobjSearchColumn('custrecord_ef_st_s_state'),
            'internalid': new nlobjSearchColumn('internalid'),
            'isinactive': new nlobjSearchColumn('isinactive'),
            'name': new nlobjSearchColumn('name'),
            'phone': new nlobjSearchColumn('custrecord_ef_st_s_phone'),
            'zip': new nlobjSearchColumn('custrecord_ef_st_s_zipcode'),
            'latitude': new nlobjSearchColumn('custrecord_ef_st_s_latitude'),
            'longitude': new nlobjSearchColumn('custrecord_ef_st_s_longitude'),
            'openHours': new nlobjSearchColumn('custrecord_ef_st_s_openinghours'),
            'mainImage': new nlobjSearchColumn('custrecord_ef_st_s_main_image'),
            'thumbnailImage': new nlobjSearchColumn('custrecord_ef_st_s_thumbnail_image'),
            'markerImage': new nlobjSearchColumn('custrecord_ef_st_s_marker_image'),
            'description': new nlobjSearchColumn('custrecord_ef_st_s_long_description'),
            'shortDescription': new nlobjSearchColumn('custrecord_ef_st_s_short_description'),
            'urlcomponent': new nlobjSearchColumn('custrecord_ef_st_s_urlcomponent')
        },

        getDistanceFormulates: function getDistanceFormulates() {
            var PI = Math.PI;
            var R = Configuration.get().storeLocator.distanceUnit === 'mi' ? 3959 : 6371;
            var lat = (this.data.latitude * PI) / 180;
            var lon = (this.data.longitude * PI) / 180;
            return R +
                ' * (2 * ATAN2(SQRT((SIN((' + lat + '- ({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) / 2) *' +
                'SIN((' + lat + '- ({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) / 2) + ' +
                'COS(({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) * COS(' + lat + ') *' +
                'SIN((' + lon + '- ({custrecord_ef_st_s_longitude} * ' + PI + ' / 180)) /2) *' +
                'SIN((' + lon + '- ({custrecord_ef_st_s_longitude} * ' + PI + ' / 180)) /2))),' +
                'SQRT(1 - (SIN((' + lat + '- ({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) / 2) *' +
                'SIN((' + lat + '- ({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) / 2) +' +
                'COS(({custrecord_ef_st_s_latitude} * ' + PI + ' / 180)) * COS(' + lat + ') * ' +
                'SIN((' + lon + '- ({custrecord_ef_st_s_longitude} * ' + PI + ' / 180)) /2) * ' +
                'SIN((' + lon + '- ({custrecord_ef_st_s_longitude} * ' + PI + ' / 180)) /2)))))';
        },

        getFriendlyName: function getFriendlyName(id) {
            if (Configuration.get().storeLocator && Configuration.get().storeLocator.customFriendlyName) {
                try {
                    return nlapiLookupField('customrecord_ef_st_store', id, Configuration.get('customFriendlyName'));
                } catch (error) {
                    return '';
                }
            }
            return '';
        },

        getRecordValues: function getRecordValues(record) {
            var distance;
            var mapResult = {};
            var id = record.getValue('internalid');
            var friendlyName = this.getFriendlyName(id);
            mapResult.recordtype = record.getRecordType();
            mapResult.internalid = id;
            mapResult.address1 = record.getValue('custrecord_ef_st_s_address1');
            mapResult.address2 = record.getValue('custrecord_ef_st_s_address2');
            mapResult.city = record.getValue('custrecord_ef_st_s_city');
            mapResult.country = record.getText('custrecord_ef_st_s_country');
            mapResult.state = record.getText('custrecord_ef_st_s_state');
            mapResult.name = friendlyName !== '' ? friendlyName : record.getValue('name');
            mapResult.phone = record.getValue('custrecord_ef_st_s_phone');
            mapResult.zip = record.getValue('custrecord_ef_st_s_zipcode');
            mapResult.description = record.getValue('custrecord_ef_st_s_long_description');
            mapResult.openHours = record.getValue('custrecord_ef_st_s_openinghours');
            mapResult.mainImage = record.getValue('custrecord_ef_st_s_main_image');
            mapResult.thumbnailImage = record.getValue('custrecord_ef_st_s_thumbnail_image');
            mapResult.markerImage = record.getValue('custrecord_ef_st_s_marker_image');
            mapResult.shortDescription = record.getValue('custrecord_ef_st_s_short_description');
            mapResult.urlcomponent = record.getValue('custrecord_ef_st_s_urlcomponent');
            mapResult.location = {
                latitude: record.getValue('custrecord_ef_st_s_latitude'),
                longitude: record.getValue('custrecord_ef_st_s_longitude')
            };
            if (this.data.latitude && this.data.longitude) {
                distance = Math.round(record.getValue(this.columns.distance) * 10) / 10;
                if (!_.isUndefined(distance)) {
                    mapResult.distance = Math.round(record.getValue(this.columns.distance) * 10) / 10;
                    mapResult.distanceunit = Configuration.get().storeLocator.distanceUnit;
                }
            }
            if (this.isPickupInStoreEnabled) {
                mapResult.servicehours = this.getServiceHours(id);
                mapResult.timezone = {
                    text: record.getText('timezone'),
                    value: record.getValue('timezone')
                };
                mapResult.allowstorepickup = record.getValue('allowstorepickup') === 'T';
                if (mapResult.allowstorepickup) {
                    mapResult.nextpickupcutofftime = record.getValue('nextpickupcutofftime');
                    mapResult.nextpickupday = null;
                    mapResult.nextpickuphour = null;
                    mapResult.nextpickupcutofftime = null;
                }
            }
            return mapResult;
        },

        search: function search(data) {
            var results;
            var result = {};
            var records = [];
            var self = this;
            var formula;
            var limit = Configuration.get('storeLocator.limit');
            this.filters = [];
            this.data = data;
            this.filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));

            if (this.data.latitude && this.data.longitude) {
                this.filters.push(new nlobjSearchFilter('custrecord_ef_st_s_latitude', null, 'isnotempty'));
                this.filters.push(new nlobjSearchFilter('custrecord_ef_st_s_longitude', null, 'isnotempty'));

                formula = this.getDistanceFormulates();
                if (this.data.radius) {
                    this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'lessthan', this.data.radius).setFormula(formula));
                }
                this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'noneof', '@NONE@'));
                this.columns.distance = new nlobjSearchColumn('formulanumeric').setFormula(formula).setFunction('roundToTenths').setSort(false);
            }
            if (this.data.page === 'all') {
                if (limit) {
                    this.search_results = Application.getPaginatedSearchResults({
                        record_type: 'customrecord_ef_st_store',
                        filters: _.values(this.filters),
                        columns: _.values(this.columns),
                        page: 1,
                        results_per_page: parseInt(limit, 10)
                    });
                } else {
                    this.search_results = Application.getAllSearchResults('customrecord_ef_st_store', _.values(this.filters), _.values(this.columns));
                }

            } else {
                this.search_results = Application.getPaginatedSearchResults({
                    record_type: 'customrecord_ef_st_store',
                    filters: _.values(this.filters),
                    columns: _.values(this.columns),
                    page: this.data.page || 1,
                    results_per_page: this.data.results_per_page
                });
            }

            results = ((this.data.page === 'all' && !limit ? this.search_results : this.search_results.records) || []) || [];
            _.each(results, function fnResults(record) {
                records.push(self.getRecordValues(record));
            });
            if (this.data.page === 'all') {
                result = records;
            } else {
                result = this.search_results;
                result.records = records;
            }
            return result;
        },
        list: function list(data) {
            data.locationtype = data.locationtype || Configuration.get('storeLocator.defaultTypeLocations');
            return this.search(data);
        },
        getByUrlComponent: function getByUrlComponent(urlcomponent) {
            var records = [];
            var self = this;
            var filters = [
                new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                new nlobjSearchFilter('custrecord_ef_st_s_urlcomponent', null, 'is', urlcomponent + '')
            ];
            var search = nlapiSearchRecord(
                'customrecord_ef_st_store',
                null,
                filters,
                _.values(this.columns)
            );
            this.data = {};
            _.each(search || [], function fnResults(record) {
                records.push(self.getRecordValues(record));
            });
            return records && records[0];
        }
    });
});
