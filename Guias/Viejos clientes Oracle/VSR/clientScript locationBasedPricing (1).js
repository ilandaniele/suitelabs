/**
 * Copyright (c) 1998-2017 NetSuite, Inc.
 * 2955 Campus Drive, Suite 100, San Mateo, CA, USA 94403-2511
 * All Rights Reserved.
 * 
 * This software is the confidential and proprietary information of NetSuite, Inc. ("Confidential Information").
 * You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement
 * you entered into with NetSuite.
 * 
 * Version Type         Date            Author           Remarks
 * 1.00    Update       17 Dec 2018     Emily Symonds    Update on isLocationPricingSet check

 * 
 * @NScriptType ClientScript
 */


/*
function validateLine(type){
var _fld_location_PL = 'custrecord_loc_price_level';
var locationPL = null;
if (type === 'item') {
if (nlapiGetLocation()) {
locationPL = nlapiLookupField('location', nlapiGetLocation(), _fld_location_PL);
  var currentLinePL = nlapiGetCurrentLineItemValue('item','price');
if (locationPL && locationPL!=currentLinePL) {
  try{
nlapiSetCurrentLineItemValue('item','price', locationPL);
    return true;
  } catch(err){
    nlapiLogExecution('DEBUG', 'ERROR:', err);
    return true;
  }
  }
}
}
return true;
}
*/

var _is_scis_locationPricing = (function(){
  
  var LOCATION_CACHE = {};

  function validateLine(type){
    var logTitle = 'validateLine';
    try{
      var executionContext = nlapiGetContext().getExecutionContext();
      if(executionContext === 'userinterface') return true;
      
      var recordType = nlapiGetRecordType();
      var posStatus = nlapiGetFieldValue('custbody_ns_pos_transaction_status');
      if (posStatus != 1) {
         nlapiLogExecution('DEBUG', logTitle, 'POS Status is not Open, cannot change Price Level');
         return true;
      }
      var itemType = nlapiGetCurrentLineItemValue('item', 'itemtype');
      nlapiLogExecution('debug', logTitle, '-- Start --' + 'executionContext: ' + executionContext + ' type: ' + type + ' recordType: ' + recordType + ' itemType: ' + itemType + ' POS Status: ' + posStatus);
//      var itemType = nlapiGetCurrentLineItemValue('item', 'itemtype');
//      nlapiLogExecution('debug', logTitle, '-- Start --' + 'executionContext: ' + executionContext + ' type: ' + type + ' recordType: ' + recordType + ' itemType: ' + itemType);
      
      if(itemType != 'Discount') {
        var _fld_location_PL = 'custrecord_scis_price_level';
        var locationPL = null;

        if (type === 'item') {
          if (nlapiGetLocation()) {
            var locationCachePL = LOCATION_CACHE[nlapiGetLocation()];

            if (!locationCachePL){
              locationCachePL = {
                value: nlapiLookupField('location', nlapiGetLocation(), _fld_location_PL)
              };
              LOCATION_CACHE[nlapiGetLocation()] = locationCachePL;
            }
            locationPL = locationCachePL.value;

            var currentLinePL = nlapiGetCurrentLineItemValue('item','price');
            //esymonds on 12/20/2018: added this validation to prevent Price Level being set on Variable Items
            var variableAmount = nlapiGetCurrentLineItemValue('item','custcol_variable_amount') == 'T';
            
            //esymonds on 12/17/2018: removing the isLocationPricingSet validation cause when the ORDER button is being clicked, 
            //the price level value is reset, but the custcol_is_location_pricing_set field has its value set to T, so the following 'if' is being skipped  
            //var isLocationPricingSet = nlapiGetCurrentLineItemValue('item','custcol_is_location_pricing_set') == 'T';
            if (locationPL && locationPL != currentLinePL /*&& !isLocationPricingSet*/ && !variableAmount) {
              try{
                nlapiSetCurrentLineItemValue('item', 'price', locationPL);
                nlapiSetCurrentLineItemValue('item', 'custcol_is_location_pricing_set', 'T');
                return true;
              }
              catch(err){
                nlapiLogExecution('DEBUG', 'ERROR:', err);
                return true;
              }
            }
          }
        }
      }
      return true;
    }catch(e){
      var err = (e.getDetails != undefined ? e.getDetails() : e.toString());
      nlapiLogExecution('error', logTitle, 'ERROR: ' + err);
    }
  }
  
  function trackMe(p1,p2,p3){
    nlapiLogExecution('error','trackme',[p1,p2,p3].join(' ## '))
  }
  
  return {
    validateLine: validateLine,
    trackMe: trackMe
  };
})();

var validateLine = _is_scis_locationPricing.validateLine;