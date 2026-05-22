define('VelaroChat',
    [
        'SC.Configuration',
        'jQuery'
    ],
    function (
        Configuration,
        jQuery
) {
        var VelaroChat = {

            loadScript: function loadVelaroChat() {
                var v;
                var siteId = Configuration.get('velarochat.siteid');
                var groupId = Configuration.get('velarochat.groupid');
                // var self = this;
                return SC.ENVIRONMENT.jsEnvironment === 'browser' && (function () {
                    var w = window; var d = document;
                    var s;
                    var x;
                    if (w.Velaro) { return; }
                    v = function () { return v.c(arguments); };
                    v.q = []; v.c = function (args) { v.q.push(args); }; w.Velaro = v;
                    v.endpoints = {
                        mainApi: 'https://api-main-us-east.velaro.com/',
                        cdn: 'https://eastprodcdn.azureedge.net/'
                    };
                    if (siteId && groupId) {
                        s = d.createElement('script');
                        s.type = 'text/javascript';
                        s.async = true;
                        s.src = v.endpoints.cdn + 'widgets/shim';
                        x = d.getElementsByTagName('script')[0];
                        x.parentNode.insertBefore(s, x);
                    }
                    // eslint-disable-next-line
                    Velaro('boot', {
                        siteId: siteId,
                        groupId: groupId

                    });
                }());
            },

            mountToApp: function (application) {
                if (!SC.isPageGenerator()) {
                    application.getLayout().once('afterAppendView', jQuery.proxy(VelaroChat, 'loadScript'));
                }
            }
        };

        return VelaroChat;
    });

/*
    <script>
    (function () {
        var w = window; var d = document;
        if (w.Velaro) { return; }
        var v = function () { return v.c(arguments) };
        v.q = []; v.c = function (args) { v.q.push(args) }; w.Velaro = v;
        v.endpoints = {
            mainApi: 'https://api-main-us-east.velaro.com/',
            cdn: 'https://eastprodcdn.azureedge.net/'
        };
        w.addEventListener('load', function () {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = v.endpoints.cdn + 'widgets/shim';
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        });

        Velaro('boot', {
            siteId: 20957,
            groupId: 6929,
            // customVars are optional.

        });
    }());
</script> */
