/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

define(['N/search', 'N/log', 'N/runtime'], function (nSearch, nLog, nRuntime) {
    function validateLine (context) {
        try {
            console.log('running validate line');
            nLog.error({
                title: 'validateLine',
                details: context
            });
            return true;
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