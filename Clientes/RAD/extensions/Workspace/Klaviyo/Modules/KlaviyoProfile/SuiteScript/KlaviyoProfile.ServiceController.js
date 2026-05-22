define("Tavano.Klaviyo.KlaviyoProfile.ServiceController", ["ServiceController"], function(
  ServiceController
) {
  "use strict";

  return ServiceController.extend({
    name: "Tavano.Klaviyo.KlaviyoProfile.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      try{

        var klaviyo_session = nlapiGetWebContainer().getShoppingSession();
        var kalviyo_customer = klaviyo_session.getCustomer();
        
        var klaviyo_field_values = kalviyo_customer.getFieldValues(["email","firstname","lastname"]);

        

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
