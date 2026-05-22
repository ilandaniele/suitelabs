/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/log',
      'N/search'
  ], function CommerceCategoriesUE(
    nRecord,
    nLog,
    nSearch
    ) {
      'use strict';

      var doAfterSubmit = function doAfterSubmit(context) {
          // STEP 1: Get Category ID from context
          var categoryRecord = context.newRecord;
          var categoryRecordOld = context.oldRecord;
          var categoryID = '';

          var urlComponent = '';
          var urlComponentOld = '';
          var name = '';
          var nameOld = '';
          var image = '';
          var imageOld = '';

          var categorySearch = {};
          var itemIds = [];
          var index = -1;

          // I don't need to load the category records because they are already loaded

          // Obtain record data
          categoryID = categoryRecord.getValue({
              fieldId: 'id'
          });

          urlComponent = categoryRecord.getValue({
              fieldId: 'urlfragment'
          });

          urlComponentOld = categoryRecordOld.getValue({
              fieldId: 'urlfragment'
          });

          name = categoryRecord.getValue({
              fieldId: 'name'
          });

          nameOld = categoryRecordOld.getValue({
              fieldId: 'name'
          });

          image = categoryRecord.getValue({
              fieldId: 'thumbnail'
          });

          imageOld = categoryRecordOld.getValue({
              fieldId: 'thumbnail'
          });


          // STEP 2: Search related Items into Related Commerce Categories records
          categorySearch = nSearch.create({
              type: 'customrecord_nssc_related_commerce_cate',
              columns: [{
                  name: 'custrecord_nssc_item'
              }],
              filters: [{
                  name: 'custrecord_nssc_commerce_category',
                  operator: nSearch.Operator.IS,
                  values: categoryID
              }, {
                  name: 'isinactive',
                  operator: nSearch.Operator.IS,
                  values: 'F'
              }]
          });

          // If nothing is modified and deleted, then do nothing
          if (!(context.type === context.UserEventType.EDIT &&
            urlComponent === urlComponentOld &&
            name === nameOld &&
            image === imageOld
        )) {
              categorySearch.run().each(function forEachResult(result) {
                  var id = result.getValue({ name: 'custrecord_nssc_item' });
                  itemIds.push(id);

                  return true; // This is needed for walking through each search result.
              });

              itemIds = itemIds.filter(function each(item) {
                  if (item !== '') {
                      return true;
                  }
                  return false;
              });


              itemIds.forEach(function eachItem(itemID) {
                // Load item record
                  var itemRecord = nRecord.load({
                      type: nRecord.Type.INVENTORY_ITEM,
                      id: itemID,
                      isDynamic: true
                  });

                // get Item value for RELATED COMMERCE CATEGORY LIST JSON
                  var jsonRelatedCommerceCategoryList = itemRecord.getValue({
                      fieldId: 'custitem_nssc_related_commerce_json'
                  });

                  var jsonData = JSON.parse(jsonRelatedCommerceCategoryList);

                // Update custitem_nssc_related_commerce_json field
                  if (context.type === context.UserEventType.EDIT) {
                      jsonData = (jsonData).map(function each(item) {
                          if (item.urlcomponent === urlComponentOld) {
                              item.urlcomponent = urlComponent;
                              item.name = name;
                              item.img = image;
                          }
                          return item;
                      });
                  } else if (context.type === context.UserEventType.DELETE) {
                    // Is Delete
                      jsonData.forEach(function each(item, i) {
                          if (item.urlcomponent === urlComponentOld) {
                              index = i;
                          }
                      });

                      if (index !== -1) {
                          delete jsonData[index];
                          jsonData = jsonData.filter(function each(item) {
                              if (item !== null) {
                                  return true;
                              }
                              return false;
                          });
                      }
                  }

                // Save item record
                  itemRecord.setValue({
                      fieldId: 'custitem_nssc_related_commerce_json',
                      value: JSON.stringify(jsonData),
                      ignoreFieldChange: true
                  });
                // PASO 4 Listo
                  itemRecord.save({
                      enableSourcing: true,
                      ignoreMandatoryFields: true
                  });
              });
          }
      };

      return {
          afterSubmit: function afterSubmit(context) {
              // Delete is never called
              if (context.type === context.UserEventType.DELETE ||
               context.type === context.UserEventType.EDIT) {
                  doAfterSubmit(context);
              }
              nLog.debug({
                  title: 'afterSubmit',
                  details: 'Esto se ejecuta luego del submit'
              });
          },

          beforeSubmit: function beforeSubmit() {
              nLog.debug({
                  title: 'beforeSubmit',
                  details: 'Esto se ejecuta antes del submit'
              });
          }
      };
  });
