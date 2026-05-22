define('CustomLogin.View', [
    'customlogin.tpl',
    'SCView'
], function CustomLoginViewModule(
    customloginTpl,
    SCViewComponent
) {
    'use strict';
 
    var SCView = SCViewComponent.SCView;
 
    function CustomLoginView(options) {
        SCView.call(this);
        this.options = options || {};
        this.container = options.container;
        this.template = customloginTpl;
    }
 
    CustomLoginView.prototype = Object.create(SCView.prototype);
 
    // Restore the constuctor.
    CustomLoginView.prototype.constructor = CustomLoginView;
 
    CustomLoginView.prototype.getContext = function getContext() {
        var env = this.container.getComponent('Environment');
        var ssoURL = env.getConfig('extensions.sso.url');
        var isSSOEnabled = env.getConfig('extensions.sso.enabled');
        var loginTitle = env.getConfig('extensions.sso.logintitle');
        var loginMessage = env.getConfig('extensions.sso.loginmessage');
        var loginButtonLabel = env.getConfig('extensions.sso.loginbuttonlabel');

        return {
            isSSOEnabled: isSSOEnabled,
            ssoURL: ssoURL,
            loginTitle: loginTitle,
            loginMessage: loginMessage,
            loginButtonLabel: loginButtonLabel
        };
    };
 
    return CustomLoginView;
});