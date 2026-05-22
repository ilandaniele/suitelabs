/*
    © 2021 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.CookieModalConfirmation.Main', [
    'CookieModalConfirmation.View'
], function NSeCommCookieModalConfirmationMain (
    CookieModalConfirmationView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            // var isEnable = false;
            var isEnable = environment.getConfig('cookieModalConfirmationBanner.enable');
            // var cookieName = environment.getConfig('cookieModalConfirmationBanner.cookieName');
            var cookieName = 'NSeCommCookieModalConfirmation'; // The cookie name

            var _getCookie = function (cname) {
                var name = cname + '=';
                var ca = document.cookie.split(';');

                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }

                }

            }

            var _showModalConfirmation = function () {
                if (_getCookie(cookieName)) {
                    return false;
                } else {
                    return true;
                }
            }

            if (_showModalConfirmation() && isEnable) {
                if (layout) {
                    var cookieModalView = new CookieModalConfirmationView ({
                        container: container
                    })
                    layout.on('afterShowContent', function() {
                        layout.showContent(cookieModalView, {
                            showInModal: true,
                            options: {
                                className: 'cookie-modal-confirmation',
                                modalOptions: {
                                    keyboard: false,
                                    backdrop: 'static'
                                }
                            }
                        });
                    });
                }
            }
        }
    };
});
