/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/log'
  ], function RelatedCategoriesUE(
    nRecord,
    nLog
    ) {
      'use strict';

      var loadItemRecord = function loadItemRecord(itemID) {
          var itemRecord = null;

          try {
              itemRecord = nRecord.load({
                  type: nRecord.Type.INVENTORY_ITEM,
                  id: itemID,
                  isDynamic: true
              });
          } catch (e) {
              itemRecord = null;
          }

          if (itemRecord === null) {
              try {
                  itemRecord = nRecord.load({
                      type: nRecord.Type.NON_INVENTORY_ITEM,
                      id: itemID,
                      isDynamic: true
                  });
              } catch (e) {
                  itemRecord = null;
              }
          }

          if (itemRecord === null) {
              try {
                  itemRecord = nRecord.load({
                      type: nRecord.Type.ASSEMBLY_ITEM,
                      id: itemID,
                      isDynamic: true
                  });
              } catch (e) {
                  itemRecord = null;
              }
          }

          return itemRecord;
      };

      // var onEdit = function onEdit() {
          // @TODO
          // Move if (context.type === context.UserEventType.EDIT) logig here
      // };

      // var onCreate = function onCreate() {
          // @TODO
      // };

      var doAfterSubmit = function doAfterSubmit(context) {
          var objectRecord = context.newRecord;
          var objectRecordOld = context.oldRecord;

          var itemID = '';
          var itemIDOld = '';

          var categoryID = '';
          var categoryIDOld = '';

          var itemRecord = {};
          var itemRecordOld = {};

          var categoryRecord = {};
          var categoryRecordOld = {};

          var name = '';
          var urlComponent = '';
          var image = '';

          var urlComponentOld = '';

          var jsonRelatedCommerceCategoryList = '';
          var jsonRelatedCommerceCategoryListOld = '';
          var jsonData = [];
          var jsonDataOld = [];

          // I don't need JSON data from old record, it ends up being the same on the calls.

          var jsonValue = {};
          var printData = '';
          var found = false;
          var index = -1;

          // Obtain item and category ids from new record
          itemID = objectRecord.getValue({
              fieldId: 'custrecord_nssc_item'
          });

          categoryID = objectRecord.getValue({
              fieldId: 'custrecord_nssc_commerce_category'
          });

          if (itemID !== '') {
              // IF this happens then it is not delete, it's edit

              itemRecord = loadItemRecord(itemID);

              if (itemRecord === null) {
                  return true;
              }
              // get Item value for RELATED COMMERCE CATEGORY LIST JSON
              jsonRelatedCommerceCategoryList = itemRecord.getValue({
                  fieldId: 'custitem_nssc_related_commerce_json'
              });
              try {
                  jsonData = JSON.parse(jsonRelatedCommerceCategoryList);
              } catch (e) {
                  jsonData = [];
              }
          }

            // Load Commerce Category record for current categoryID
          categoryRecord = nRecord.load({
              type: nRecord.Type.COMMERCE_CATEGORY,
              id: categoryID,
              isDynamic: true
          });

          // get Category Values for NAME, URL FRAGMENT, THUMBNAIL IMAGE
          urlComponent = categoryRecord.getValue({
              fieldId: 'urlfragment'
          });

          name = categoryRecord.getValue({
              fieldId: 'name'
          });

          image = categoryRecord.getValue({
              fieldId: 'thumbnail'
          });

          // Obtain item and category ids from old record
          if (context.type !== context.UserEventType.CREATE) {
              itemIDOld = objectRecordOld.getValue({
                  fieldId: 'custrecord_nssc_item'
              });

              categoryIDOld = objectRecordOld.getValue({
                  fieldId: 'custrecord_nssc_commerce_category'
              });

              // @TODO Get Item type for loading the Item Record.
              itemRecordOld = loadItemRecord(itemIDOld);

              categoryRecordOld = nRecord.load({
                  type: nRecord.Type.COMMERCE_CATEGORY,
                  id: categoryIDOld,
                  isDynamic: true
              });

              urlComponentOld = categoryRecordOld.getValue({
                  fieldId: 'urlfragment'
              });

              // get Item value for RELATED COMMERCE CATEGORY LIST JSON
              jsonRelatedCommerceCategoryListOld = itemRecordOld.getValue({
                  fieldId: 'custitem_nssc_related_commerce_json'
              });
              try {
                  jsonDataOld = JSON.parse(jsonRelatedCommerceCategoryListOld);
              } catch (e) {
                  jsonDataOld = [];
              }
          }

          // Structure to add to the JSON
          jsonValue = {
              urlcomponent: urlComponent,
              name: name,
              img: image
          };

          // Cases
          if (context.type === context.UserEventType.EDIT) {
              if (itemID === '') {
                  // is delete, itemID == ''
                  jsonDataOld.forEach(function each(item, i) {
                      if (item.urlcomponent === urlComponentOld) {
                          index = i;
                      }
                  });

                  if (index !== -1) {
                      delete jsonDataOld[index];
                      jsonDataOld = jsonDataOld.filter(function each(item) {
                          if (item !== null) {
                              return true;
                          }
                          return false;
                      });

                      printData = JSON.stringify(jsonDataOld);
                      if (printData === '[]') {
                          printData = '';
                      }

                      itemRecordOld.setValue({
                          fieldId: 'custitem_nssc_related_commerce_json',
                          value: printData,
                          ignoreFieldChange: true
                      });
                      // PASO 4 Listo
                      itemRecordOld.save({
                          enableSourcing: true,
                          ignoreMandatoryFields: true
                      });
                  }
              } else {
                  // Item ID of new record is equal to Item ID of old record
                  if (itemID === itemIDOld) {
                      // category of new record is equal to category of old record
                      // case if category of new record is equal to category of old record
                      // case if name, img, and component are equals

                      // As it is EDIT, it will always bring old record
                      // Works even if category from old record is different than category from new record
                      jsonData = (jsonData).map(function each(item) {
                          if (item.urlcomponent === urlComponentOld) {
                              item.urlcomponent = urlComponent;
                              item.name = name;
                              item.img = image;
                              found = true;
                          }
                          return item;
                      });
                  } else if (itemID !== '') {
                      // Delete the category from the old item record

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

                          printData = JSON.stringify(jsonData);
                          if (printData === '[]') {
                              printData = '';
                          }

                          itemRecordOld.setValue({
                              fieldId: 'custitem_nssc_related_commerce_json',
                              value: printData,
                              ignoreFieldChange: true
                          });
                          // PASO 4 Listo
                          itemRecordOld.save({
                              enableSourcing: true,
                              ignoreMandatoryFields: true
                          });
                      }

                          // Add the category to the new item record
                      try {
                          jsonData = (jsonData).map(function each(item) {
                              if (item.urlcomponent === urlComponent) {
                                  item.name = name;
                                  item.img = image;
                                  found = true;
                              }
                              return item;
                          });
                      } catch (e) {
                          jsonData = [];
                      }
                  }

                  if (!found) {
                      jsonData.push(jsonValue);
                  }

                  printData = JSON.stringify(jsonData);
                  if (printData === '[]') {
                      printData = '';
                  }

                  itemRecord.setValue({
                      fieldId: 'custitem_nssc_related_commerce_json',
                      value: printData,
                      ignoreFieldChange: true
                  });

                  itemRecord.save({
                      enableSourcing: true,
                      ignoreMandatoryFields: true
                  });
              }
          } else if (context.type === context.UserEventType.CREATE) {
              try {
                  jsonData = (jsonData).map(function each(item) {
                      if (item.urlcomponent === urlComponent) {
                          item.name = name;
                          item.img = image;
                          found = true;
                      }
                      return item;
                  });
              } catch (e) {
                  jsonData = [];
              }

              if (!found) {
                  jsonData.push(jsonValue);
              }

              printData = JSON.stringify(jsonData);
              if (printData === '[]') {
                  printData = '';
              }

              itemRecord.setValue({
                  fieldId: 'custitem_nssc_related_commerce_json',
                  value: printData,
                  ignoreFieldChange: true
              });

              itemRecord.save({
                  enableSourcing: true,
                  ignoreMandatoryFields: true
              });
          }
          return true;
      };

      return {
          afterSubmit: function afterSubmit(context) {
              nLog.debug({
                  title: 'newRecord',
                  details: context.newRecord
              });
              nLog.debug({
                  title: 'oldRecord',
                  details: context.oldRecord
              });

              // Delete call will never get here, since it deassociates a related category from an inventory item
              // it is an EDIT call, not a DELETE call, and old record has item associated and new record has null as item associated
              // Las llamadas van a ser edits de dos tipos, una de delete y otra de edit
              if (context.type === context.UserEventType.CREATE ||
              context.type === context.UserEventType.EDIT) {
                  // En create no viene old record FIX

                  // CASO DE EDIT en el custom del item, que saco una categoria y pongo otra osea oldRecord y newRecord
                  // if (EDIT -> ) {
                  //     if la category del oldRecord es diferente de la category del newRecord
                  //           1. quitar la vieja category de la estrucutra
                  //           2. agregar la nueva category a la estrucutra
                  //     if el item (el producto) del oldRecord es diferente del item del newRecord
                  //           1. quitar la category de la estructura del item en el oldRecord
                  //           2. agregar la category a la estructura del item en el newRecord
                  // }


                  // REFACTOR: dividir en casos, si es edit con item en vacio, es un delete, etc
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
