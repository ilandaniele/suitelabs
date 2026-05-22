/** 
 * @NApiVersion 2.0
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/https', 'N/log', 'N/runtime'], 

    function (nRecord, nHttps, nLog, nRuntime) {
            
        function getAuthToken() {
            var appKey = nRuntime.getCurrentScript().getParameter('custscript_app_key');
            var organizationName = nRuntime.getCurrentScript().getParameter('custscript_organization_name');
            var deviceId = nRuntime.getCurrentScript().getParameter('custscript_device_id');
            var authURL = nRuntime.getCurrentScript().getParameter('custscript_auth_url');
            
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            
            var body = {
                'app_key': appKey,
                'organization_name': organizationName,
                'device_id': deviceId
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: authURL,
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            nLog.debug({
                title: 'response token',
                details: jsonResponse
            });
            
            if (jsonResponse.error_message) {
                throw new Error(jsonResponse.error_message);
            }
            
            if (jsonResponse.error) {
                throw new Error(jsonResponse.error);
            }
            
            nLog.debug({
                title: 'token',
                details: jsonResponse.access_token
            });
            
            return jsonResponse.access_token;
        }
        
        function charge(authToken) {
            var scannedQR = nRuntime.getCurrentScript().getParameter('custscript_scanned_qr');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount_cents');
            var chargeUrl = nRuntime.getCurrentScript().getParameter('custscript_charge_url');
            
            var merchantId = nRuntime.getCurrentScript().getParameter('custscript_merchant_id');
            var revenueCenter = nRuntime.getCurrentScript().getParameter('custscript_revenue_center');
            var transactionIdOnNetSuite = nRuntime.getCurrentScript().getParameter('custscript_transaction_id');
            
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ authToken
            };
            
            var body = {
                'discount_charge_qr': scannedQR, // try random one '7986892386443267'
                'amount_in_cents': amount,
                'merchant_account_id': merchantId, // 7CFBDCB9-26B5-4841-8AFD-CE99E7381F41
                'revenue_center': revenueCenter, // 6172 or revenuecenter123
                'check_num': transactionIdOnNetSuite // 1234 or 3434634564
                 
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: chargeUrl,
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            nLog.debug({
                title: 'response charge',
                details: jsonResponse
            });
            
            if (jsonResponse.error_message) {
                throw new Error(jsonResponse.error_message);
            }
            
            if (jsonResponse.error) {
                throw new Error(jsonResponse.error);
            }
          
            return jsonResponse;
        }
        
        function doGet(requestParams) {
           try {
                var response = {};
                var authToken;
                var chargedAmount;
                
               
                var type = nRuntime.getCurrentScript().getParameter('custscript_type');

                nLog.debug({
                    title: 'Type',
                    details: type
                });
                
                if (type === 'charge') {
                    authToken = getAuthToken();
                    response = charge(authToken);
                    chargedAmount = response.charged_amount_in_cents;
                    
                    nLog.debug({
                        title: 'chargedAmount',
                        details: Number(chargedAmount)
                    });
                    
                    
                    // handle YES or NO response
                }
                // } else if (type === 'voidIssue') {
                    // response = voidIssueGiftCardWithMoney();
                // } else if (type === 'sale') {
                    // response = sale();
                // } else if (type === 'voidSale') {
                    // response = voidSale();
                // } else if (type === 'load') {
                    // response = loadGiftCardWithMoney();
                // } else if (type === 'voidLoad') {
                    // response = voidLoadGiftCardWithMoney();
                // } else if (type === 'balance') {
                    // response = balanceGiftCard();
                // }
                    
                return JSON.stringify({
                    result: response
                });
                
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



