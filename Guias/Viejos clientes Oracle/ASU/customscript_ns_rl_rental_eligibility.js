/**
 *    Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 * student should be internalID of student, not Student ID
 * book should be internalID of item in ERP, not ISBN
 */

/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/search','N/runtime'],

    function (search,runtime) {

        /**
         * Function called upon sending a GET request to the RESTlet.
         *
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.1
         */
        function doGet(requestParams) {

            try {
                log.debug('request params',requestParams)

                var objScript = runtime.getCurrentScript();
                var adoptionSearchId = objScript.getParameter('custscript_ns_adoption_search');
                var curriculumSearchId = objScript.getParameter('custscript_ns_curriculum_search');

                //var adoptionSearch = search.load(adoptionSearchId);
                var curriculumSearch = search.load(curriculumSearchId)

                // var bookFilter = search.createFilter({
                //     name: 'custrecord_nsts_csad_item',
                //     operator: search.Operator.ANYOF,
                //     values: requestParams.book
                //
                // })
                if (!!requestParams.book){
                    var adoptionSearch = search.create({
                        type: "customrecord_nsts_csad_approved_adoption",
                        filters:
                            [
                                [["custrecord_nsts_csad_item","anyof",requestParams.book],"OR",["custrecord_nsts_csad_child_items","anyof",requestParams.book]]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC,
                                    label: "ID"
                                }),
                                search.createColumn({name: "custrecord_nsta_csad_course_code", label: "Section Code"}),

                            ]
                    });
                }
                else if (!!requestParams.isbn){
                    var adoptionSearch = search.create({
                        type: "customrecord_nsts_csad_approved_adoption",
                        filters:
                            [
                                ["custrecord_nsts_csad_isbn","contains",requestParams.isbn]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC,
                                    label: "ID"
                                }),
                                search.createColumn({name: "custrecord_nsta_csad_course_code", label: "Section Code"}),

                            ]
                    });


                }



                var classArr = [];
                adoptionSearch.run().each(function (result) {
                    classArr.push(result.getValue('custrecord_nsta_csad_course_code'))

                    return true;
                })
                log.debug('class arr',classArr);

                if (classArr.length > 0){

                    var classFilter = search.createFilter({
                        name: 'custrecord_nsts_cssm_course_full_nm',
                        operator: search.Operator.ANYOF,
                        values: classArr
                    })
                    var studentFilter = search.createFilter({
                        name: 'custrecord_nsts_cssm_customer',
                        operator: search.Operator.ANYOF,
                        values: requestParams.student
                    })

                    curriculumSearch.filters.push(classFilter)
                    curriculumSearch.filters.push(studentFilter)

                    var resultSet = curriculumSearch.run().getRange(0,1000);

                    log.debug('curriculum search results',resultSet);

                    if (resultSet.length > 0){
                        log.debug('student enrolled in class','student enrolled in class')
                        return JSON.stringify({
                            result: 'success',
                            eligibility: true
                        })

                    }
                    else {
                        return JSON.stringify({
                            result: 'success',
                            eligibility: false
                        })
                    }
                }
                else {
                    return JSON.stringify({
                        result: 'success',
                        eligibility: false
                    })
                }



                return JSON.stringify({
                    result: 'fail'
                })
                log.debug('end','end')


            }
            catch (e) {

                log.error('error',e)
                return JSON.stringify({
                    result: 'fail',
                    error: e
                })

            }
        }

        /**
         * Function called upon sending a PUT request to the RESTlet.
         *
         * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
         * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doPut(requestBody) {

        }


        /**
         * Function called upon sending a POST request to the RESTlet.
         *
         * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
         * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doPost(requestBody) {
            try {
                log.debug('Start POST','Starting POST...');
                var custID = requestBody.customerID;
                var book = requestBody.book;
                log.debug('custId',custID);
                log.debug('book',book); //This should be the books INTERNAL ID not the ISBN

                log.debug('request params',requestBody)

                var objScript = runtime.getCurrentScript();
                var adoptionSearchId = objScript.getParameter('custscript_ns_adoption_search');
                var curriculumSearchId = objScript.getParameter('custscript_ns_curriculum_search');

                //var adoptionSearch = search.load(adoptionSearchId);
                var curriculumSearch = search.load(curriculumSearchId)

                // var bookFilter = search.createFilter({
                //     name: 'custrecord_nsts_csad_item',
                //     operator: search.Operator.ANYOF,
                //     values: book
                // })
                // adoptionSearch.filters.push(bookFilter);

                if (!!requestBody.book){
                    var adoptionSearch = search.create({
                        type: "customrecord_nsts_csad_approved_adoption",
                        filters:
                            [
                                [["custrecord_nsts_csad_item","anyof",requestBody.book],"OR",["custrecord_nsts_csad_child_items","anyof",requestBody.book]]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC,
                                    label: "ID"
                                }),
                                search.createColumn({name: "custrecord_nsta_csad_course_code", label: "Section Code"}),

                            ]
                    });
                }
                else if (!!requestBody.isbn){
                    var adoptionSearch = search.create({
                        type: "customrecord_nsts_csad_approved_adoption",
                        filters:
                            [
                                ["custrecord_nsts_csad_isbn","contains",requestBody.isbn]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC,
                                    label: "ID"
                                }),
                                search.createColumn({name: "custrecord_nsta_csad_course_code", label: "Section Code"}),

                            ]
                    });


                }
                var classArr = [];
                adoptionSearch.run().each(function (result) {
                    classArr.push(result.getValue('custrecord_nsta_csad_course_code'))

                    return true;
                })
                log.debug('class arr',classArr);

                if (classArr.length > 0){

                    var classFilter = search.createFilter({
                        name: 'custrecord_nsts_cssm_course_full_nm',
                        operator: search.Operator.ANYOF,
                        values: classArr
                    })
                    var studentFilter = search.createFilter({
                        name: 'custrecord_nsts_cssm_customer',
                        operator: search.Operator.ANYOF,
                        values: custID
                    })

                    curriculumSearch.filters.push(classFilter)
                    curriculumSearch.filters.push(studentFilter)

                    var resultSet = curriculumSearch.run().getRange(0,1000);

                    log.debug('curriculum search results',resultSet);

                    if (resultSet.length > 0){
                        log.debug('student enrolled in class','student enrolled in class')
                        return JSON.stringify({
                            result: 'success',
                            eligibility: true
                        })

                    }
                    else {
                        return JSON.stringify({
                            result: 'success',
                            eligibility: false
                        })
                    }
                }
                else {
                    return JSON.stringify({
                        result: 'success',
                        eligibility: false
                    })
                }



                return JSON.stringify({
                    result: 'fail'
                })
                log.debug('end','end')


            }
            catch (e) {

                log.error('error',e)
                return JSON.stringify({
                    result: 'fail',
                    error: e
                })

            }
        }

        /**
         * Function called upon sending a DELETE request to the RESTlet.
         *
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
         * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
         * @since 2015.2
         */
        function doDelete(requestParams) {

        }

        return {
            'get': doGet,
            put: doPut,
            post: doPost,
            'delete': doDelete
        };

    });
