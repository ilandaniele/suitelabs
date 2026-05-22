/** 
 * @NApiVersion 2.0
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/https', 'N/log', 'N/runtime'], 

    function (nRecord, nHttps, nLog, nRuntime) {
        
        function sale() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var cvv = nRuntime.getCurrentScript().getParameter('custscript_cvv');
            var track2 = nRuntime.getCurrentScript().getParameter('custscript_track_2');
            var identifier = nRuntime.getCurrentScript().getParameter('custscript_identifier');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var overrideCVV = nRuntime.getCurrentScript().getParameter('custscript_override_cvv');
            var invoice = nRuntime.getCurrentScript().getParameter('custscript_invoice');
            var overrideDuplicate = nRuntime.getCurrentScript().getParameter('custscript_override_duplicate');
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'CVV': cvv,
                'Track2': track2,
                'Identifier': identifier,
                'Amount': amount,
                'OverrideCVV': overrideCVV,
                'InvoiceNo': invoice,
                'OverrideDuplicate': overrideDuplicate
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/sale',
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        function voidSale() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var referenceNumber = nRuntime.getCurrentScript().getParameter('custscript_ref_no');
            var authCode = nRuntime.getCurrentScript().getParameter('custscript_auth_code');              
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'Amount': amount,
                'RefNo': referenceNumber,
                'AuthCode': authCode
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/sale/' + referenceNumber + '/void', // change to production URL later
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        function issueGiftCardWithMoney() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var cvv = nRuntime.getCurrentScript().getParameter('custscript_cvv');
            var track2 = nRuntime.getCurrentScript().getParameter('custscript_track_2');
            var identifier = nRuntime.getCurrentScript().getParameter('custscript_identifier');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var overrideCVV = nRuntime.getCurrentScript().getParameter('custscript_override_cvv');
            var invoice = nRuntime.getCurrentScript().getParameter('custscript_invoice');
            var overrideDuplicate = nRuntime.getCurrentScript().getParameter('custscript_override_duplicate');
            var promo = nRuntime.getCurrentScript().getParameter('custscript_promo');                
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'CVV': cvv,
                'Track2': track2,
                'Identifier': identifier,
                'Amount': amount,
                'OverrideCVV': overrideCVV,
                'InvoiceNo': invoice,
                'OverrideDuplicate': overrideDuplicate,
                'Promo': promo
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/issue', // change to production URL later
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount issued: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        function voidIssueGiftCardWithMoney() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var referenceNumber = nRuntime.getCurrentScript().getParameter('custscript_ref_no');
            var authCode = nRuntime.getCurrentScript().getParameter('custscript_auth_code');              
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'Amount': amount,
                'RefNo': referenceNumber,
                'AuthCode': authCode
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/issue/' + referenceNumber + '/void', // change to production URL later
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount issued: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        
        function loadGiftCardWithMoney() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var cvv = nRuntime.getCurrentScript().getParameter('custscript_cvv');
            var track2 = nRuntime.getCurrentScript().getParameter('custscript_track_2');
            var identifier = nRuntime.getCurrentScript().getParameter('custscript_identifier');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var overrideCVV = nRuntime.getCurrentScript().getParameter('custscript_override_cvv');
            var invoice = nRuntime.getCurrentScript().getParameter('custscript_invoice');
            var overrideDuplicate = nRuntime.getCurrentScript().getParameter('custscript_override_duplicate');
            var promo = nRuntime.getCurrentScript().getParameter('custscript_promo');
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'CVV': cvv,
                'Track2': track2,
                'Identifier': identifier,
                'Amount': amount,
                'OverrideCVV': overrideCVV,
                'InvoiceNo': invoice,
                'OverrideDuplicate': overrideDuplicate,
                'Promo': promo
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/load',
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount issued: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        function voidLoadGiftCardWithMoney() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var amount = nRuntime.getCurrentScript().getParameter('custscript_amount');
            var referenceNumber = nRuntime.getCurrentScript().getParameter('custscript_ref_no');
            var authCode = nRuntime.getCurrentScript().getParameter('custscript_auth_code');              
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'Amount': amount,
                'RefNo': referenceNumber,
                'AuthCode': authCode
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/load/' + referenceNumber + '/void', // change to production URL later
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);
            
            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance + ', Amount issued: ' + jsonResponse.Amount + ', AuthCode: ' + jsonResponse.AuthCode + ', RefNo: ' + jsonResponse.RefNo;
        }
        
        function balanceGiftCard() {
            var account = nRuntime.getCurrentScript().getParameter('custscript_account');
            var cvv = nRuntime.getCurrentScript().getParameter('custscript_cvv');
            var track2 = nRuntime.getCurrentScript().getParameter('custscript_track_2');
            var identifier = nRuntime.getCurrentScript().getParameter('custscript_identifier');
            var overrideCVV = nRuntime.getCurrentScript().getParameter('custscript_override_cvv');
            
            var headers = {
                'Authorization': 'NETSUSANM0EQ',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'NSPOS2020'
            };
            
            var body = {
                'Account': account,
                'CVV': cvv,
                'Track2': track2,
                'Identifier': identifier,
                'OverrideCVV': overrideCVV
            };
            var jsonBody = JSON.stringify(body);
            var response = nHttps.post(
                {
                    url: 'https://pay-cert.dcap.com/v1/storedvalue/balance', // change to production URL later
                    headers: headers,
                    body: jsonBody
                }
            );
            
            var jsonResponse = JSON.parse(response.body);

            return jsonResponse.Status + ', ' + jsonResponse.Message + ', Balance: ' + jsonResponse.Balance;
        }
        
        function doGet(requestParams) {
           try {
                var response = {};
                
                nLog.debug({
                    title: 'Request params',
                    details: requestParams
                });
                var type = nRuntime.getCurrentScript().getParameter('custscript_type');
                
                nLog.debug({
                    title: 'Type',
                    details: type
                });
                
                if (type === 'issue') {
                    response = issueGiftCardWithMoney();
                } else if (type === 'voidIssue') {
                    response = voidIssueGiftCardWithMoney();
                } else if (type === 'sale') {
                    response = sale();
                } else if (type === 'voidSale') {
                    response = voidSale();
                } else if (type === 'load') {
                    response = loadGiftCardWithMoney();
                } else if (type === 'voidLoad') {
                    response = voidLoadGiftCardWithMoney();
                } else if (type === 'balance') {
                    response = balanceGiftCard();
                }
                    
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



