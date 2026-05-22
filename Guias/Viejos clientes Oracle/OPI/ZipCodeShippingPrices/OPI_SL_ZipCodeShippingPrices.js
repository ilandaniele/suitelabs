/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

// This script writes user and session information for the currently executing script to the response.
define(['N/search'], function(nSearch) {
    function onRequest(context) {
		
		var columns = new Array();
		// specify name as a search return column. There is no join set in this field.
		// This is the Name field as it appears on Item records.
		columns[0] = new nlobjSearchColumn('custrecord_orca_delivery_zip_code');
		columns[1] = new nlobjSearchColumn('custrecord_orca_delivery_shipping_cost');
		var filter = new nlobjSearchFilter('custrecord_orca_delivery_zip_code', null, 'is', zipCode);
		var searchresults = nlapiSearchRecord('customrecord_orca_delivery_shipping_cost', null, filter, columns);
		nlapiLogExecution('debug','results',searchresults);
		
		
        // var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
        // var userRole = runtime.getCurrentUser().role;
        // var currentSession = runtime.getCurrentSession();

        // Set the current sessions's scope
        currentSession.set({
            name: 'scope',
            value: 'global'
        });

        var sessionScope = runtime.getCurrentSession().get({
            name: 'scope'
        });

        context.response.write('Executing under role: ' + userRole
            + '. Session scope: ' + sessionScope + '.');
    }
    return {
        onRequest: onRequest
    };
});