/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/task',
      'N/log'
  ], function CommerceCategoriesUE(
    nRecord,
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
          var image = '';
          var imageOld = '';
          var mrTask = {};

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

          nLog.debug({
              title: 'Related Category ID',
              details: categoryID
          });

        // STEP 2: Trigger Map/Reduce for updating related Items
          if (!(context.type === context.UserEventType.EDIT &&
              urlComponent === urlComponentOld &&
              name === nameOld &&
              image === imageOld)) {
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
                          image: image,
                          imageOld: imageOld
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
