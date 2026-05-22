define('EnhancedSearch.Model', [
    'SCModel',
    'Utils'],
    function EnhancedSearchModel(
        SCModelComponent,
        Utils
    ) {
        'use strict';

        /* global getExtensionAssetsPath */

        var SCModel = SCModelComponent.SCModel;
        function EnhancedSearchModelObject() {
            SCModel.call(this);
            this.urlRoot = function urlRoot() {
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath('Modules/Main/SuiteScript2/EnhancedSearch.Service.ss'), true
                );
            };
        }

        EnhancedSearchModelObject.prototype = Object.create(SCModel.prototype);
        EnhancedSearchModelObject.prototype.constructor = EnhancedSearchModelObject;
        return EnhancedSearchModelObject;
    });
