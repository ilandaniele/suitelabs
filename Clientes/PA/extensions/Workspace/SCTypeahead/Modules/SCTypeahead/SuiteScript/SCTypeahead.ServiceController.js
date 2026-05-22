/*
	© 2019 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/


define('SCTypeahead.ServiceController', ['ServiceController', 'SCTypeahead.Model'], function(
  ServiceController,
  SCTypeaheadModel
) {

  return ServiceController.extend({

      name: 'SCTypeahead.ServiceController',

      get: function() 
      {
          var keyword = this.request.getParameter('keyword');

          if ( keyword && keyword.trim() !== "") 
          {
              return SCTypeaheadModel.getKeywordSuggestion( keyword );
          }

          return [];
      },

      options: function()
      {
        return {
          get: {
            jsonp_enabled: true
          }
        }
      }
  });
});
