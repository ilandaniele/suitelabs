define('FreeShippingMethod.Model', [
    'SCModel',
    'Utils'],
    function FreeShippingMethodModel(
        SCModelComponent,
        Utils
    ) {
        'use strict';

        /* global getExtensionAssetsPath */
        var SCModel = SCModelComponent.SCModel;
        function FreeShippingMethodModelObject() {
            SCModel.call(this);
            this.urlRoot = function urlRoot() {
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath(
                        'services/FreeShippingMethod.Service.ss'
                    ),
                    false
                );
            };
        }

        FreeShippingMethodModelObject.prototype = Object.create(SCModel.prototype);
        FreeShippingMethodModelObject.prototype.constructor = FreeShippingMethodModelObject;
        return FreeShippingMethodModelObject;
    });
