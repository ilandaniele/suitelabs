define('MyDownloadsSection.Model', [
    'SCModel',
    'Utils'
], function MyDownloadsSectionModel(
    SCModelComponent,
    Utils
) {
    'use strict';

    /* global getExtensionAssetsPath */

    var SCModel = SCModelComponent.SCModel;

    var MyDownloadsSection = function MyDownloadsSection() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    'Modules/Main/SuiteScript2/MyDownloadsSection.Service.ss'
                ),
                true
            );
        };
    };

    MyDownloadsSection.prototype = Object.create(SCModel.prototype);
    MyDownloadsSection.prototype.constructor = MyDownloadsSection;

    return MyDownloadsSection;
});
