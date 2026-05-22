define("SCTypeahead.TrendingSearchFeature.ServiceController", ["ServiceController", "SCTypeahead.TrendingSearchFeature.Model"], function(
    ServiceController,
    SCTypeaheadTrendingSearchFeatureModel
  ) {
    "use strict";
  
    return ServiceController.extend({
      name: "SCTypeahead.TrendingSearchFeature.ServiceController",
  
      get: function() 
      {
          var dataObject = {};
          dataObject['columns'] = this.request.getParameter('columns') && this.request.getParameter('columns').split(',');
          dataObject['recordType'] = this.request.getParameter('recordType');
          dataObject['recordLimit'] = this.request.getParameter('recordLimit');
  
          return SCTypeaheadTrendingSearchFeatureModel.get(dataObject);   
      },
  
      post: function() 
      {
          return SCTypeaheadTrendingSearchFeatureModel.update(this.data);
      }
  
    });
  });
