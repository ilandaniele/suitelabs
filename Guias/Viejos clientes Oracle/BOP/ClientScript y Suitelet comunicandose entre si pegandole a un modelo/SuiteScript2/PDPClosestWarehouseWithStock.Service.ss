/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    'N/log',
    './PDPClosestWarehouseWithStock.Model'
], function PDPClosestWarehouseWithStockService(
    nLog,
    PDPClosestWarehouseWithStockModel
) {
    'use strict';

    return {
        service: function service(context) {
            var response = [];
            var params = context.request.parameters;
            var itemId = '';
            var zipCode = '';
            var quantity = 0;
            var domain = '';
            var warehouseHasStock = [];

            nLog.debug({ title: 'PDP Closest Warehouse With Stock Service Parameters', details: params });

            try {
                switch (context.request.method) {
                case 'GET':
                    if (params.action === 'closestWarehouseHasStock') {
                        zipCode = params.zipCode;
                        itemId = params.itemId;
                        quantity = params.quantity;
                        domain = params.domain;
                        warehouseHasStock = PDPClosestWarehouseWithStockModel.closestWarehouseHasStock(zipCode, itemId, quantity, domain);
                        nLog.error({ title: 'PDP Closest Warehouse With Stock Service', details: warehouseHasStock });

                        nLog.error({ title: 'PDP Closest Warehouse With Stock Service', details: warehouseHasStock[0] });
                        nLog.error({ title: 'PDP Closest Warehouse With Stock Service', details: warehouseHasStock[1] });

                        response = {
                            validZipCode: warehouseHasStock[0] || '',
                            quantityAvailable: warehouseHasStock[1] || ''
                        };
                    }
                    break;
                default:
                    nLog.debug({ title: 'PDP Closest Warehouse With Stock Service', details: context.request.method });
                }
            } catch (e) {
                nLog.error({ title: 'PDP Closest Warehouse With Stock Service', details: e });
            }
            context.response.write(JSON.stringify(response));
        }
    };
});
