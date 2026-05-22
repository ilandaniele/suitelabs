/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/file',
      'N/task',
      'N/log'
  ], function CommerceCategoriesUE(
    nRecord,
    nFile,
    nTask,
    nLog
    ) {
      'use strict';

      var doAfterSubmit = function doAfterSubmit(context) {
        // STEP 1: Get Category ID from context
          var categoryRecord = context.newRecord;
          var categoryID = '';
          var categoryRecordOld = context.oldRecord;

          var urlComponent = '';
          var urlComponentOld = '';
          var name = '';
          var nameOld = '';
          var imageRecord = {};
          var imageRecordOld = {};
          var mrTask = {};
          var urlsCount = 0;

        // I don't need to load the category records because they are already loaded

        // Obtain record data
          categoryID = categoryRecord.getValue({
              fieldId: 'id'
          });

          urlsCount = categoryRecord.getLineCount({
              sublistId: 'urls'
          });

          urlComponent = urlsCount > 0 ? categoryRecord.getSublistValue({
              sublistId: 'urls',
              fieldId: 'fullurl',
              line: 0
          }) : '';

          urlsCount = categoryRecordOld.getLineCount({
              sublistId: 'urls'
          });

          urlComponentOld = urlsCount > 0 ? categoryRecordOld.getSublistValue({
              sublistId: 'urls',
              fieldId: 'fullurl',
              line: 0
          }) : '';

          name = categoryRecord.getValue({
              fieldId: 'name'
          });

          nameOld = categoryRecordOld.getValue({
              fieldId: 'name'
          });

          imageRecord.id = categoryRecord.getValue({
              fieldId: 'thumbnail'
          });

          try {
              imageRecord = nFile.load({
                  id: imageRecord.id
              });
          } catch (e) {
              imageRecord.url = '';
          }

          imageRecordOld.id = categoryRecordOld.getValue({
              fieldId: 'thumbnail'
          });

          try {
              imageRecordOld = nFile.load({
                  id: imageRecordOld.id
              });
          } catch (e) {
              imageRecordOld.url = '';
          }

          nLog.debug({
              title: 'Related Category ID',
              details: categoryID
          });

        // STEP 2: Trigger Map/Reduce for updating related Items
          if (context.type === context.UserEventType.EDIT &&
              !(urlComponent === urlComponentOld &&
              name === nameOld &&
              imageRecord.url === imageRecordOld.url)) {
              mrTask = nTask.create({
                  taskType: nTask.TaskType.MAP_REDUCE,
                  scriptId: 'customscript_nsc_related_categories_mr',
                  deploymentId: 'customdeploy_nsc_related_categories_mr',
                  params: {
                      custscript_related_category_id: categoryID,
                      custscript_related_category_values: JSON.stringify({
                          urlComponent: urlComponent,
                          urlComponentOld: urlComponentOld,
                          name: name,
                          nameOld: nameOld,
                          imageUrl: imageRecord.url,
                          imageOldUrl: imageRecordOld.url
                      })
                  }
              });
              mrTask.submit();
          }
      };

      return {
          afterSubmit: function afterSubmit(context) {
              if (context.type === context.UserEventType.EDIT) {
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
