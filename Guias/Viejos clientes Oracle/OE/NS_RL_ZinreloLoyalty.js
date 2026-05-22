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
                var memberId = nRuntime.getCurrentScript().getParameter('custscript_member_id');
                var email = nRuntime.getCurrentScript().getParameter('custscript_email');
                var firstName = nRuntime.getCurrentScript().getParameter('custscript_first_name');
                var lastName = nRuntime.getCurrentScript().getParameter('custscript_last_name');
                var birthDate = nRuntime.getCurrentScript().getParameter('custscript_birth_date');
                // var myParameter = context.script.getParameter({
                // name: 'my_parameter',
                // default: 'default_value'
                // });
                // throw new Error('Error: ' + response.code + ' ' + JSON.parse(response.body));
               //  var result = createLoyaltyMember(memberId, email, firstName, lastName, birthDate);
                
                var headers = {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    'api-key': '549e5b77959f065297a2b4fe24f6976c',
                    'partner-id': '12c3523998'
                };
                 
                var body = {
                    'first_name': firstName,
                    'last_name': lastName,
                    'email_address': email,
                    'member_id': memberId,
                    'birthdate': birthDate
                };
                var jsonBody = JSON.stringify(body);

                var response = nHttps.post(
                    {
                        url: 'https://api.zinrelo.com/v2/loyalty/members',
                        body: jsonBody,
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
                        result: 'not created'
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



