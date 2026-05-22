/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/record',
    'N/search',
    'N/log',
    'N/format',
    'N/runtime',
    'N/https'
], function mrScriptImport(
    nRecord,
    nSearch,
    nLog,
    nFormat,
    nRuntime,
    nHttps
) {
    'use strict';

    function getInputData() {

        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZiNWE1NjExNWRjNzg1MDM1YmE3OGNhNzMyOWQwMzc3YjVkZjAwZWI2OWMyYWNmMzM0YzAwMWU5ODRhMTBlMTgxMDMyYTNlNTVjZDdkYzY3In0.eyJhdWQiOiIxIiwianRpIjoiNmI1YTU2MTE1ZGM3ODUwMzViYTc4Y2E3MzI5ZDAzNzdiNWRmMDBlYjY5YzJhY2YzMzRjMDAxZTk4NGExMGUxODEwMzJhM2U1NWNkN2RjNjciLCJpYXQiOjE2NDIwMTIzNTksIm5iZiI6MTY0MjAxMjM1OSwiZXhwIjoxNjczNTQ4MzU5LCJzdWIiOiIzOTQ2OSIsInNjb3BlcyI6W119.GjaMVJCBZSCGqNwPRnI1wDCuiiClKxIcJDWmZ8AQjgUaHJCaMuuzZfbZoSFpDIJsXATntep8KMOUsg-VafmNjJomBYKw2x4szqnSt2v7Vljv0nk4nG6c_ZPlVi1XU6FTdrlazSCYBUCp6RIY6jnPzuVzRuk0hUw8KTTSm71r9lVYrKQhaa7cRDl1zRyv00lKXgjiNG5pNY5XtI_SRI0ghPDeQNtKAsxBMBDZAhX_rXyt7zzERseYcO4kzKjA6jSptCZDW-R1_j39Op-XTyQXwJLGKLf5nA3f7iSNxZqJUWKNMKH7PlBD4czwUA1r1WWxoCeJJFGsNCHfrYaQP6pFVv5jUM96BKgYmVVUQVLmGCqOADYnsdjgkX_qxazqHA7KlZ7PQ8fczw6CsgkhYe6BztZzMjDeht4OBZPlW5jQnwFuamW01ORtEsT7DwZQgJNlBA6hzCuz2EAp8DF6pm_cTlUqy5C_C17w8qEO6jnmeRIiXtDTzwCC-W8tTdQjE6bd52KgtpKoGdx10eOMkggez-_sCMCM2TaNJxc4IokIc64ADvVpW8igbg4Az0ptSza-biFCN_yy4-hTdqU44wKjv3FFj1nnJElVcWYMCrCZ2Zp_ylZB-SW1eacROYyBeIicVLuVPtxL6rPHqNjkWUYu0nBeS3yUTVS-6Ly2wpNIDoM';
        var response = {};
        var jsonResponse = {};
        var jsonBody = {};

        var headers = {
            name: 'Accept-Language',
            value: 'en-us',
            'User-Agent-x': 'SuiteScript-Call',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer ' + token
        };


        var body = {
            'items':[
                {
                    'sku':'ACND80PDEU RHO 626 24V',
                    'quantity':'1'
                }
            ]
        };

        jsonBody = JSON.stringify(body);

        //100 items per request maximum
        response = nHttps.post(
            {
                url: 'https://merchant-api.seclock.com/api/items',
                body: jsonBody,
                headers: headers
            }
        );

        // response = nHttps.get(
        //     {
        //         url: 'https://merchant-api.seclock.com/api/item?id=ARC100ACND80PDEURHO62624V&quantity=1',
        //         headers: headers
        //     }
        // );
        nLog.debug('response', response);
        jsonResponse = JSON.parse(response.body);
        nLog.debug('body', jsonResponse);

        var items = jsonResponse.data.items;
        var data = [];
        var items = [];

        for (i; i<items.length; i++) {
            data[i] = {};
            data[i].id = items[i].uid;
            data[i].sku = items[i].sku;
            data[i].description = items[i].description;
            data[i].manufacturer = items[i].manufacturer;
            data[i].netsuiteId = getFromCsv();
        }


        // get from CSV the name of the items and add them to data

        // get the items by name
        var filterItems = [];
        data.forEach(function eachLocationName(item) {
            var filter = [
                'itemid', nSearch.Operator.CONTAINS, item.itemName
            ];
            if (filterItems.length) {
                filterItems.push('or', filter);
            } else {
                filterItems.push(filter);
            }
        });

        var myItemsSearch = nSearch.create({
            type: nSearch.Type.INVENTORY_ITEM,
            columns: [{
                name: 'internalid'
            }, {
                name: 'itemid'
            }],
            filters: [filterItems]
        });

        myItemsSearch.run().each(function(item) {
            items.push(
                {
                'internalid': item.getValue({name:'internalid'}),
                'itemid': item.getValue({name:'itemid'}),
                }
            );
            return true;
        });
        nLog.debug('data',items);
        return items;
    }

    function reduce(context) {
        var data = JSON.parse(context.values[0]);
            //nLog.debug('data',JSON.stringify(data));

        // try {
        //     var itemRecord = nRecord.load({
        //         type: nRecord.Type.INVENTORY_ITEM,
        //         id:
        //         isDynamic: true
        //     });
        //
        //     itemRecord.setValue({
        //         fieldId: 'subsidiary',
        //         value: data.subsidiary,
        //         ignoreFieldChange: false
        //     });
        //
        //     inventoryAdjustmentRecord.commitLine({
        //         sublistId: 'inventory'
        //     });
        //
        //     inventoryAdjustmentRecord.save({
        //         enableSourcing: true,
        //         ignoreMandatoryFields: true
        //     });
        //
        // } catch(ex) {
        //      nLog.error('error', JSON.stringify(ex));
        // }

    }

    return {
        getInputData: getInputData,
        map: null,
        reduce: reduce,
        summarize: null
    };
});
