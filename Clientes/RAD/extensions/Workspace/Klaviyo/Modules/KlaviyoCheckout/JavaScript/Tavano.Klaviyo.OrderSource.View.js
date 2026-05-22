define('Tavano.Klaviyo.OrderSource.View'
, [
    'Wizard.Module'

  , 'tavano_klaviyo_klaviyoordersource.tpl'
  ]
, function (
    WizardModule

  , tavano_klaviyo_klaviyoordersource
  )
{
  'use strict';

  return WizardModule.extend({

    template: tavano_klaviyo_klaviyoordersource,

   
    

   getContext: function getContext()
    {
      try{
          
        // if (this && this.model){
        //   var wizardModule = this.model;
        //   var options = wizardModule.get('options');
          

        //   options.custbody_tt_klaviyo_order_source = window.siteSource;

        //   wizardModule.set('options',options);
        // }
          
      }catch(e){
          // console.log("Klaviyo Error trying to set order source: ");
          console.log(e);
      }
        
      return {};
    }
  });
});
