/* globals getExtensionAssetsPath */
define('CustomForms.Model', [
    'SCModel',
    'Utils'
],
function CustomFormsModelModule(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    function CustomFormsModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/CustomForms.Service.ss')
            );
        };
    }

    CustomFormsModel.prototype = Object.create(SCModel.prototype);

    CustomFormsModel.prototype.constructor = CustomFormsModel;

    return CustomFormsModel;
});
