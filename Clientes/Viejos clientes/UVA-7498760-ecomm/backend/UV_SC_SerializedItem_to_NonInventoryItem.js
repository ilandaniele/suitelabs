function convertSerializedToNonInventory() {
    var searchResults;
    var filters = [];
    var columns = [];

    var serializedItem;
    var serializedItemInternalId;
    var nonInventoryItem;
    var nonInventoryItemInternalId;

    var itemId;
    var displayName;
    var basePrice;
    var retailPrice;
    var department;
    var incomeAccount;
    var assetAccount;
    var itemClass;
    var upcCode;
    var unitsType;
    var primaryStockUnit;
    var primaryPurchaseUnit;
    var primarySaleUnit;
    var subsidiary;
    var doNotDisplayInWebstore = 5;
    var requirePriceEntryAtRegister;
    var commentRequired;
    var disableInPosSearch;
    var doNotDownload;
    var lastModified;
    var commentMessage;
    var readScaleForQuantity;
    var doNotAllowDiscount;
    var taxSchedule;


    var cogsAccount;
    var appleDEP;
    var bursarCharge;
    var i;
    // var ids = ['127867'];

    try {
        // filters.push(new nlobjSearchFilter('internalid', null, 'anyof', ids));
        filters.push(new nlobjSearchFilter('custitem_converted_to_non_inventory', null, 'is', 'F'));
        filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
        columns.push(new nlobjSearchColumn('internalid'));
        columns.push(new nlobjSearchColumn('itemid'));
        columns.push(new nlobjSearchColumn('displayname'));
        columns.push(new nlobjSearchColumn('baseprice'));
        columns.push(new nlobjSearchColumn('assetaccount'));
        columns.push(new nlobjSearchColumn('incomeaccount'));
        columns.push(new nlobjSearchColumn('class'));
        columns.push(new nlobjSearchColumn('upccode'));
        columns.push(new nlobjSearchColumn('department'));
        columns.push(new nlobjSearchColumn('taxschedule'));
        columns.push(new nlobjSearchColumn('unitstype'));
        columns.push(new nlobjSearchColumn('stockunit'));
        columns.push(new nlobjSearchColumn('purchaseunit'));
        columns.push(new nlobjSearchColumn('saleunit'));
        columns.push(new nlobjSearchColumn('subsidiary'));
        columns.push(new nlobjSearchColumn('custitem_ra_item_donotallowdiscount'));
        columns.push(new nlobjSearchColumn('custitem_ra_item_requireprice'));
        columns.push(new nlobjSearchColumn('custitem_ra_required_comment'));
        columns.push(new nlobjSearchColumn('custitem_ra_inactive_in_pos'));
        columns.push(new nlobjSearchColumn('custitem_ra_donot_download'));
        columns.push(new nlobjSearchColumn('custitem_ra_comment_message'));
        columns.push(new nlobjSearchColumn('custitem_ra_read_scale'));

        searchResults = nlapiSearchRecord('serializedinventoryitem', null, filters, columns);

        if (searchResults == null) {
            nlapiLogExecution('DEBUG', 'Script', 'no results on search');
        } else {
            for (i = 0; i < searchResults.length; i++) {
                serializedItemInternalId = searchResults[i].getId();
                itemId = searchResults[i].getValue('itemid');
                displayName = searchResults[i].getValue('displayname');
                basePrice = searchResults[i].getValue('baseprice');
                department = searchResults[i].getValue('department');
                incomeAccount = searchResults[i].getValue('incomeaccount');
                assetAccount = searchResults[i].getValue('assetaccount');
                itemClass = searchResults[i].getValue('class');
                upcCode = searchResults[i].getValue('upccode');
                unitsType = searchResults[i].getValue('unitstype');
                primaryStockUnit = searchResults[i].getValue('stockunit');
                primaryPurchaseUnit = searchResults[i].getValue('purchaseunit');
                primarySaleUnit = searchResults[i].getValue('saleunit');
                subsidiary = searchResults[i].getValue('subsidiary');
                requirePriceEntryAtRegister = searchResults[i].getValue('custitem_ra_item_requireprice');
                commentRequired = searchResults[i].getValue('custitem_ra_required_comment');
                disableInPosSearch = searchResults[i].getValue('custitem_ra_inactive_in_pos');
                doNotDownload = searchResults[i].getValue('custitem_ra_donot_download');
                lastModified = new Date();
                commentMessage = searchResults[i].getValue('custitem_ra_comment_message');
                readScaleForQuantity = searchResults[i].getValue('custitem_ra_read_scale');
                doNotAllowDiscount = searchResults[i].getValue('custitem_ra_item_donotallowdiscount');
                taxSchedule = searchResults[i].getValue('taxschedule');

                // Load serialized item to get extra data
                serializedItem = nlapiLoadRecord('serializedinventoryitem', serializedItemInternalId);
                cogsAccount = serializedItem.getFieldValue('cogsaccount');
                appleDEP = serializedItem.getFieldValue('custitem_nsts_csde_apple_dep');
                bursarCharge = serializedItem.getFieldValue('custitem_allow_bursar_charge');
                retailPrice = serializedItem.getLineItemValue('price', 'price_1_', 1);

                // Create Non-Inventory item
                nonInventoryItem = nlapiCreateRecord('noninventoryitem', { subtype: 'sale' });
                nonInventoryItem.setFieldValue('itemid', itemId + ' NIS');
                nonInventoryItem.setFieldValue('displayname', displayName);
                nonInventoryItem.setFieldValue('subsidiary', subsidiary);
                nonInventoryItem.setFieldValue('taxschedule', taxSchedule);
                nonInventoryItem.setFieldValue('upccode', upcCode);
                nonInventoryItem.setFieldValue('unitstype', unitsType);
                nonInventoryItem.setFieldValue('stockunit', primaryStockUnit);

                nonInventoryItem.setFieldValue('purchaseunit', primaryPurchaseUnit);
                nonInventoryItem.setFieldValue('saleunit', primarySaleUnit);
                nonInventoryItem.setFieldValue('custitem_ra_item_requireprice', requirePriceEntryAtRegister);
                nonInventoryItem.setFieldValue('custitem_ra_required_comment', commentRequired);
                nonInventoryItem.setFieldValue('custitem_ra_inactive_in_pos', disableInPosSearch);
                nonInventoryItem.setFieldValue('custitem_ra_donot_download', doNotDownload);
                nonInventoryItem.setFieldValue('custitem_ra_lastmodified', lastModified);
                nonInventoryItem.setFieldValue('custitem_ra_comment_message', commentMessage);
                nonInventoryItem.setFieldValue('custitem_ra_read_scale', readScaleForQuantity);
                nonInventoryItem.setFieldValue('custitem_ra_item_donotallowdiscount', doNotAllowDiscount);

                nonInventoryItem.setFieldValue('class', itemClass);
                nonInventoryItem.setFieldValue('cogsaccount', cogsAccount);
                nonInventoryItem.setFieldValue('assetaccount', assetAccount);
                nonInventoryItem.setFieldValue('incomeaccount', incomeAccount);
                nonInventoryItem.setFieldValue('custitem_nspos_serialized_crtd_from', serializedItemInternalId);
                nonInventoryItem.setFieldValue('custitem_nsts_csde_apple_dep', appleDEP);
                nonInventoryItem.setFieldValue('custitem_nspos_serial_item', 'T');
                nonInventoryItem.setFieldValue('custitem_nspos_nis_price', basePrice);
                nonInventoryItem.setFieldValue('department', department);
                nonInventoryItem.setFieldValue('custitem_allow_bursar_charge', bursarCharge);
                nonInventoryItem.setFieldValue('custitem_nsts_csic_web_oos_behavior', doNotDisplayInWebstore);
                nonInventoryItem.setLineItemValue('price', 'price_1_', 1, retailPrice);

                nonInventoryItemInternalId = nlapiSubmitRecord(nonInventoryItem);

                serializedItem.setFieldValue('custitem_converted_to_non_inventory', 'T');
                serializedItem.setFieldValue('custitem_nspos_non_inventory_crtd', nonInventoryItemInternalId);
                nlapiSubmitRecord(serializedItem);
            }
        }
    } catch (error) {
        nlapiLogExecution('DEBUG', 'Error Creating NIS Record!', JSON.stringify(error));
    }
}
