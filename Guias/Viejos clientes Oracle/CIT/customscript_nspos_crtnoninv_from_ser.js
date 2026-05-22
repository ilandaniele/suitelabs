function onSave(type) { // beforeSubmit
    try {
        nlapiLogExecution("DEBUG", "type", type);
        
        var getItemId = nlapiGetFieldValue('itemid');
        nlapiLogExecution("DEBUG", "get", getItemId);
        var internalID = nlapiGetRecordId();

        var getDisplayName = nlapiGetFieldValue('displayname');
        var getTaxSchedule = nlapiGetFieldValue('taxschedule');
        
        /*Price Level Stuff*/
        var filters = new Array();
        filters[0] = new nlobjSearchFilter('internalid', null, 'is', internalID);
        var columns = new Array();
        columns[0] = new nlobjSearchColumn('itemid');
        columns[1] = new nlobjSearchColumn('baseprice');
        columns[2] = new nlobjSearchColumn('otherprices') //otherprices will pull all price levels in the results
        var searchresults = nlapiSearchRecord('item', null, filters, columns);
        var baseprice = searchresults[0].getValue('baseprice');

        nlapiLogExecution("DEBUG", "baseprice", baseprice); //This works to get basePrice


        nlapiLogExecution("DEBUG", "get", "billpricevarianceacct");
        var billpricevarianceacct = nlapiGetFieldValue('billpricevarianceacct');
        nlapiLogExecution("DEBUG", "get", "billqtyvarianceacct");
        var billqtyvarianceacct = nlapiGetFieldValue('billqtyvarianceacct');
        nlapiLogExecution("DEBUG", "get", "cogsaccount");
        var cogsaccount = nlapiGetFieldValue('cogsaccount');
        nlapiLogExecution("DEBUG", "get", "assetaccount");
        var assetaccount = nlapiGetFieldValue('assetaccount');
        nlapiLogExecution("DEBUG", "get", "incomeaccount");
        var incomeaccount = nlapiGetFieldValue('incomeaccount');
        nlapiLogExecution("DEBUG", "get", "class");
        var itemClass = nlapiGetFieldValue('class');
        nlapiLogExecution("DEBUG", "get", "upccode");
        var upcField = nlapiGetFieldValue('upccode');
        
        nlapiLogExecution("DEBUG", "get", "custitem_ra_item_donotallowdiscount");
        var noDiscount = nlapiGetFieldValue('custitem_ra_item_donotallowdiscount');
        nlapiLogExecution("DEBUG", "get", "department");
        var itemDept = nlapiGetFieldValue('department');
        nlapiLogExecution("DEBUG", "get", "custitem_asucla_buyers");
        var itemBuyer = nlapiGetFieldValue('custitem_asucla_buyers');
        nlapiLogExecution("DEBUG", "get", "custitem_allow_bursar_charge");
        var bursarChargeElig = nlapiGetFieldValue('custitem_allow_bursar_charge');
        nlapiLogExecution("DEBUG", "get", "custitem_asucla_tech_disc");
        var techDisclaimer = nlapiGetFieldValue('custitem_asucla_tech_disc');
        nlapiLogExecution("DEBUG", "get", "custitem_ewr_fee_item");
        var ewrFee = nlapiGetFieldValue('custitem_ewr_fee_item');
        

        //Apple DEP
        nlapiLogExecution("DEBUG", "get", "custitem_nsts_csde_apple_dep");
        var appleDEP = nlapiGetFieldValue('custitem_nsts_csde_apple_dep');

        nlapiLogExecution("DEBUG", "getItemId", getItemId);
        nlapiLogExecution("DEBUG", "getDisplayName", getDisplayName);
        nlapiLogExecution("DEBUG", "getTaxSchedule", getTaxSchedule);
        nlapiLogExecution("DEBUG", "billpricevarianceacct", billpricevarianceacct);
        nlapiLogExecution("DEBUG", "billqtyvarianceacct", billqtyvarianceacct);
        nlapiLogExecution("DEBUG", "cogsaccount", cogsaccount);
        nlapiLogExecution("DEBUG", "assetaccount", assetaccount);
        nlapiLogExecution("DEBUG", "incomeaccount", incomeaccount);
        nlapiLogExecution("DEBUG", "internalID", internalID);
        nlapiLogExecution("DEBUG", "appleDEP", appleDEP);


        var parent = nlapiCreateRecord('noninventoryitem', {
            subtype: 'sale'
        });
        parent.setFieldValue('itemid', getItemId + ' NIS');
        parent.setFieldValue('displayname', getDisplayName);
        parent.setFieldValue('subsidiary', 1); // internalid for subs.
        parent.setFieldValue('taxschedule', 1); // internalid for N/A in my account
        parent.setFieldValue('billpricevarianceacct', billpricevarianceacct);
        parent.setFieldValue('billqtyvarianceacct', billqtyvarianceacct);
        parent.setFieldValue('upccode', upcField);
        parent.setFieldValue('class', itemClass);
        parent.setFieldValue('cogsaccount', cogsaccount);
        parent.setFieldValue('assetaccount', assetaccount);
        parent.setFieldValue('incomeaccount', incomeaccount);
        parent.setFieldValue('custitem_ra_lastmodified', new Date());
        parent.setFieldValue('custitem_nspos_serialized_crtd_from', internalID);
        parent.setFieldValue('custitem_nsts_csde_apple_dep', appleDEP);
        parent.setFieldValue('custitem_nspos_serial_item', 'T'); 
        parent.setFieldValue('custitem_nspos_nis_price', baseprice);
        
        parent.setFieldValue('custitem_ra_item_donotallowdiscount', noDiscount);
        parent.setFieldValue('department', itemDept);
        parent.setFieldValue('custitem_asucla_buyers', itemBuyer);
        parent.setFieldValue('custitem_allow_bursar_charge', bursarChargeElig);
        parent.setFieldValue('custitem_asucla_tech_disc', techDisclaimer);
        parent.setFieldValue('custitem_ewr_fee_item', ewrFee);
        

        var parentid = nlapiSubmitRecord(parent);

        //    nlapiSetFieldValue('custitem_nspos_serialized_crtd_from',parent);
        nlapiLogExecution("DEBUG", "Created NIS Record", parentid);
    } catch (err) {
        nlapiLogExecution("DEBUG", "Error Creating NIS Record!", err);
    }
}