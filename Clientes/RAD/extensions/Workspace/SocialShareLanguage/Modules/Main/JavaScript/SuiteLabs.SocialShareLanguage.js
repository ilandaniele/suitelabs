define('SuiteLabs.SocialShareLanguage', [
    'underscore',
    'SocialSharing',
    'Utils'
], function SocialShareLanguage(
    _,
    SocialSharing,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var PDPView = application.getComponent('PDP');
            var Layout = application.getLayout();

            if (!Utils.isPageGenerator() && PDPView) {
                Layout.once('afterAppendView',function(view){
                    setTimeout(function(){
                        var $socialShare = view.$el.find('.social-sharing-flyout-icons')
                        if ($socialShare.length > 0) {
                            $socialShare.find('.social-sharing-flyout-content-social-pinterest > span').text(_.translate('Share on Pinterest'));
                            $socialShare.find('.social-sharing-flyout-content-social-facebook > span').text(_.translate('Share on Facebook'));
                            $socialShare.find('.social-sharing-flyout-content-social-twitter > span').text(_.translate('Share on X'));
                        }
                    }, 1);
                });
            }

        }

    };

});
