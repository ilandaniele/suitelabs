// @module Tavano.Klaviyo.Checkout.Profile.Model
define(
	'Tavano.Klaviyo.Checkout.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});
