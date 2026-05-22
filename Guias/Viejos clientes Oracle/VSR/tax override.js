/*
 * Author: Mat Burnett (mburnett@netsuite.com)
 * Date: 10/7/2020
 * Desc: Set Tax Code on line to -7248 if custcol_scis_taxoverride(item) == T and custbody_scis_cust_taxable(customer) == t
 * 
 * Revisions:
 * 10/7/2020 - Removed old UserEvent Script and created this Client Script due to deprecation in SCIS. See Case#: 3970423 for more information.
 * 
 */

function taxSet(type, name) {
    try {
        var farmCust = nlapiGetFieldValue('custbody_scis_cust_taxable');
        nlapiLogExecution('debug', 'custbody_scis_cust_taxable', farmCust);
        var farmItem = nlapiGetCurrentLineItemValue('item', 'custcol_scis_taxoverride');
        nlapiLogExecution('debug', 'custcol_scis_taxoverride', farmItem);

        if (farmCust == "T" && farmItem == "T") {
            nlapiLogExecution('debug', 'Tax Switch', 'TRUE');
            nlapiSetCurrentLineItemValue('item', 'taxcode', "-7248", false, true);
          nlapiSetCurrentLineItemValue('item', 'taxrate1', '10.25%', false, true);
        } else {
            nlapiLogExecution('debug', 'Tax Switch', 'FALSE');
            return true;
        }

    } catch (err) {
        nlapiLogExecution('debug', 'Error Occurred!', 'TRUE');
        return true;
    }
    nlapiLogExecution('debug', 'Script Complete');
    return true;
}