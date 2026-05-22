define("Tavano.Klaviyo.Klaviyo.ServiceController", ["ServiceController"], function(
  ServiceController
) {
  "use strict";

  return ServiceController.extend({
    name: "Tavano.Klaviyo.Klaviyo.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {

      try{

        var klaviyo_session = nlapiGetWebContainer().getShoppingSession();
        var kalviyo_customer = klaviyo_session.getCustomer();
        
        var klaviyo_field_values = kalviyo_customer.getFieldValues(["email","firstname","lastname"]);

        nlapiLogExecution("DEBUG","klaviyo_field_values",JSON.stringify(klaviyo_field_values))

        return JSON.stringify({
          "email":klaviyo_field_values.email,
          "firstname":klaviyo_field_values.firstname,
          "lastname":klaviyo_field_values.lastname,
        })

      }catch(e){

        return JSON.stringify({
          message: "Error in Extension"
        });
      }
      


      return JSON.stringify({
        message: "Hello World I'm an Extension using a Service!"
      });
    },

    post: function post() {
      // not implemented
    },

    put: function put() {
      // not implemented
    },

    delete: function() {
      // not implemented
    }
  });
});
