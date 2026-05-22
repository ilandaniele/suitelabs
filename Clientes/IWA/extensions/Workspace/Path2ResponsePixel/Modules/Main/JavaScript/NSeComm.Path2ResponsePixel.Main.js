/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.Path2ResponsePixel.Main', [
    'jQuery'
],
function Path2ResponsePixel(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var url = environment.getConfig('pathTwoResponse.url');

            if (layout) {
                layout.on('afterShowContent', function path2ResponsePixel() {
                    jQuery('#path2ResponsePixel').remove();
                    jQuery('#main').append('<img id="path2ResponsePixel" height="1" width="1" class="hide" src="' + url + '"/>');
                });
            }
        }
    };
});
