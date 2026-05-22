/**
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/task',
      'N/log',
	  'N/format'
	  //'../third_parties/underscore.js'
  ], function UpdatePaymentsNSPOSGrantUE(
    nRecord,
    nTask,
    nLog,
	nFormat
	// _
    ) {
      'use strict';

      var doAfterSubmit = function doAfterSubmit(context) {
		  
		  //Check that invoice is already added to the payment
		  
		  var customerPaymentRecord = context.newRecord;
		  
		  // get the invoice associated 
		  
		  // Retrieve invoice ID sublist apply - invoices 
		  var paymentAmount = customerPaymentRecord.getValue({
			  fieldId: 'payment'
		  });
		  
		  nLog.debug({
              title: 'Payment Amount',
              details: paymentAmount
          });
		  
		  var customerPayment = nRecord.load({
			type: nRecord.Type.CUSTOMER_PAYMENT,
			id: customerPaymentRecord.id,
			isDynamic: true
		  })
		  
		  customerPayment.selectLine({
			  sublistId: 'apply',
			  line: 0
			  });
		  
		  var invoiceID = customerPayment.getCurrentSublistValue({
				sublistId: 'apply',
				fieldId: 'internalid'
			});
			
		  nLog.debug({
              title: 'invoice ID',
              details: invoiceID
          });
			
		  //load invoice record
		  var invoice = nRecord.load({
			  type: nRecord.Type.INVOICE,
              id: invoiceID,
              isDynamic: true 
		  });
		  
		  // Retrieve NSPOS Grant custom field
		  
		  nLog.debug({
              title: 'invoice',
              details: invoice
          });
			
		  
		  var nsposGrants = invoice.getValue({	
			fieldId: 'custbody_nspos_grant_payments'
		  });
		  
		  // Split the value = '10.00 1111 // 20.00 2222 // 30.00 3333 // 20.00 4444' on ' // '
		  
		  var nsposGrantsArray = nsposGrants.split(' // ');
		  
		  //get the corresponding payment value its 1111, 2222, 3333 or 4444 value

		  var i = 0;
		  var nsposGrantValue = '';
		  while(nsposGrantValue === '' && i<nsposGrantsArray.length){
			  
			  var nsposGrantsArrayPaymentAmount = nsposGrantsArray[i].split(' ')[0];
			  
			  var nsposGrantsArrayPaymentAmountFormatted = nFormat.parse({
				  value: nsposGrantsArrayPaymentAmount,
				  type: nFormat.Type.FLOAT
			  });
			  
			  if(nsposGrantsArrayPaymentAmountFormatted === paymentAmount) {						
				  nsposGrantValue = nsposGrantsArray[i].split(' ')[1];
			  }
			  i++;
		  }
		  
		  
		  nLog.debug({
              title: 'grant value',
              details: nsposGrantValue
          });
		  
		  // Set the record value
		  customerPayment.setValue({
			  fieldId:'custbody_nspos_grant_assoc',
			  value: nsposGrantValue
		  });
		  
		  customerPayment.save();
        
          nLog.debug({
              title: 'Payment Record',
              details: customerPayment
          });
      };

      return {
          afterSubmit: function afterSubmit(context) {
              if (context.type === context.UserEventType.CREATE) {
                  doAfterSubmit(context);
              }
              nLog.debug({
                  title: 'afterSubmit',
                  details: 'Executed after submit'
              });
          }
      };
  });
