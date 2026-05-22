/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

define(['N/search', 'N/log', 'N/runtime', 'N/record'], function (nSearch, nLog, nRuntime, nRecord) {
  var LOCATION_CACHE = {}

  function validateLine (context) {
    try {
      
      var record = context.currentRecord;
      var recordType = record.type;
      var posStatus = record.getValue({
          fieldId: 'custbody_ns_pos_transaction_status'
      });
      
      var user = nRuntime.getCurrentUser();
      var itemType;
      var locationCachePL;
      var fieldLookUp;
      var locationPL;
      var currentLinePL;
      var taxRate;
      var taxCode;
      var state;
      var isTaxableIllinois;
      var isTaxableIndiana;
      
      
      nLog.debug({
        title: 'posStatus',
        details: posStatus
      });

      if (posStatus != 1) {
         nLog.debug({ title: 'validateLine', details: 'POS Status is not Open, cannot change Price Level'});
         return true;
      }
      
      var itemType = record.getCurrentSublistValue({
          'sublistId': 'item',
          'fieldId': 'itemtype'
      });
      
      var itemTaxOverride = record.getCurrentSublistValue({
          'sublistId': 'item',
          'fieldId': 'custcol_scis_taxoverride'
      });
      
      var customerTaxableIllinois = record.getValue({
          fieldId: 'custbody_scis_cust_taxable_il'
      });
      
      var customerTaxableIndiana= record.getValue({
          fieldId: 'custbody_scis_cust_taxable_in'
      });
      
      nLog.debug({ 
        title: 'item tax override',
        details: itemTaxOverride
      });
      
      nLog.debug({ 
        title: 'customerTaxableIllinois',
        details: customerTaxableIllinois
      });
      
      nLog.debug({ 
        title: 'customerTaxableIndiana',
        details: customerTaxableIndiana
      });
      
      nLog.debug({ 
        title: 'validateLine',
        details: '-- Start -- executionContext: ' + context + ' recordType: ' + recordType + ' itemType: ' + itemType + ' POS Status: ' + posStatus
      });
       
      if (itemType !== 'Discount') {
        locationPL = null;
        if (user.location) {
            
            nLog.debug({ 
                title: 'location',
                details: user.location
            });
              
            locationCachePL = LOCATION_CACHE[user.location];

            if (!locationCachePL) {
              fieldLookUp = nSearch.lookupFields({
                type: nSearch.Type.LOCATION,
                id: user.location,
                columns: ['custrecord_scis_price_level','custrecord_scis_tax','custrecord_scis_tax_rate','custrecord_scis_state'] //add here the state, then check the state and check if the customer with custbody_scis_cust_taxable_in or custbody_scis_cust_taxable_il is checked
              });
              
              locationCachePL = {
                value: fieldLookUp
              };
                
              nLog.debug({ 
                title: 'field look up',
                details: fieldLookUp
            });
              
              LOCATION_CACHE[user.location] = locationCachePL;
            }
            locationPL = locationCachePL.value.custrecord_scis_price_level[0].value;
            taxCode = locationCachePL.value.custrecord_scis_tax_rate[0].value;
            taxRate = locationCachePL.value.custrecord_scis_tax;
            state = locationCachePL.value.custrecord_scis_state[0].text;
            
            nLog.debug({ 
                title: 'taxCode',
                details: taxCode
            });
            
            nLog.debug({ 
                title: 'taxRate',
                details: taxRate
            });
            
            nLog.debug({ 
                title: 'locationPL',
                details: locationPL
            });
            
            currentLinePL = record.getCurrentSublistValue({
                'sublistId': 'item',
                'fieldId': 'price'
            });
            
            if (locationPL && locationPL != currentLinePL) {
                record.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'price',
                    value: locationPL
                });
                record.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_is_location_pricing_set',
                    value: 'T'
                });
            }
            
            isTaxableIllinois = customerTaxableIllinois && state === "Illinois";
            isTaxableIndiana = customerTaxableIndiana && state === "Indiana";

            if (itemTaxOverride && (isTaxableIllinois || isTaxableIndiana) ) { //add 2 conditions here 1. if always taxable in IL, and location is from IL, and same for indiana State
                
                record.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'taxcode',
                    value: taxCode
                });
                
                record.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'taxrate1',
                    value: taxRate
                });
               
            }
        }
      }
      return true;
    } catch (e) {
      nLog.error({
          title: 'Error',
          details: e
      });
      return true;
    }
  }
  return {
    validateLine: validateLine
  };
});