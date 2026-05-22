define('BrandsPage.List.Model', [
    'SCModel',
    'Utils'
], function BrandsPageListModel(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    function BrandsPageListModelMain(model, options) {
        SCModel.call(this, model, options);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(getExtensionAssetsPath('Modules/BrandPage/SuiteScript2/BrandsPage.List.Service.ss'), true);
        };
    }

    BrandsPageListModelMain.prototype = Object.create(SCModel.prototype);

    BrandsPageListModelMain.prototype.constructor = BrandsPageListModelMain;

    // Return the AMD constructor.
    return BrandsPageListModelMain;
});
