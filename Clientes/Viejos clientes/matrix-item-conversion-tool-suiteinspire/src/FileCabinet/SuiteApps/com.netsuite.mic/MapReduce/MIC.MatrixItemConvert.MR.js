/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 */
 define(['N/search', 'N/record', 'N/runtime', 'N/error', 'N/query', 'N/log', '../third_parties/underscore.js'],
 function(search, record, runtime, error, query, log, _) {

 var micItemConvertion = {

     getInputData: function getInputData(context) {
         var self = this;
         var matrixGroup = [];
         var script = runtime.getCurrentScript();
         var itemConversionSearch = script.getParameter({name: 'custscript_mic_matrixitem_conversion_ss'});
         var itemConversionRecord = script.getParameter({name: 'custscript_mic_matrix_item_conversion'});
         var standaloneCountSearch = script.getParameter({name: 'custscript_mic_subitem_conversion_ss'});

         log.debug({
             title: 'In Map/Reduce: itemConversionSearch  = ',
             details: itemConversionSearch
         });
         try{
             var itemSearch = search.load({
                 id: itemConversionSearch
             });

             var standaloneCountSearch = search.load({
                 id: standaloneCountSearch
             })

             // Run the paged search
             var itemPagedData = itemSearch.runPaged({
                 pageSize: 200
             });

             var standaloneItemPagedData = standaloneCountSearch.runPaged({
                 pageSize: 200
             });

             record.submitFields({
                 type: 'customrecord_mic_matrix_conversion',
                 id: itemConversionRecord,
                 values: {
                     custrecord_mic_matrix_convert_status: 'Started',
                     custrecord_mic_total_standalone_items: standaloneItemPagedData.count
                 },
                 options: {
                     enableSourcing: false,
                     ignoreMandatoryFields : true
                 }
             });

             itemPagedData.pageRanges.forEach(function(pageRange) {
                 var itemPage = itemPagedData.fetch({index: pageRange.index});
                 itemPage.data.forEach(function (result) {
                     matrixGroup.push(result.getValue({name: 'custitem_mic_matrix_parent_itemid', summary: 'GROUP'}));
                 });
             });
         } catch (e) {
             log.error({
                 title: 'In Map/Reduce: getInputData  = ',
                 details: JSON.stringify(e)
             });
         }
         return matrixGroup;
     },

     map: function map(context) {
         try{
             log.debug({
                 title: 'In Map/Reduce - Map: ItemConversion Context  = ',
                 details: context
             });

             var script = runtime.getCurrentScript();
             var itemConversionRecord = script.getParameter({name: 'custscript_mic_matrix_item_conversion'});
             record.submitFields({
                 type: 'customrecord_mic_matrix_conversion',
                 id: itemConversionRecord,
                 values: {
                     custrecord_mic_matrix_convert_status: 'Processing'
                 },
                 options: {
                     enableSourcing: false,
                     ignoreMandatoryFields : true
                 }
             });

             var standaloneItems = [];

             var childrenSearch = search.create({
                 type: 'item',
                 columns: ['itemid', 'type', 'displayname', 'custitem_mic_matrix_parent_data', 'custitem_mic_matrix_item_options', 'custitem_mic_matrix_parent_itemid'],
                 filters: [
                     ['isinactive', 'is', false],
                     'AND',
                     ['custitem_mic_matrix_parent_itemid', 'is', context.value]
                 ]
             });
             childrenSearch.run().each(function(result) {
                 var itemType = result.getValue('type');

                 var recordtype = '';

                 switch (itemType) {   // Compare item type to its record type counterpart
                     case 'InvtPart':
                         recordtype = 'inventoryitem';
                         break;
                     case 'NonInvtPart':
                         recordtype = 'noninventoryitem';
                         break;
                     case 'Service':
                         recordtype = 'serviceitem';
                         break;
                     case 'Assembly':
                         recordtype = 'assemblyitem';
                         break;

                     case 'GiftCert':
                         recordtype = 'giftcertificateitem';
                         break;
                     default:
                 }

                 var itemRecord = record.load({
                     type: recordtype,
                     id: result.id,
                     isDynamic: true
                 });
                 var childItem = {
                     internalid: result.id,
                     itemid: result.getValue('custitem_mic_matrix_parent_itemid'),
                     isParent: result.getValue('custitem_mic_matrix_parent_data'),
                     displayname: result.getValue('displayname'),
                     itemOptions: itemRecord.getValue({
                         fieldId: 'itemoptions'
                     }),
                     customItemOptions: result.getValue('custitem_mic_matrix_item_options'),
                     type: itemRecord.getValue({
                         fieldId: 'baserecordtype'
                     })
                 }
                 standaloneItems.push(childItem);
                 context.write({
                     key: context.value,
                     value: childItem
                 });
                 return true;
             });

         } catch (e) {
             log.error({
                 title: 'Error In Map/Reduce - Map: Convert Items ' + context.value,
                 details: JSON.stringify(e)
             });
         }
     },

     reduce: function reduce(reduceContext) {
         try {
             log.debug({
                 title: 'In Map/Reduce - reduce: reduceContext Context.values  = ',
                 details: reduceContext.values
             });
             var script = runtime.getCurrentScript();
             var itemidDelimiter = script.getParameter({name: 'custscript_mic_matrix_itemid_delimiter'}) || ':';
             var convertTrackerId = script.getParameter({name: 'custscript_mic_matrix_item_conversion'});

             // Get the matrix parent -
             var standaloneItems = _.map(reduceContext.values, function(item){ return JSON.parse(item) });

             log.debug({
                 title: 'In Map/Reduce - reduce: reduceContext standaloneItems  = ',
                 details: standaloneItems
             });

             var parentItem = _.findWhere(standaloneItems, {isParent: true});
             var childrenItems = standaloneItems;
             var itemOptions = [];

             if(parentItem) {
                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext parentItem  = ',
                     details: parentItem
                 });

                 //Check Item type
                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext parentItem type  = ',
                     details: parentItem.type
                 });

                 // Create parent item from the flagged item

                 var parentMatrixItem = record.copy({
                     type: parentItem.type,
                     id: parseInt(parentItem.internalid, 10),
                     isDynamic: true
                 });


                 /* var parentMatrixItem = record.create({
                     type: parentItem.type
                 });*/

                 parentMatrixItem.setValue({
                     fieldId: 'itemid',
                     value: parentItem.itemid
                 });
                 parentMatrixItem.setValue({
                     fieldId: 'matrixtype',
                     value: 'PARENT'
                 });

                 // Define the item template
                 if(parentItem.customItemOptions) {
                     itemOptions = parentItem.customItemOptions.split(',');
                 } else if (parentItem.itemOptions) {
                     itemOptions = _.map(parentItem.itemOptions, function (itemOption){
                        return  itemOption.toLowerCase();
                     });
                 }

                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext itemOptions  = ',
                     details: itemOptions
                 });

                 var matrixitemnametemplate = '{itemid}';

                 _.each(itemOptions, function (itemOption){
                     matrixitemnametemplate = matrixitemnametemplate + itemidDelimiter + '{' + itemOption + '}';
                 });

                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext matrixitemnametemplate  = ',
                     details: matrixitemnametemplate
                 });

                 // Set field matrixitemnametemplate
                 parentMatrixItem.setValue({
                     fieldId: 'matrixitemnametemplate',
                     value: matrixitemnametemplate
                 });

                 // Define the Item's options
                 _.each(childrenItems, function (childItem){
                     var childItemRec = record.load({
                         type: parentItem.type,
                         id: childItem.internalid,
                         isDynamic: true
                     });
                     _.each(itemOptions, function (itemOption){
                         childItem[itemOption] = childItemRec.getValue({
                             fieldId: itemOption
                         });
                         childItem[itemOption + 'Text'] = childItemRec.getText({
                             fieldId: itemOption
                         });
                     });
                 });

                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext childrenItems  = ',
                     details: childrenItems
                 });

                 _.each(itemOptions, function (itemOption){
                     var itemOptionValues =  _.chain(childrenItems)
                         .map(function (childItem){
                             return parseInt(childItem[itemOption], 10);
                         })
                         .reduceRight(function(a, b) { return a.concat(b); }, [])
                         .uniq()
                         .value();

                     log.debug({
                         title: 'In Map/Reduce - reduce: reduceContext itemOption ' + itemOption + ' = ',
                         details: itemOptionValues
                     });

                     parentMatrixItem.setValue({
                         fieldId: itemOption,
                         value: itemOptionValues
                     });
                 });

                 // Remove Bin Number sublist for Parent Item

                 var sublistNames = parentMatrixItem.getSublists();
                 log.debug({
                     title: 'In Map/Reduce - reduce: sublistNames  = ',
                     details: sublistNames
                 });
                 if(_.contains(sublistNames, 'binnumber')) {
                     var binNumberCount = parentMatrixItem.getLineCount({
                         sublistId: 'binnumber'
                     });

                     log.debug({
                         title: 'In Map/Reduce - reduce: binNumberCount  = ',
                         details: binNumberCount
                     });

                     for(var i = binNumberCount - 1; i >= 0; i--) {
                         parentMatrixItem.removeLine({
                             sublistId: 'binnumber',
                             line: i,
                             ignoreRecalc: true
                         });
                     }
                 }

                 var parentRecordId = parentMatrixItem.save({
                     enableSourcing: false,
                     ignoreMandatoryFields: true
                 });
                 log.debug({
                     title: 'In Map/Reduce - reduce: reduceContext parentRecordId  = ',
                     details: parentRecordId
                 });

                 _.each(childrenItems, function (childItem){
                     log.debug({
                         title: 'In Map/Reduce - reduce: reduceContext childItem  = ',
                         details: childItem
                     });
                     /*var matrixChild = record.create({
                         type: parentItem.type
                     });*/

                     var matrixChild = record.copy({
                         type: parentItem.type,
                         id: parseInt(childItem.internalid, 10),
                         isDynamic: true
                     });

                     matrixChild.setValue({
                         fieldId: 'matrixtype',
                         value: 'CHILD'
                     });

                     matrixChild.setValue({
                         fieldId: 'parent',
                         value: parentRecordId
                     });

                     var childItemid = parentItem.itemid;

                     log.debug({ title: 'itemOptions', details: itemOptions });

                     _.each(itemOptions, function (itemOption){
                         // Set the Child's options. Note how 'matrixoption' is inserted in front of the option's ID
                         childItemid = childItemid + itemidDelimiter + childItem[itemOption + 'Text'];
                         matrixChild.setValue({
                             fieldId: itemOption,
                             value: null
                         });
                         matrixChild.setValue({
                             fieldId: 'matrixoption' + itemOption,
                             value: childItem[itemOption][0]
                         });
                     });

                     log.debug({ title: 'childItemid', details: childItemid });

                     matrixChild.setValue({
                         fieldId: 'itemid',
                         value: childItemid
                     });

                     matrixChild.setValue({
                         fieldId: 'name',
                         value: childItemid
                     });

                     matrixChild.setValue({
                         fieldId: 'displayname',
                         value: childItem.displayname
                     });

                     matrixChild.setValue({
                         fieldId: 'custitem_mic_matrix_origin_item',
                         value: childItem.internalid
                     });

                     matrixChild.setValue({
                         fieldId: 'custitem_mic_conversion_job',
                         value: convertTrackerId
                     });

                     var matrixChildId = matrixChild.save({
                         enableSourcing: true,
                         ignoreMandatoryFields: true
                     });

                     record.submitFields({
                         type: childItem.type,
                         id: childItem.internalid,
                         values: {
                             'custitem_mic_new_matrix_item': matrixChildId,
                             'custitem_mic_matrix_converted': true
                         }
                     });
                 });
             }

         }catch (ex) {
             log.error({
                 title: 'Error In Map/Reduce - Reduce: Convert Items ' + context.key,
                 details: JSON.stringify(ex)
             });
         }
     },

     summarize: function summarize(summaryContext) {
         try{
             var script = runtime.getCurrentScript();
             var convertTrackerId = script.getParameter({name: 'custscript_mic_matrix_item_conversion'});

             var convertedItemSearch = search.create({
                 type: 'item',
                 columns: ['itemid'],
                 filters: [
                     ['custitem_mic_conversion_job', 'is', convertTrackerId]
                 ]
             });

             var convertedItemSearchResult = convertedItemSearch.runPaged();
             if(convertTrackerId) {
                 record.submitFields({
                     type: 'customrecord_mic_matrix_conversion',
                     id: convertTrackerId,
                     values: {
                         custrecord_mic_matrix_convert_status: 'Completed',
                         custrecord_mic_total_matrix_items: convertedItemSearchResult.count
                     },
                     options: {
                         enableSourcing: false,
                         ignoreMandatoryFields : true
                     }
                 });
             }
         } catch (ex) {
         }
     }

 };


 return micItemConvertion;

});