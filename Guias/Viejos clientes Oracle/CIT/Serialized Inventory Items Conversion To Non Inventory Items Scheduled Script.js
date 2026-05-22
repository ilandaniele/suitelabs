function serializedInventoryItemsCreatedToday(type)
{   
    try {
        // if(type == 'scheduled' || type == 'skipped') {
           var filters = new Array();
           filters.push(new nlobjSearchFilter('custitem_converted_to_non_inventory', null, 'is', 'F'));
           // add a filter to not add to the search child items
           
           var columns = new Array();
           columns.push(new nlobjSearchColumn('internalid'));
           columns.push(new nlobjSearchColumn('itemid'));
           columns.push(new nlobjSearchColumn('displayname'));
           columns.push(new nlobjSearchColumn('baseprice'));
           columns.push(new nlobjSearchColumn('billpricevarianceacct'));
           columns.push(new nlobjSearchColumn('billqtyvarianceacct'));
           columns.push(new nlobjSearchColumn('assetaccount'));
           columns.push(new nlobjSearchColumn('incomeaccount'));
           columns.push(new nlobjSearchColumn('class'));
           columns.push(new nlobjSearchColumn('upccode'));
           columns.push(new nlobjSearchColumn('custitem_ra_item_donotallowdiscount'));
           columns.push(new nlobjSearchColumn('department'));
           columns.push(new nlobjSearchColumn('taxschedule'));
           columns.push(new nlobjSearchColumn('custitem_ewr_fee_item'));
           // add also values for matrix items
           columns.push(new nlobjSearchColumn('custitem_nsts_csic_product_type'));
           
           var searchResults = nlapiSearchRecord('serializedinventoryitem', null, filters, columns);
           
           if(searchResults == null) {
               nlapiLogExecution('DEBUG', 'Script', 'no results on search'); 
           }
           
           
           for (var i = 0; searchResults !== null && i < searchResults.length; i++) {
                var serializedItemInternalId = searchResults[i].getId();
                var serializedItem = nlapiLoadRecord('serializedinventoryitem', serializedItemInternalId);
                var matrixType = serializedItem.getFieldValue('matrixtype');
                
                if (matrixType != 'CHILD') {
                    var itemId = searchResults[i].getValue('itemid');
                    var displayName = searchResults[i].getValue('displayname');
                    var basePrice = searchResults[i].getValue('baseprice');
                    var billPriceVarianceAcct = searchResults[i].getValue('billpricevarianceacct');
                    var billQtyVarianceAcct = searchResults[i].getValue('billqtyvarianceacct');
                    var EwrFeeItem = searchResults[i].getValue('custitem_ewr_fee_item');
                    var department = searchResults[i].getValue('department');
                    var discountNotAllowed = searchResults[i].getValue('custitem_ra_item_donotallowdiscount');
                    var incomeAccount = searchResults[i].getValue('incomeaccount');
                    var assetAccount = searchResults[i].getValue('assetaccount');
                    var itemClass = searchResults[i].getValue('class');
                    var upcCode = searchResults[i].getValue('upccode');
                    
                    // GET EXTRA DATA FROM SERIALIZED ITEM NOT ON SAVED SEARCH
                    var cogsAccount = serializedItem.getFieldValue('cogsaccount');
                    var appleDEP = serializedItem.getFieldValue('custitem_nsts_csde_apple_dep');
                    var bursarCharge = serializedItem.getFieldValue('custitem_allow_bursar_charge');
                    var matrixTemplate = serializedItem.getFieldValue('matrixitemnametemplate');
                    var productType =  serializedItem.getFieldValue('custitem_nsts_csic_product_type'); // we do not know what is this
                    var serializedItemParentID = serializedItem.getFieldValue('itemid');
                    
                    nlapiLogExecution('DEBUG', 'current item name (Should be equal to one above)', itemId);
                    nlapiLogExecution('DEBUG', 'matrix Type', matrixType); // matrixType -> PARENT, other CHILD other void

                    // MARK SERIALIZED ITEM AS REPLICATED AND SUBMIT
                    serializedItem.setFieldValue('custitem_converted_to_non_inventory','T');
                    nlapiSubmitRecord(serializedItem);
                    
                    // CREATE NON-INVENTORY ITEM FROM PARENT
                    var nonInventoryItem = nlapiCreateRecord('noninventoryitem', { subtype: 'sale' });
                    nonInventoryItem.setFieldValue('itemid', itemId + ' NIS');
                    nonInventoryItem.setFieldValue('displayname', displayName);
                    nonInventoryItem.setFieldValue('subsidiary', 1);
                    nonInventoryItem.setFieldValue('taxschedule', 1);
                    nonInventoryItem.setFieldValue('billpricevarianceacct', billPriceVarianceAcct);
                    nonInventoryItem.setFieldValue('billqtyvarianceacct', billQtyVarianceAcct);
                    nonInventoryItem.setFieldValue('upccode', upcCode);
                    nonInventoryItem.setFieldValue('class', itemClass);
                    nonInventoryItem.setFieldValue('cogsaccount', cogsAccount);
                    nonInventoryItem.setFieldValue('assetaccount', assetAccount);
                    nonInventoryItem.setFieldValue('incomeaccount', incomeAccount);
                    nonInventoryItem.setFieldValue('custitem_ra_lastmodified', new Date());
                    nonInventoryItem.setFieldValue('custitem_nspos_serialized_crtd_from', serializedItemInternalId);
                    nonInventoryItem.setFieldValue('custitem_nsts_csde_apple_dep', appleDEP);
                    nonInventoryItem.setFieldValue('custitem_nspos_serial_item', 'T'); 
                    nonInventoryItem.setFieldValue('custitem_nspos_nis_price', basePrice);
                    nonInventoryItem.setFieldValue('custitem_ra_item_donotallowdiscount', discountNotAllowed);
                    nonInventoryItem.setFieldValue('department', department);
                    nonInventoryItem.setFieldValue('custitem_allow_bursar_charge', bursarCharge);
                    nonInventoryItem.setFieldValue('custitem_ewr_fee_item', EwrFeeItem);
                    nonInventoryItem.setFieldValue('matrixitemnametemplate', matrixTemplate);
                    
                    
                    
                    if(matrixType == 'PARENT') {
                        
                        nlapiLogExecution('DEBUG', 'parent serialized item id', serializedItemParentID);
                        var nonInventoryParentItemId = nonInventoryItem.getFieldValue('itemid');
                        nlapiLogExecution('DEBUG', 'parent non-inventory item id', nonInventoryParentItemId);
                        
                        // SUBMIT ON-INVENTORY ITEM FROM PARENT
                        nonInventoryItem.setFieldValue('matrixtype', 'PARENT');
                        nonInventoryItem.setFieldValue('custitem_nsts_csic_product_type', productType);
                        var nonInventoryItemInternalId = nlapiSubmitRecord(nonInventoryItem);
                        
                        // GET CHILDS FROM PARENT
                        filters = new Array();
                        filters.push(new nlobjSearchFilter('matrixchild', null, 'is', 'T'));
                        filters.push(new nlobjSearchFilter('parent', null, 'anyof', serializedItemInternalId));
           
                        var childItemsSearchResults = nlapiSearchRecord('serializedinventoryitem', null, filters, columns);
                        
                        for (var j = 0; j < childItemsSearchResults.length; j++) {‌

                            serializedChildItemInternalId = childItemsSearchResults[j].getId();
                            var serializedChildItemId = childItemsSearchResults[j].getValue('itemid');
                            displayName = childItemsSearchResults[j].getValue('displayname');
                            basePrice = childItemsSearchResults[j].getValue('baseprice');
                            billPriceVarianceAcct = childItemsSearchResults[j].getValue('billpricevarianceacct');
                            billQtyVarianceAcct = childItemsSearchResults[j].getValue('billqtyvarianceacct');
                            EwrFeeItem = childItemsSearchResults[j].getValue('custitem_ewr_fee_item');
                            department = childItemsSearchResults[j].getValue('department');
                            discountNotAllowed = childItemsSearchResults[j].getValue('custitem_ra_item_donotallowdiscount');
                            incomeAccount = childItemsSearchResults[j].getValue('incomeaccount');
                            assetAccount = childItemsSearchResults[j].getValue('assetaccount');
                            itemClass = childItemsSearchResults[j].getValue('class');
                            upcCode = childItemsSearchResults[j].getValue('upccode');
                            
                            
                            var serializedChildItem = nlapiLoadRecord('serializedinventoryitem', serializedChildItemInternalId);
                            
                            cogsAccount = serializedChildItem.getFieldValue('cogsaccount');
                            appleDEP = serializedChildItem.getFieldValue('custitem_nsts_csde_apple_dep');
                            bursarCharge = serializedChildItem.getFieldValue('custitem_allow_bursar_charge');
                            var color = serializedChildItem.getFieldValue('custitem_csgscr_color');
                            var size = serializedChildItem.getFieldValue('custitem_csgscr_size');
                            productType = serializedChildItem.getFieldValue('custitem_nsts_csic_product_type');
                            var productTypeText = serializedChildItem.getFieldText('custitem_nsts_csic_product_type'); 
                            
                            // MARK CHILD ITEM AS REPLICATED AND SUBMIT
                            serializedChildItem.setFieldValue('custitem_converted_to_non_inventory','T');
                            nlapiSubmitRecord(serializedChildItem);
                            
                            
                            // fill up this data to the new non inventory item child
                            nlapiLogExecution('DEBUG', 'child serialized item id', serializedChildItemId);
                            
                            
                             // CREATE NON-INVENTORY ITEM FROM CHILD
                            var nonInventoryItemChild = nlapiCreateRecord('noninventoryitem', { subtype: 'sale' });
                            nonInventoryItemChild.setFieldValue('itemid', serializedChildItemId + ' NIS');
                            
                            var nonInventoryItemChildId = nonInventoryItemChild.getFieldValue('itemid');
                            nlapiLogExecution('DEBUG', 'child non-inventory item id', nonInventoryItemChildId);

                            nonInventoryItemChild.setFieldValue('displayname', displayName);
                            nonInventoryItemChild.setFieldValue('matrixtype','CHILD');
                            nonInventoryItemChild.setFieldValue('parent', nonInventoryItemInternalId);
                            nonInventoryItemChild.setFieldValue('taxschedule', 1); // mandatory
                           
                            nonInventoryItemChild.setFieldValue('subsidiary', 1);
                            nonInventoryItemChild.setFieldValue('billpricevarianceacct', billPriceVarianceAcct);
                            nonInventoryItemChild.setFieldValue('billqtyvarianceacct', billQtyVarianceAcct);
                            nonInventoryItemChild.setFieldValue('upccode', upcCode);
                            nonInventoryItemChild.setFieldValue('class', itemClass);
                            nonInventoryItemChild.setFieldValue('cogsaccount', cogsAccount);
                            nonInventoryItemChild.setFieldValue('assetaccount', assetAccount);
                            nonInventoryItemChild.setFieldValue('incomeaccount', incomeAccount);
                            nonInventoryItemChild.setFieldValue('custitem_ra_lastmodified', new Date());
                            nonInventoryItemChild.setFieldValue('custitem_nspos_serialized_crtd_from', serializedChildItemInternalId);
                            nonInventoryItemChild.setFieldValue('custitem_nsts_csde_apple_dep', appleDEP);
                            nonInventoryItemChild.setFieldValue('custitem_nspos_serial_item', 'T'); 
                            nonInventoryItemChild.setFieldValue('custitem_nspos_nis_price', basePrice);
                            nonInventoryItemChild.setFieldValue('custitem_ra_item_donotallowdiscount', discountNotAllowed);
                            nonInventoryItemChild.setFieldValue('department', department);
                            nonInventoryItemChild.setFieldValue('custitem_allow_bursar_charge', bursarCharge);
                            nonInventoryItemChild.setFieldValue('custitem_ewr_fee_item', EwrFeeItem);
                            nonInventoryItemChild.setFieldValue('matrixoptioncustitem_nsts_csic_product_type', productType);        
                            
                            // nonInventoryItemChild.setFieldValue('custitem_csgscr_color', color);
                            // nonInventoryItemChild.setFieldValue('custitem_csgscr_size', size);
                            // nonInventoryItemChild.setFieldValue('custitem_nsts_csic_product_type', productType);
                            
                            var nonInventoryItemChildInternalId = nlapiSubmitRecord(nonInventoryItemChild);
                            
                            // We do not need any other fields i guess.
                        }

                    }else {
                        var nonInventoryItemInternalId = nlapiSubmitRecord(nonInventoryItem);
                    }
                }
            }
        // }
    } catch (error) {
        nlapiLogExecution("DEBUG", "Error Creating NIS Record!", JSON.stringify(error));
    }
}