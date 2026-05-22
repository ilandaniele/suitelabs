define('BrandsPage.List.Details.View', [
    'SCView',
    'BrandsPage.List.Helper',
    'brandspage_details.tpl'
], function (
    SCViewModule,
    BrandsPageListHelper,
    BrandSpageDetailsTpl
) {
    'use strict';

    var SCView = SCViewModule.SCView;

    function BrandsPageListDetailsViewMain(options) {
        SCView.call(this, options);

        this.model = options.model;

        this.template = BrandSpageDetailsTpl;
    }

    BrandsPageListDetailsViewMain.prototype = Object.create(SCView.prototype);
    BrandsPageListDetailsViewMain.prototype.constructor = BrandsPageListDetailsViewMain;
    BrandsPageListDetailsViewMain.prototype.getContext = function () {
        var brandname = this.model.get('brand');
        var brandimage = this.model.get('image');
        var brandlink = this.model.get('link');
        var sortorder = this.model.get('sortorder');

        return {
            model: this.model,
            brandname: brandname,
            brandimage: brandimage,
            brandlink: brandlink,
            sortorder: sortorder
        };
    };

    return BrandsPageListDetailsViewMain;
});
