define('BrandsPage.List.Collection', [
    'SCCollection',
    'BrandsPage.List.Model',
    'Utils'
], function (
    SCCollectionModule,
    BrandsPageListModel,
    Utils
) {
    'use strict';

    var SCCollection = SCCollectionModule.SCCollection;

    function BrandsPageListCollection(models, options) {
        SCCollection.call(this, models, options);

        this.model = BrandsPageListModel;
        // console.log('this.model',this.model)
        this.url = function () {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    'Modules/BrandPage/SuiteScript2/BrandsPage.List.Service.ss'
                ), true
            );
        };
    }

    BrandsPageListCollection.prototype = Object.create(SCCollection.prototype);
    BrandsPageListCollection.prototype.constructor = BrandsPageListCollection;

    return BrandsPageListCollection;
});
