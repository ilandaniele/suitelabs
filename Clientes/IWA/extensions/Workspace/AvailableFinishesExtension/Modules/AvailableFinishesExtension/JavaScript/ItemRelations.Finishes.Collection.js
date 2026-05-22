/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module Finishes
define( 'ItemRelations.Finishes.Collection', [

	'Backbone',
	'underscore',
	'Utils'

], function (

    Backbone, _, Utils

) {
    'use strict';

    // @extend Backbone.Model
    return Backbone.Collection.extend( {

        initialize: function ( options ) {

            this.internalid = options.internalid;

        },

        //@property {String} urlRoot
        url: function () {
            return Utils.getAbsoluteUrl( 
                getExtensionAssetsPath('services/Finishes.Service.ss' )) + '?n=' + SC.ENVIRONMENT.siteSettings.siteid + '&internalid=' + this.internalid;
        },

        parse: function ( response ) {

            this.itemsIds = response;

            return response;

        }

    } );
} );
