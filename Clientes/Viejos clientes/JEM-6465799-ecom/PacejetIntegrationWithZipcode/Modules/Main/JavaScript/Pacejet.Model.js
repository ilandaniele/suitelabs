define('Pacejet.Model', [
    'SCModel',
    'Utils'],
    function PacejetModel(
        SCModelComponent,
        Utils
    ) {
        'use strict';

        /* global getExtensionAssetsPath */

        var SCModel = SCModelComponent.SCModel;
        function PacejetModelObject() {
            SCModel.call(this);
            this.urlRoot = function urlRoot() {
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath('Modules/Main/SuiteScript2/Pacejet.Service.ss'), true
                );
            };
        }

        PacejetModelObject.prototype = Object.create(SCModel.prototype);
        PacejetModelObject.prototype.constructor = PacejetModelObject;
        return PacejetModelObject;
    });
