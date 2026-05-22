/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    './BrandsPage.List.Model.js'
], function MainService(
    BrandsPageListModel
) {
    'use strict';

    function service (context) {
        var response = {};

        switch (context.request.method) {
            case 'GET':
                response = BrandsPageListModel.get(context.request)
                break;
            case 'POST': 
                response = BrandsPageListModel.post(context.request)
                break;
            case 'PUT':
                response = BrandsPageListModel.put(context.request)
                break;
        }

        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    }
});
