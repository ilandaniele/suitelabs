/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Address.js
// ----------
// Handles fetching, creating and updating addresses
// @module Address
define( 'Finish.Model', [

	'SC.Model',
	'SC.Models.Init',
	'Application',
	'Backbone.Validation',
	'underscore'
], function (

    SCModel,
    ModelsInit,
    Application,
    BackboneValidation,
    _
) {
    'use strict';

    // @class Address.Model Defines the model used by the Address frontent module.
    // @extends SCModel
    return SCModel.extend( {

        name: 'FinishModel',

        get: function ( id ) {

            var result = [];
            var filters = [
				new nlobjSearchFilter( 'custrecord_availablefinishitemfinishof', null, 'is', id )
			];

            var columns = [
				new nlobjSearchColumn( 'custrecord_availablefinishitem' )
			];

            items_search = Application.getAllSearchResults( 'customrecord_availablefinish', filters, columns );

            _.each( items_search, function ( item ) {

                result.push( item.getValue( 'custrecord_availablefinishitem' ) );

            } );

            return result;

        }
    } );

} );

//@class Address.Data.Model This is the model to send address to the backend
