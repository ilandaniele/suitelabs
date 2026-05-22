define('StoreLocator.LocationRoute.View', [
    'Backbone',
    '_store_locator_location_route.tpl',
    'jQuery',
    'underscore',
    'Utils'
], function StoreLocatorLocationRouteViewFn(
    Backbone,
    StoreLocatorLocationRouteTpl,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationRouteTpl,

        events: {
            'click [data-action="changeTravelMode"]': 'changeTravelMode',
            'click [data-action="getRoute"]': 'getRoute',
            'click [data-action="getCurrentLocation"]': 'getCurrentLocation',
            'click [data-action="print"]': 'print'
        },

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationModel = options.locationModel;
            this.reference_map = options.reference_map;
            this.locationRouteModel = options.locationRouteModel;
            this.collection = options.collection;
        },
        print: function print() {
            window.print();
        },

        getOriginFullAddress: function getOriginFullAddress(locationModel) {
            var addr = [];
            addr.push(locationModel.get('address1'));
            if (locationModel.get('city')) {
                addr.push(locationModel.get('city'));
            }
            if (locationModel.get('state')) {
                addr.push(locationModel.get('state'));
            }
            if (locationModel.get('country')) {
                addr.push(locationModel.get('country'));
            }
            if (locationModel.get('zip')) {
                addr.push(locationModel.get('zip'));
            }
            return addr.join(', ');
        },

        showAutoCompleteInput: function showAutoCompleteInput(input) {
            if (input) {
                // eslint-disable-next-line no-undef
                this.autocomplete = new google.maps.places.SearchBox(input);
                // eslint-disable-next-line no-undef
                google.maps.event.addListener(this.autocomplete, 'places_changed', _.bind(this.placesChanged, this));
            }
        },
        placesChanged: function placesChanged() {
            var place = this.autocomplete && this.autocomplete.getPlaces() &&
                this.autocomplete.getPlaces()[0];
            if (!place || _.size(place) === 0) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }

            if (!place.geometry) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }
            this.setFromRoute(place.formatted_address);
            this.getRoute();
        },

        setFromRoute: function setFromRoute(address, isFromGeoLocation) {
            this.locationRouteModel.set('origin', address);
            if (isFromGeoLocation) {
                this.$('[name="route-from"]').val(address);
            }
        },

        changeTravelMode: function changeTravelMode(e) {
            this.locationRouteModel.set('mode', jQuery(e.target).data('mode'));
            this.render();
        },
        validateRouteModel: function validateRouteModel() {
            return this.locationRouteModel.get('mode') &&
                this.locationRouteModel.get('origin') &&
                this.locationRouteModel.get('destination');
        },
        getRoute: function getRoute(e) {
            // eslint-disable-next-line no-undef
            var directionsService = new google.maps.DirectionsService();
            // eslint-disable-next-line no-undef
            var directionsRenderer = new google.maps.DirectionsRenderer();
            var routeParams;
            var leg;
            var self = this;
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.validateRouteModel()) {
                directionsRenderer.setMap(this.reference_map.map);
                routeParams = this.locationRouteModel.toRouteParams();
                directionsService.route(routeParams, function handleResponse(response, status) {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                        leg = response.routes &&
                            response.routes[0] &&
                            response.routes[0].legs &&
                            response.routes[0].legs[0];
                        if (leg) {
                            self.locationRouteModel.set('leg', leg);
                        }
                    } else {
                        self.showError(Utils.translate('No result for this params'));
                    }
                });
            }
        },

        getCurrentLocation: function getCurrentLocation(e) {
            var promise = this.useCurrentLocation();
            var self = this;
            e.preventDefault();
            promise.done(function doneFn(formattedAddress) {
                self.setFromRoute(formattedAddress, true);
                self.locationRouteModel.set('allowCurrentLocation', true);
                self.getRoute();
            });
        },

        useCurrentLocation: function useCurrentLocation() {
            var self = this;
            var promise = jQuery.Deferred();
            var latLng;
            // eslint-disable-next-line no-undef
            var geoCoder = new google.maps.Geocoder();
            var city;
            var formattedAddress;
            navigator.geolocation.getCurrentPosition(
                function doneCallback(position) {
                    latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    geoCoder.geocode({ location: latLng }, function handleLocationResult(results, status) {
                        // eslint-disable-next-line no-undef
                        if (status === google.maps.GeocoderStatus.OK) {
                            city = _(results).find(function findFn(result) {
                                return !_.indexOf(result.types, 'locality');
                            });
                            if (city) {
                                formattedAddress = city.formatted_address;
                            } else {
                                formattedAddress = results[0].formatted_address;
                            }
                            promise.resolveWith(self, [formattedAddress]);
                        }
                    });
                },
                function errorCallBack() {
                    promise.rejectWith(self, arguments);
                    self.locationRouteModel('allowCurrentLocation', false);
                }
            );
            return promise;
        },

        render: function render() {
            var self = this;
            this._render();
            this.$input = this.$('[data-type="autocomplete-input-route"]');
            this.reference_map.load().done(function donFn() {
                self.showAutoCompleteInput(self.$input.get(0));
                self.setDataInForm();
            });
            return this;
        },

        setDataInForm: function setDataInForm() {
            this.$('[name="route-from"]').val(this.locationRouteModel.get('origin'));
            if (!this.locationRouteModel.get('destination')) {
                this.locationRouteModel.set('destination', this.getOriginFullAddress(this.locationModel));
            }
            if (!this.locationRouteModel.get('mode')) {
                this.locationRouteModel.set('mode', 'DRIVING');
            }
        },

        getContext: function getContext() {
            return {
                model: this.locationRouteModel,
                isDRIVING: this.locationRouteModel.get('mode') === 'DRIVING' || !this.locationRouteModel.get('mode'),
                isWALKING: this.locationRouteModel.get('mode') === 'WALKING',
                isBICYCLING: this.locationRouteModel.get('mode') === 'BICYCLING',
                isTRANSIT: this.locationRouteModel.get('mode') === 'TRANSIT'
            };
        }
    });
});
