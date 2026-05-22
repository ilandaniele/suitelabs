define('ZipCodeShippingPrices.Model', [
    'SCModel',
    'Utils'],
    function ZipCodeShippingPricesModel(
        SCModelComponent,
        Utils
    ) {
        'use strict';

        /* global getExtensionAssetsPath */
        var SCModel = SCModelComponent.SCModel;
        function ZipCodeShippingPricesModelObject() {
            SCModel.call(this);
            this.urlRoot = function urlRoot() {
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath('Modules/Main/SuiteScript2/ZipCodeShippingPrices.Service.ss'),
                    true
                );
            };
        }

        ZipCodeShippingPricesModelObject.prototype = Object.create(SCModel.prototype);
        ZipCodeShippingPricesModelObject.prototype.constructor = ZipCodeShippingPricesModelObject;
        return ZipCodeShippingPricesModelObject;
    });
