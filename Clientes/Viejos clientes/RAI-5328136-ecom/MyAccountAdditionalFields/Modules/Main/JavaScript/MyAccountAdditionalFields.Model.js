/* globals getExtensionAssetsPath */
define('MyAccountAdditionalFields.Model', [
    'SCModel',
    'Utils'
], function MyAccountAdditionalFieldsModel(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    function MyAccountAdditionalFieldsModelObject() {
        SCModel.call(this);
        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('Modules/Main/SuiteScript2/MyAccountAdditionalFields.Service.ss'), true
            );
        };
    }

    MyAccountAdditionalFieldsModelObject.prototype = Object.create(SCModel.prototype);

    MyAccountAdditionalFieldsModelObject.prototype.constructor = MyAccountAdditionalFieldsModelObject;

    return MyAccountAdditionalFieldsModelObject;
});
