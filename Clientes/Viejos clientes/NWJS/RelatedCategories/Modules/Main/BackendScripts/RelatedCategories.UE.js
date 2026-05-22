/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/file',
      'N/log'
  ], function RelatedCategoriesUE(
    nRecord,
    nFile,
    nLog
    ) {
      'use strict';

      var flat = function flat(data) {
          data.jsonData = data.jsonData.filter(function each(item) {
              if (item !== null) {
                  return true;
              }
              return false;
          });
          return data.jsonData;
      };

      var onDelete = function onDelete(dataNew, dataOld) {
          var printData = '';
          var index = -1;

          dataNew.jsonData.forEach(function each(item, i) {
              if (item.urlcomponent === dataOld.url) {
                  index = i;
              }
          });

          if (index !== -1) {
              delete dataNew.jsonData[index];
              dataNew.jsonData = flat(dataNew);

              printData = JSON.stringify(dataNew.jsonData);
              printData = printData === '[]' ? '' : printData;

              dataOld.itemRecord.setValue({
                  fieldId: 'custitem_nssc_related_commerce_json',
                  value: printData,
                  ignoreFieldChange: true
              });
              dataOld.itemRecord.save({
                  enableSourcing: true,
                  ignoreMandatoryFields: true
              });
          }
          return true;
      };

      var loadItemRecord = function loadItemRecord(id) {
          var record = null;
          [nRecord.Type.INVENTORY_ITEM, nRecord.Type.NON_INVENTORY_ITEM, nRecord.Type.ASSEMBLY_ITEM].forEach(function itemTypes(itemType) {
              if (record === null) {
                  try {
                      record = nRecord.load({
                          type: itemType,
                          id: id,
                          isDynamic: true
                      });
                  } catch (e) {
                      record = null;
                  }
              }
          });
          return record;
      };

      var onEdit = function onEdit(dataNew, dataOld) {
          var found = false;
          var printData = '';


          if (dataNew.itemID === dataOld.itemID) {
              dataNew.jsonData = (dataNew.jsonData).map(function each(item) {
                  if (item.urlcomponent === dataOld.url) {
                      item.urlcomponent = dataNew.url;
                      item.name = dataNew.name;
                      item.img = dataNew.imageRecord.url;
                      found = true;
                  }
                  return item;
              });
          } else if (dataNew.itemID !== '') {
              // Delete the category from the old item record
              onDelete(dataNew, dataOld);

                  // Add the category to the new item record
              try {
                  dataNew.jsonData = (dataNew.jsonData).map(function each(item) {
                      if (item.urlcomponent === dataNew.url) {
                          item.name = dataNew.name;
                          item.img = dataNew.imageRecord.url;
                          found = true;
                      }
                      return item;
                  });
              } catch (e) {
                  dataNew.jsonData = [];
              }
          }

          if (!found) {
              dataNew.jsonData.push({
                  urlcomponent: dataNew.url,
                  name: dataNew.name,
                  img: dataNew.imageRecord.url
              });
          }

          printData = JSON.stringify(dataNew.jsonData);
          printData = printData === '[]' ? '' : printData;

          dataNew.itemRecord.setValue({
              fieldId: 'custitem_nssc_related_commerce_json',
              value: printData,
              ignoreFieldChange: true
          });

          dataNew.itemRecord.save({
              enableSourcing: true,
              ignoreMandatoryFields: true
          });
          return true;
      };

      var onCreate = function onCreate(data) {
          var found = false;
          var printData = '';

          try {
              data.jsonData = (data.jsonData).map(function each(item) {
                  if (item.urlcomponent === data.url) {
                      item.name = data.name;
                      item.img = data.imageRecord.url;
                      found = true;
                  }
                  return item;
              });
          } catch (e) {
              data.jsonData = [];
          }

          if (!found) {
              data.jsonData.push({
                  urlcomponent: data.url,
                  name: data.name,
                  img: data.imageRecord.url
              });
          }

          printData = JSON.stringify(data.jsonData);
          if (printData === '[]') {
              printData = '';
          }

          data.itemRecord.setValue({
              fieldId: 'custitem_nssc_related_commerce_json',
              value: printData,
              ignoreFieldChange: true
          });

          data.itemRecord.save({
              enableSourcing: true,
              ignoreMandatoryFields: true
          });

          return true;
      };

      var doAfterSubmit = function doAfterSubmit(context) {
          var objectRecord = context.newRecord;
          var objectRecordOld = context.oldRecord;

          var dataNew = {
              url: '',
              name: '',
              imageRecord: {},
              itemID: '',
              itemRecord: {},
              categoryID: '',
              categoryRecord: {},
              jsonData: [],
              jsonRelatedCommerceCategoryList: ''
          };

          var dataOld = {
              url: '',
              itemID: '',
              itemRecord: {},
              categoryID: '',
              categoryRecord: {},
              jsonData: [],
              jsonRelatedCommerceCategoryList: ''
          };

          var urlsCount = 0;

          // Obtain item and category ids from new record
          dataNew.itemID = objectRecord.getValue({
              fieldId: 'custrecord_nssc_item'
          });

          dataNew.categoryID = objectRecord.getValue({
              fieldId: 'custrecord_nssc_commerce_category'
          });

          // If it's delete call then it will crash
          // We can not ask for jsonRelatedCommerceCategoryList if it's delete
          if (dataNew.itemID !== '') {
              // IF this happens then it is not delete, it's edit

              dataNew.itemRecord = loadItemRecord(dataNew.itemID);

              if (dataNew.itemRecord === null) {
                  // There is no more to do, if it's delete call it will break since old record has something
                  return true;
              }
              // get Item value for RELATED COMMERCE CATEGORY LIST JSON
              dataNew.jsonRelatedCommerceCategoryList = dataNew.itemRecord.getValue({
                  fieldId: 'custitem_nssc_related_commerce_json'
              });
              try {
                  dataNew.jsonData = JSON.parse(dataNew.jsonRelatedCommerceCategoryList);
              } catch (e) {
                  dataNew.jsonData = [];
              }
          }

          // Load Commerce Category record for current categoryID
          dataNew.categoryRecord = nRecord.load({
              type: nRecord.Type.COMMERCE_CATEGORY,
              id: dataNew.categoryID,
              isDynamic: true
          });

        // get Category Values for NAME, URL FRAGMENT, THUMBNAIL IMAGE

          urlsCount = dataNew.categoryRecord.getLineCount({
              sublistId: 'urls'
          });

          dataNew.url = urlsCount > 0 ? dataNew.categoryRecord.getSublistValue({
              sublistId: 'urls',
              fieldId: 'fullurl',
              line: 0
          }) : '';

          dataNew.name = dataNew.categoryRecord.getValue({
              fieldId: 'name'
          });

          dataNew.imageRecord.id = dataNew.categoryRecord.getValue({
              fieldId: 'thumbnail'
          });

          dataNew.imageRecord = nFile.load({
              id: dataNew.imageRecord.id
          });


          // Obtain item and category ids from old record
          if (context.type === context.UserEventType.EDIT) {
              dataOld.itemID = objectRecordOld.getValue({
                  fieldId: 'custrecord_nssc_item'
              });

              dataOld.categoryID = objectRecordOld.getValue({
                  fieldId: 'custrecord_nssc_commerce_category'
              });

              dataOld.itemRecord = loadItemRecord(dataOld.itemID);

              dataOld.categoryRecord = nRecord.load({
                  type: nRecord.Type.COMMERCE_CATEGORY,
                  id: dataOld.categoryID,
                  isDynamic: true
              });

              urlsCount = dataOld.categoryRecord.getLineCount({
                  sublistId: 'urls'
              });

              dataOld.url = urlsCount > 0 ? dataOld.categoryRecord.getSublistValue({
                  sublistId: 'urls',
                  fieldId: 'fullurl',
                  line: 0
              }) : '';


              // get Item value for RELATED COMMERCE CATEGORY LIST JSON
              dataOld.jsonRelatedCommerceCategoryList = dataOld.itemRecord.getValue({
                  fieldId: 'custitem_nssc_related_commerce_json'
              });
              try {
                  dataOld.jsonData = JSON.parse(dataOld.jsonRelatedCommerceCategoryList);
              } catch (e) {
                  dataOld.jsonData = [];
              }

              if (dataNew.itemID === '') {
                  onDelete(dataOld, dataOld);
              } else {
                  onEdit(dataNew, dataOld);
              }
          } else if (context.type === context.UserEventType.CREATE) {
              onCreate(dataNew);
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

              // Delete call: will never get here, since it deassociates a related category from an inventory item
              // CREATE call: old record does not exist
              // EDIT call: two types -> edit delete: old record has item associated and new record has null as item associated
              // -> edit: edit
              if (context.type === context.UserEventType.CREATE ||
              context.type === context.UserEventType.EDIT) {
                  doAfterSubmit(context);
              }
              nLog.debug({
                  title: 'afterSubmit',
                  details: 'This is executed after submit'
              });
          },

          beforeSubmit: function beforeSubmit() {
              nLog.debug({
                  title: 'beforeSubmit',
                  details: 'This is executed before submit'
              });
          }
      };
  });
