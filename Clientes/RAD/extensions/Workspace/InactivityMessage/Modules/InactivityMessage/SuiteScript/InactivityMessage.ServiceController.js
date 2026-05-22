define('InactivityMessage.ServiceController', [
    'ServiceController'
], function InactivityMessageServiceController(
    ServiceController
) {
    'use strict';

    function service(request, response) {
        var currentUrl = request.getURL();
        var domain;
        var absoluteUrl;
        if (currentUrl.match(/^[https]+:\/\//)) {
            response.write(nlapiGetWebContainer().getShoppingSession().isLoggedIn2());
        } else {
            domain = session.getAbsoluteUrl('checkout', '');
            absoluteUrl = session.getAbsoluteUrl('checkout', '{{placeholder}}');
            absoluteUrl = absoluteUrl
                .replace(/^\//, '')
                .replace('/services/', '/')
                .replace('{{placeholder}}', 'services/CheckSession.Service.ss');

            absoluteUrl = domain + absoluteUrl;
            response.write(
                nlapiRequestURL(absoluteUrl, {}, request.getAllHeaders()).getBody()
            );
        }
    }

    return ServiceController.extend({
        name: 'InactivityMessage.ServiceController',
        get: function get() {
            return service(this.request, this.response);
        }
    });
});
