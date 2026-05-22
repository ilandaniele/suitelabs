/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    'N/log',
    './EnhancedSearch.Model'
], function EnhancedSearchService(
    nLog,
    EnhancedSearchModel
) {
    'use strict';

    return {
        service: function service(context) {
            var response = [];
            var params = context.request.parameters;
            nLog.debug({ title: 'Type Ahead Products and Categories Service Context', details: context });
            
            try {
                switch (context.request.method) {
                case 'GET':
                    if (params.action === 'getTrendingProductsAndCategories') {
                        trendingProducts = EnhancedSearchModel.getTrendingProducts();
                        trendingCategories = EnhancedSearchModel.getTrendingCategories();
                        response = {
                            trendingProducts: trendingProducts,
                            trendingCategories: trendingCategories
                        };
                    }
                    break;
                default:
                    nLog.debug({ title: 'Type Ahead Products and Categories Service', details: context.request.method });
                }
            } catch (e) {
                nLog.error({ title: 'Type Ahead Products and Categories Service', details: e });
            }
            context.response.write(JSON.stringify(response));
        }
    };
});
