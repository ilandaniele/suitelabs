/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/search', 'N/log', 'N/runtime'], (nSearch, nLog, nRuntime) => {
    function validateLine (context) {
        try {
            console.log('running validate line');
            nLog.debug({
                title: 'validateLine',
                details: context
            });
        } catch (e) {
            nLog.error({
                title: 'Error',
                details: e
            });
      // alert(e);
            return true;
        }
  }
  return {
    validateLine: validateLine
  };
});