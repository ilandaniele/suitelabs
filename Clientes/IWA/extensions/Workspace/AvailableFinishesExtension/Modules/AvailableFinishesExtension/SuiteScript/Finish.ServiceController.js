/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

define( 'Finish.ServiceController', [

		'ServiceController',
		'Application',
		'Finish.Model'

], function (

    ServiceController,
    Application,
    FinishModel

) {
    'use strict';

    // @extend ServiceController
    return ServiceController.extend( {

        // @property {String} name Mandatory for all ssp-libraries model
        name: 'Finish.ServiceController',


        // @method get The call to Address.Service.ss with http method 'get' is managed by this function
        get: function () {
            var id = this.request.getParameter( 'internalid' );
            return FinishModel.get( id );
        }
    } );
} );
