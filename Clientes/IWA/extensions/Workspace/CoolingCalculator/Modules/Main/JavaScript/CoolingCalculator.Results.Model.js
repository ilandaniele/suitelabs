/* globals getExtensionAssetsPath */
define('CoolingCalculator.Results.Model', [
    'SCModel',
    'Utils'
], function CoolingCalculatorResultsModelDefinition(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    var ChildItemsModel = function ChildItemsModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('Modules/Main/SuiteScript2/CoolingCalculator.Results.Service.ss'),
                true
            );
        };
    };

    ChildItemsModel.prototype = Object.create(SCModel.prototype);

    ChildItemsModel.prototype.constructor = ChildItemsModel;

    return ChildItemsModel;
});
