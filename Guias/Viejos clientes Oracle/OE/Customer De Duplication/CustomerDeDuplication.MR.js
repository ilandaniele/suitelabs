/**
* @NApiVersion 2.0
* @NScriptType MapReduceScript
* *@NModuleScope Public
*/
 
/*
Name                : customscript_olsen_mr_customer_de_duplication.js
Purpose             : Identify and Merge Duplicate Customers
Scenario            : Duplicate Detection Case 1-5
Created On          : 05/28/2020
Script Type         : Map Reduce
Saved Search ID Used: customsearch_olsen_duplicate_customer
Script Owner        : Shalabh Saxena (ssaxena@netsuite.com)
*/
 
 
define(["N/record", "N/search", "N/runtime", "N/format","N/file", "N/task","../LibraryFiles/moment.js"],
    function (record, search, runtime , format, file, task, moment) {
 
        var CONSTANT = {
 
            DEPLOYMENTS: {
                ID: 'customdeploy_olsen_mr_cust_dedup_v2_'
            },
        };
 
        var glblparam_CaseType = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_case_v2'
        })) || 0;
 
        var glblparam_InactiveOrDeDup = parseInt(runtime.getCurrentScript().getParameter({  //GetData = -1 | Inactivate = 0 | DeDuplicate = 1
            name: 'custscript_olsen_mr_cust_scn_inact_dedup'
        })) || 0;
 
        var param_SavedSearchUid = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_savsrc_v2'
        })) || 0;
 
        var fileObj_Customer_Deduplication_Summarized_Folder = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_smrize_v2'
        })) || 0;
 
        var fileObj_Customer_Deduplication_LogFile_Header = runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_loghdr_v2'
        }) || '';
 
        var fileObj_Customer_Deduplication_Error_Folder = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_error_v2'
        })) || 0;
 
        var param_BatchSize = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_bsize_v2'
        })) || 1;
 
        var param_CurrentBatchStart = parseInt(runtime.getCurrentScript().getParameter({
            name: 'custscript_olsen_mr_cust_dedup_cursrt_v2'
        })) || 0;
 
        function GetInputData(){
 
            try {
                log.audit('Status Case: ' + glblparam_CaseType,'Start Process ' + moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
 
                var objSavedSearch = {};
 
                if (glblparam_InactiveOrDeDup == -1){
 
                    objSavedSearch = search.load({
                        id: param_SavedSearchUid
                    });
 
                    return  getSpecialSearchResults(objSavedSearch);
                }
 
                else if (glblparam_InactiveOrDeDup == 0){
 
                    objSavedSearch = search.create({
                        type: "customrecord_olsen_cust_dedup_record",
                        filters:
                            [
                                ["isinactive","is","F"],
                                "AND",
                                ["custrecord_olsen_cust_dedup_case_type","equalto",glblparam_CaseType],
                                "AND",
                                ["custrecord_olsen_cust_dedup_dup_inactive","is","F"],
                                "AND",
                                ["custrecord_olsen_cust_dedup_dup_merged","is","F"],
                                "AND",
                                ["formulanumeric: LENGTH({custrecord_olsen_cust_dedup_dup_txt})","greaterthan","0"]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                    sort: search.Sort.ASC,
                                    label: "Internal ID"
                                }),
 
                                search.createColumn({name: "custrecord_olsen_cust_dedup_master", label: "De-Duplicate Customer Process Master"}),
 
                                search.createColumn({name: "custrecord_olsen_cust_dedup_dup_txt", label: "De-Duplicate Customer Process Duplicates"})
                            ]
                    });
 
                    return  getAllSearchResults(objSavedSearch);
                }
 
                else if (glblparam_InactiveOrDeDup == 1){
 
                    objSavedSearch = search.create({
                        type: "customrecord_olsen_cust_dedup_record",
                        filters:
                            [
                                ["isinactive","is","F"],
                                "AND",
                                ["custrecord_olsen_cust_dedup_case_type","equalto",glblparam_CaseType],
                                "AND",
                                ["custrecord_olsen_cust_dedup_dup_inactive","is","T"],
                                "AND",
                                ["custrecord_olsen_cust_dedup_dup_merged","is","F"],
                                "AND",
                                ["formulanumeric: LENGTH({custrecord_olsen_cust_dedup_dup_txt})","greaterthan","0"]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                    sort: search.Sort.ASC,
                                    label: "Internal ID"
                                }),
 
                                search.createColumn({name: "custrecord_olsen_cust_dedup_master", label: "De-Duplicate Customer Process Master"}),
 
                                search.createColumn({name: "custrecord_olsen_cust_dedup_dup_txt", label: "De-Duplicate Customer Process Duplicates"})
                            ]
                    });
 
                    return  getAllSearchResults(objSavedSearch);
                }
                else{
 
                    log.error ('Invalid Script Parameter Value: for custscript_olsen_mr_cust_scn_inact_dedup ', glblparam_InactiveOrDeDup)
 
                    return true;
                }
            }
            catch (error) {
                log.error('Error in getInputData',error.toString());
            }
        }
 
        function Map(context){
 
            try {
                log.debug('Status','Start Map Process ' + moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
 
                var arrDup = [];
 
                var searchResult = JSON.parse(context.value);
 
                log.debug('searchResult',searchResult);
 
                var data = searchResult.values;
 
                if (glblparam_InactiveOrDeDup == -1){
 
                    var arrDuplicateCustomer = [];
 
                    arrDuplicateCustomer = getDupClientData(data);
 
                    if (isEmpty(arrDuplicateCustomer)) {
 
                        log.debug('ERROR - Duplicate data not found',  data);
                    }
                    else if (!isEmpty(arrDuplicateCustomer)) {
 
                        if (arrDuplicateCustomer.length > 1) {
 
                            log.audit('Processing Customer', data);
 
                            log.debug('arrDuplicateCustomer', arrDuplicateCustomer);
 
                            arrDup = arrDuplicateCustomer.slice(1);
 
                            context.write(arrDuplicateCustomer[0], arrDup);
                        }
                        else if (arrDuplicateCustomer.length == 1)
                        {
                            log.debug('Status : Duplicate not Found', data);
                        }
                    }
                }
 
                else if (((glblparam_InactiveOrDeDup == 0)) || (glblparam_InactiveOrDeDup == 1)){
 
                    context.write(searchResult.id , data);
                }
 
                log.debug('Status','End Map Process '+ moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
            }
            catch (error) {
                log.error('Error in Map',error.toString());
            }
        }
 
        function Reduce(context){
 
            try{
                log.debug('Status','Start Reduce Process ' + moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
 
                var contextkey = context.key;
 
                var searchResult = JSON.parse(context.values[0]);
 
                if (glblparam_InactiveOrDeDup == -1){
 
                    if (searchResult.length == 0){
 
                        log.debug('Status', 'No Duplicate Customers Found for Id: ' + contextkey);
                    }
                    else{
                        var arr_custMasterId = [contextkey];
 
                        var CreateCustomerBaseResult = Create_DuplicateCustomer_Base_Result(arr_custMasterId, searchResult);
 
                        //log.debug('Process Type_' + glblparam_InactiveOrDeDup , CreateCustomerBaseResult);
                    }
                }
 
                else if (glblparam_InactiveOrDeDup == 0){
 
                    if (!isEmpty(searchResult)){
 
                        var arr_DuplicateCustomers = searchResult["custrecord_olsen_cust_dedup_dup_txt"].split('||') || [];
 
                        inactivateCustomer(arr_DuplicateCustomers , true);
                    }
 
                    var customerDuplicateRecords = record.load({
                        type: 'customrecord_olsen_cust_dedup_record',
                        id: contextkey,
                        isDynamic: true
                    });
 
                    customerDuplicateRecords.setValue({fieldId: 'custrecord_olsen_cust_dedup_dup_inactive', value: true});
 
                    var updRecId = customerDuplicateRecords.save({ignoreMandatoryFields: true});
 
                }
 
                else if (glblparam_InactiveOrDeDup == 1){
 
                    var dedupeTaskGUID = 'N.A.';
 
                    if (!isEmpty(searchResult)){
 
                        var masterCustomer = searchResult["custrecord_olsen_cust_dedup_master"] || 0;
 
                        var arr_DuplicateCustomers = searchResult["custrecord_olsen_cust_dedup_dup_txt"].split('||') || [];
 
                        if (masterCustomer <= 0){
                            log.error('Status Error in Reduce','Invalid Master Customer')
                        }
                        else if (masterCustomer > 0){
 
                            log.debug('masterCustomer',masterCustomer);
 
                            log.debug('arr_DuplicateCustomers',arr_DuplicateCustomers);
 
                            dedupeTaskGUID = mergeInactiveCustomers (masterCustomer , arr_DuplicateCustomers) || '';
                        }
                    }
 
                    var customerDuplicateRecords = record.load({
                        type: 'customrecord_olsen_cust_dedup_record',
                        id: contextkey,
                        isDynamic: true
                    });
 
                    customerDuplicateRecords.setValue({fieldId: 'custrecord_olsen_cust_dedup_dup_merged', value: true});
 
                    customerDuplicateRecords.setValue({fieldId: 'custrecord_olsen_cust_dedup_process_guid', value: dedupeTaskGUID});
 
                    var updRecId = customerDuplicateRecords.save({ignoreMandatoryFields: true});
                }
 
                log.debug('Status','End Reduce Process ' + moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
 
                return true;
            }
 
            catch (error) {
 
                var arr_DuplicateCustomers = searchResult["custrecord_olsen_cust_dedup_dup_txt"].split('||') || [];
 
                var activationResult = inactivateCustomer (arr_DuplicateCustomers , false);
 
                log.error('Error in Reduce',error.toString());
            }
        }
 
        function Summarize(summary) {
 
            log.audit("Summary Usage", summary.usage);
 
            log.audit('Status Case: ' + glblparam_CaseType,'End Process '+ moment(new Date()).format('MM/DD/YYYY HH:MM:SSS'));
 
            return true;
        }
 
        function Create_DuplicateCustomer_Base_Result (customerMaster, customerDuplicates){
 
            var CreateCustomerBaseResult = 0;
 
            try{
                var DuplicateCustomerBase = record.create({
                    type: 'customrecord_olsen_cust_dedup_record',
                    isDynamic : true
                });
 
                DuplicateCustomerBase.setValue({
                    fieldId: 'custrecord_olsen_cust_dedup_case_type',
                    value: parseInt(glblparam_CaseType)
                });
 
                DuplicateCustomerBase.setValue({
                    fieldId: 'custrecord_olsen_cust_dedup_master',
                    value: parseInt(customerMaster)
                });
 
                DuplicateCustomerBase.setValue({
                    fieldId: 'custrecord_olsen_cust_dedup_dup_txt',
                    value: customerDuplicates.join('||')
                });
 
               DuplicateCustomerBase.setValue({
                    fieldId: 'externalid',
                    value:  glblparam_CaseType + '||' + customerMaster + '||' +  customerDuplicates.join('||')
                });
 
                CreateCustomerBaseResult = DuplicateCustomerBase.save();
            }
            catch (error) {
                log.error('Error in Create_DuplicateCustomer_Base_Result',error.toString());
            }
 
            return CreateCustomerBaseResult;
        }
 
        function isEmpty(fieldValue) {
            if (typeof fieldValue == "object") {
                if (Object.keys(fieldValue).length > 0) {
                    return false;
                } else {
                    return true;
                }
            }
            return (fieldValue === '' || fieldValue === null || fieldValue === undefined || fieldValue == {} || fieldValue == "{}");
        }
 
        function getDupClientData(data){
 
            var duplicate_count = data['COUNT(internalid)'] || 0;
 
            if (glblparam_CaseType == 1){
 
                var altname = data['GROUP(formulatext)'] || '';
 
                var phone = data['GROUP(formulatext)_1'] || '- None -';
 
                var address = data['GROUP(formulatext)_2'] || '- None -';
 
            }
            else if (glblparam_CaseType == 2){
 
                var altname = data['GROUP(formulatext)'] || '';
 
                var address = data['GROUP(formulatext)_1'] || '- None -';
 
                var phone = data['GROUP(formulatext)_2'] || '- None -';
 
            }
            else if (glblparam_CaseType == 3){
 
                var altname = data['GROUP(formulatext)'] || '';
 
                var phone = data['GROUP(formulatext)_1'] || '- None -';
 
                var address = data['GROUP(formulatext)_2'] || '- None -';
 
            }
            else if (glblparam_CaseType == 4){
 
                var altname = data['GROUP(formulatext)'] || '';
 
                var phone  = data['GROUP(formulatext)_1'] || '- None -';
 
                var address = data['GROUP(formulatext)_2'] || '- None -';
 
            }
            else if (glblparam_CaseType == 5){
 
                var altname = data['GROUP(formulatext)'] || '';
 
                var address = data['GROUP(formulatext)_1'] || '- None -';
 
                var phone  = data['GROUP(formulatext)_2'] || '- None -';
            }
            else{
 
                log.debug('ERROR ', 'Param Setup issue for: customscript_olsen_mr_customer_dedup');
 
                var altname = '', address = '- None -', phone = '- None -' ;
 
            }
 
            var arrduplicateCustomers = [] ,
                arrReturnDuplicates = [] ,
                arrReturnDuplicates_sortedbyTran = [];
 
            if ((phone == '- None -') && (address == '- None -')){
 
                var customerSearchObj = search.create({
                    type: "customer",
                    filters:
                        [
                            ["isperson","is","T"],
                            "AND",
                            ["category","anyof","@NONE@","2"],
                            "AND",
                            ["altname","is",altname]
                            ,"AND"
                            ,["phone","isempty",""]
                            //,"AND"
                            //,["address","isempty",""]
                            ,"AND",
                            ["address.address1","isempty",""]
                            ,"AND",
                            ["isinactive","any",""]
                        ],
                    columns:
                        [
                            search.createColumn({
                                name: "internalid",
                                sort: search.Sort.DESC,
                                label: "Internal ID"
                            })
                        ]
                });
            }
 
            else if((phone == '- None -')) {
 
                if(glblparam_CaseType==5){
 
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["isperson","is","T"],
                                "AND",
                                ["category","anyof","@NONE@","2"],
                                "AND",
                                ["altname","is",altname]
                                ,"AND"
                                ,["phone","isnotempty",""]
                                ,"AND"
                                ,["address","is",address]
                                ,"AND",
                                ["address.address1","isnotempty",""]
                                ,"AND",
                                ["isinactive","any",""]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                    sort: search.Sort.DESC,
                                    label: "Internal ID"
                                })
                            ]
                    });
                }
                else{
 
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["isperson","is","T"],
                                "AND",
                                ["category","anyof","@NONE@","2"],
                                "AND",
                                ["altname","is",altname]
                                ,"AND"
                                ,["phone","isempty",""]
                                ,"AND"
                                ,["address","is",address]
                                ,"AND",
                                ["isinactive","any",""]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                    sort: search.Sort.DESC,
                                    label: "Internal ID"
                                })
                            ]
                    });
                }
            }
 
            else if((address == '- None -')) {
 
                if (glblparam_CaseType == 1){
 
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["isperson","is","T"],
                                "AND",
                                ["category","anyof","@NONE@","2"],
                                "AND",
                                ["altname","is",altname]
                                ,"AND"
                                ,["phone","is",phone]
                                //,"AND"
                                //,["address","isempty",""]
                                ,"AND",
                                ["address.address1","isempty",""]
                                ,"AND",
                                ["isinactive","any",""]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                    sort: search.Sort.DESC,
                                    label: "Internal ID"
                                })
                            ]
                    });
 
                }
                else if (glblparam_CaseType == 3){
 
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["isperson","is","T"],
                                "AND",
                                ["category","anyof","@NONE@","2"],
                                "AND",
                                ["altname","is",altname]
                                ,"AND"
                                ,["phone","is",phone]
                                ,"AND",
                                ["isinactive","any",""]
                                //,"AND"
                                //,["address","isnotempty",""]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "internalid",
                                   sort: search.Sort.DESC,
                                    label: "Internal ID"
                                })
                            ]
                    });
                }
            }
 
            else {
                var customerSearchObj = search.create({
                    type: "customer",
                    filters:
                        [
                            ["isperson","is","T"],
                            "AND",
                            ["category","anyof","@NONE@","2"],
                            "AND",
                            ["altname","is",altname]
                            ,"AND"
                            ,["phone","is",phone]
                            ,"AND"
                            ,["address","is",address]
                            ,"AND",
                            ["isinactive","any",""]
                        ],
                    columns:
                        [
                            search.createColumn({
                                name: "internalid",
                                sort: search.Sort.DESC,
                                label: "Internal ID"
                            })
                        ]
                });
            }
 
            arrduplicateCustomers = getAllSearchResults(customerSearchObj);
 
            if (!isEmpty(arrduplicateCustomers)){
 
                for (var i = 0; i < arrduplicateCustomers.length ; i++){
 
                    if (arrReturnDuplicates.indexOf(arrduplicateCustomers[i].id) == -1){
 
                        arrReturnDuplicates.push(arrduplicateCustomers[i].id);
                    }
                }
 
                var transactionSearchObj = search.create({
                    type: "transaction",
                    filters:
                        [
                            ["voided","is","F"],
                            "AND",
                            ["type","anyof","CashSale","CustDep","CustInvc","CustPymt","SalesOrd"],
                            "AND",
                            ["customer.internalid","anyof",arrReturnDuplicates]
                        ],
                    columns:
                        [
                            search.createColumn({
                                name: "trandate",
                                summary: "MAX",
                                sort: search.Sort.DESC,
                                label: "Date"
                            }),
                            search.createColumn({
                                name: "internalid",
                                join: "customer",
                                summary: "GROUP",
                                label: "Internal ID"
                            })
                        ]
                });
 
                var searchResultCount = transactionSearchObj.runPaged().count;
 
                if (searchResultCount <= 0){
 
                    return arrReturnDuplicates;
                }
                else {
                    transactionSearchObj.run().each(function(result){
                        // .run().each has a limit of 4,000 results
 
                        var cust_internalId = result.getValue({
                            name: "internalid",
                            join: "customer",
                            summary: "GROUP",
                        });
 
                        arrReturnDuplicates_sortedbyTran.push(cust_internalId);
 
                       return true;
                    });
                }
 
                for (var i = 0 ; i < arrReturnDuplicates.length; i++){
 
                    if (arrReturnDuplicates_sortedbyTran.indexOf(arrReturnDuplicates[i]) <= -1) {
 
                        arrReturnDuplicates_sortedbyTran.push(arrReturnDuplicates[i]);
                    }
                }
 
                return arrReturnDuplicates_sortedbyTran;
            }
            else{
                return arrduplicateCustomers;
            }
        }
 
        //GETS RESULTS OF SAVED SEARCHES
        function getSpecialSearchResults(objSavedSearch) {
 
            var arrReturnSearchResults = new Array();
 
            var objResultset = objSavedSearch.run();
 
            if (param_CurrentBatchStart == 0){
 
                var glbl_searchStart = 0;
                var glbl_searchEnd = param_BatchSize;
 
            }
            else if(param_CurrentBatchStart > 0){
 
                var glbl_searchStart = parseInt(param_CurrentBatchStart + 1);
 
                var glbl_searchEnd = parseInt(param_CurrentBatchStart + param_BatchSize);
 
            }
 
            var arrResultSlice = null;
 
            do{
                arrResultSlice = objResultset.getRange({
                    start: glbl_searchStart,
                    end: glbl_searchEnd
                });
                if (arrResultSlice == null)
                {
                    break;
                }
                arrReturnSearchResults = arrReturnSearchResults.concat(arrResultSlice);
 
                searchStart = arrReturnSearchResults.length;
            }
            while (arrResultSlice.length >= 1000);
 
            updateMRScriptDeployment(param_CurrentBatchStart, arrReturnSearchResults.length);
 
            return arrReturnSearchResults;
        }
 
        //GETS RESULTS OF SAVED SEARCHES
        function getAllSearchResults(objSavedSearch) {
 
            var arrReturnSearchResults = new Array();
 
            var objResultset = objSavedSearch.run();
 
            var glbl_searchStart = 0;
 
            var glbl_searchEnd = param_BatchSize;
 
            var arrResultSlice = null;
 
            do{
                arrResultSlice = objResultset.getRange({
                    start: glbl_searchStart,
                    end: glbl_searchEnd
                });
                if (arrResultSlice == null)
                {
                    break;
                }
                arrReturnSearchResults = arrReturnSearchResults.concat(arrResultSlice);
                searchStart = arrReturnSearchResults.length;
            }
            while (arrResultSlice.length >= 1000);
 
            return arrReturnSearchResults;
        }
 
        function inactivateCustomer(arr_custDupId , yesORno) {
 
            try{
                for (var i = 0; i < arr_custDupId.length; i++){
 
                    var customerRecord = record.load({
                        type: record.Type.CUSTOMER,
                        id: arr_custDupId[i]
                    });
 
                    customerRecord.setValue({fieldId: 'isinactive', value: yesORno});
 
                    var updRecId = customerRecord.save({ignoreMandatoryFields: true});
 
                    //log.debug('Client Update Status: ' + yesORno, arr_custDupId);
                }
                return true;
            }
            catch (error) {
 
                log.error('Error in Customer Inactivation ',error.toString());
                return false;
            }
        }
 
        function mergeInactiveCustomers(masterCustomer , arr_DuplicateCustomers){
 
            var dedupeTaskId = '';
 
            var dedupeTask = task.create({taskType: task.TaskType.ENTITY_DEDUPLICATION});
 
            dedupeTask.entityType = task.DedupeEntityType.CUSTOMER;
 
            dedupeTask.dedupeMode = task.DedupeMode.MERGE;
 
            dedupeTask.masterSelectionMode = task.MasterSelectionMode.SELECT_BY_ID;
 
            dedupeTask.masterRecordId = masterCustomer;
 
            dedupeTask.recordIds = arr_DuplicateCustomers;
 
            //log.debug('dedupeTask',dedupeTask);
 
            dedupeTaskId = dedupeTask.submit();
 
            return dedupeTaskId;
        }
 
        function updateMRScriptDeployment(param_CurrentBatchStart,SearchResultLength){
 
            var Deployment_ID = CONSTANT.DEPLOYMENTS.ID + glblparam_CaseType
 
            var Script_Deployment_UId = 0;
 
            var scriptdeploymentSearchObj = search.create({
                type: "scriptdeployment",
                filters:
                    [
                        ["scriptid","is",Deployment_ID]
                    ],
                columns:
                    [
                        search.createColumn({name: "internalid", label: "Internal ID"})
                    ]
            });
 
            var searchResultCount = scriptdeploymentSearchObj.runPaged().count;
 
            //log.debug("scriptdeploymentSearchObj result count",searchResultCount);
 
            scriptdeploymentSearchObj.run().each(function(result){
                // .run().each has a limit of 4,000 results
 
                Script_Deployment_UId = result.getValue({name: 'internalid' });
 
                return true;
            });
 
            var cust_dedup_curr_strt = 0;
 
            if (SearchResultLength > 0){
                cust_dedup_curr_strt = parseInt(param_CurrentBatchStart + SearchResultLength);
            }
 
            var id = record.submitFields({
                type: "scriptdeployment",
                id: Script_Deployment_UId,
                values: {
                    custscript_olsen_mr_cust_dedup_cursrt_v2:  cust_dedup_curr_strt
                },
                options: {
                    enableSourcing: false,
                    ignoreMandatoryFields : true
                }
            });
 
            return true;
        }
 
        return {
            getInputData: GetInputData,
            map: Map,
            reduce: Reduce,
            summarize: Summarize
        };
    });
