/** 
 * @NApiVersion 2.0
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/https', 'N/log', 'N/runtime'], 

    function (nRecord, nHttps, nLog, nRuntime) {
        
        function doGet(requestParams) {
           try {
                // code to create a new record
                var response = {};
                var memberId = nRuntime.getCurrentScript().getParameter('custscript_zinrelo_member_id');
                
                var headers = {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    'api-key': '549e5b77959f065297a2b4fe24f6976c',
                    'partner-id': '12c3523998'
                };
                var url = 'https://api.zinrelo.com/v2/loyalty/members/' + memberId + '/rewards?idParam=member_id';

                var response = nHttps.get(
                    {
                        url: url,
                        headers: headers
                    }
                );
                
                if (response.code === 200) {
                    var body = JSON.parse(response.body);
                    nLog.debug({
                        title: 'Debug Entry',
                        details: body
                    });
                    
                    return JSON.stringify({
                        result: 'success'
                    });
                } else {
                    return JSON.stringify({
                        result: 'error'
                    });
                }
            } catch (e) {
                nLog.error('error', e);
                return JSON.stringify({
                    result: 'fail',
                    error: e
                });

            }
        }
  
        function doPost(requestBody) {
            
        }
  
        function doPut(requestBody) {

        }
  
        function doDelete(requestParams) {

        }
  
        return {
            'get': doGet,
            put: doPut,
            post: doPost,
            'delete': doDelete
        };
  
});



