/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    './MyDownloadsSection.Model'
], function MyDownloadsSectionService(
    MyDownloadsSectionModel
) {
    'use strict';

    return {
        service: function service(context) {
            var result = {};

            try {
                result = MyDownloadsSectionModel.getDownloadableItemsFromCustomer();
            } catch (e) {
                result.error = e;
            }
            context.response.write(JSON.stringify(
                result
            ));
        }
    };
});
