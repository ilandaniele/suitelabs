define('Tavano.Klaviyo.AddOrderSource.Checkout'
, [
    'Tavano.Klaviyo.OrderSource.View'
  ]
,   function
  (
    TavanoKlaviyoOrderSourceView
  )
{
  'use strict';


  var TavanoKlaviyoAddOrderSource = {

    addOrderSourceModule : function(checkout,environment_component){

        // // ----------------------------------------
        // // Add source origin to environment
        // // We allow up to 5 sites
        // // ----------------------------------------


        // var siteSource = environment_component.getConfig('Klaviyo.websource');
        
        
        

        // if (siteSource && siteSource.length > 0) 
        //     siteSource = siteSource[0]

        // var siteSourceValue;

        // switch(siteSource) {
        //     case "Site A":
        //         siteSourceValue = "1";
        //       break;
        //       case "Site B":
        //         siteSourceValue = "2";
        //       break;
        //       case "Site C":
        //         siteSourceValue = "3";
        //       break;
        //       case "Site D":
        //         siteSourceValue = "4";
        //       break;
        //       case "Site E":
        //         siteSourceValue = "5";
        //       break;
        //     default:
        //         siteSourceValue = "1";
        //   }

        // window.siteSource = siteSourceValue;


        // try{

        //     checkout.addModuleToStep(
        //         {
        //             step_url: 'opc'
        //             , module: {
        //                 id: 'TavanoKlaviyoOrderSourceView'
        //                 , index: 6
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });
        
        //         checkout.addModuleToStep(
        //         {
        //             step_url: 'review'
        //             , module: {
        //                 id: 'Tavano.KlaviyoOrderSourceView'
        //                 , index: 99
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });

        // }catch(e){

        // }
    }
 }


  return TavanoKlaviyoAddOrderSource

});


