/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/record',
      'N/file',
      'N/log',
      'N/util'
  ], function LocationInventoryUE(
    nRecord,
    nFile,
    nLog,
    nUtil
    ) {
      'use strict';

      var doAfterSubmit = function doAfterSubmit(context) {
          var objectRecord = context.newRecord;

          var tableArray = [];
          var tableString = '';
          var tableExists = false;
          var quantity = 0;

          var title = objectRecord.getValue({
              fieldId: 'custitem_csgscr_inv_details'
          });

          var tableStringInitial = objectRecord.getValue({
              fieldId: 'custitem_csgscr_inv_all_locs'
          });

          nLog.debug('table string Initial', tableStringInitial);

          tableArray.push(
              {
                  fieldId: 'custitem_csgscr_inv_loc_one',
                  name: 'SUMC'
              },
              {
                  fieldId: 'custitem_csgscr_inv_loc_two',
                  name: 'Medical'
              },
              {
                  fieldId: 'custitem_csgscr_inv_loc_three',
                  name: 'McKale'
              },
              {
                  fieldId: 'custitem_csgscr_inv_loc_four',
                  name: 'Threads'
              },
              {
                  fieldId: 'custitem_csgscr_inv_loc_five',
                  name: 'Biosphere'
              },
              {
                  fieldId: 'custitemcsgscr_inv_loc_six',
                  name: 'Flandrau'
              },
              {
                  fieldId: 'custitem_csgscr_inv_loc_seven',
                  name: 'Souvenirs'
              }
          );


          tableString = '<strong>' + title + '</strong></br><table style="border-collapse: collapse; width: 30%;" border="1">';

          nUtil.each(tableArray, function forEach(value) {
              quantity = objectRecord.getValue({
                  fieldId: value.fieldId
              });
              nLog.debug('quantity', quantity);

              if (quantity > 0) {
                  tableString += '<tr><td style="width: 70%;"><strong>' + value.name + '</strong></td>' +
                  '<td style="width: 30%;"><strong>' + quantity + '</strong></td></tr>';
                  tableExists = true;
              }
          });

          tableString += '</table>';

          if (tableExists) {
              nLog.debug('table string', tableString);
              objectRecord.setValue({
                  fieldId: 'custitem_csgscr_inv_all_locs',
                  value: tableString,
                  ignoreFieldChange: true
              });
          }

          return true;
      };

      return {
          afterSubmit: function afterSubmit(context) {
              if (context.type === context.UserEventType.EDIT || context.type === context.UserEventType.CREATE || 
			  context.type === context.UserEventType.ORDERITEMS) {
                  doAfterSubmit(context);
              }

              nLog.debug({
                  title: 'afterSubmit',
                  details: 'This is executed after submit'
              });
          }
      };
  });
