define('AwaLabs.HeadContentByApplication', [
    'jQuery',
    'Utils'
], function AwaLabsHeadContentByApplication(
    jQuery
) {
    'use strict';

    function isOnCMS() {
        return (parent && parent.location && parent.location.href.match(/\/cms\/[0-9]\/admin\/cms/ig))
            || location.href.match(/\/cms\/[0-9]\/admin\/cms/ig);
    }

    return {
        mountToApp: function mountToApp(container) {
            var $head = jQuery('head');
            var environmentComponent = container.getComponent('Environment');
            var headHtml = environmentComponent.getConfig('HeadContentByApplication.' + SC.ENVIRONMENT.SCTouchpoint);
            var $headHtmlAdd;
            if (SC.ENVIRONMENT.jsEnvironment === 'browser' && !isOnCMS() && headHtml) {
                $headHtmlAdd = jQuery(headHtml);
                $head.append($headHtmlAdd);
            }
        }
    };
});
