define('AgeVerificationPopUp.View', [
    'SCView',
    'age_verification_pop_up.tpl'
], function AgeVerificationPopUpViewModule(
    SCViewComponent,
    AgeVerificationPopUpTpl
) {
    'use strict';

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        var expires = '';
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    };

    var SCView = SCViewComponent.SCView;

    var cookieName = 'NSeCommAgeVerificationCookie';
    var cookieExpirationDays = '';
    var popUpContent = '';
    var acceptButtonLabel = '';
    var denyButtonLabel = '';
    var redirectLink = '';
    var external = true;

    var AgeVerificationPopUpView = function AgeVerificationPopUpView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = AgeVerificationPopUpTpl;
        this.attributes = {
            'id': 'AgeVerificationPopUpView',
            'class': 'AgeVerificationPopUp-view'
        };
        this.environment = this.options.container.getComponent('Environment');
        cookieExpirationDays = this.environment.getConfig('ageVerificationPopUp.cookieExpiration');
        popUpContent = this.environment.getConfig('ageVerificationPopUp.content');
        acceptButtonLabel = this.environment.getConfig('ageVerificationPopUp.accept');
        denyButtonLabel = this.environment.getConfig('ageVerificationPopUp.denial');
        redirectLink = this.environment.getConfig('ageVerificationPopUp.redirect');
        external = this.environment.getConfig('ageVerificationPopUp.external');
    };

    AgeVerificationPopUpView.prototype = Object.create(SCView.prototype);

    AgeVerificationPopUpView.prototype.constructor = AgeVerificationPopUpView;

    AgeVerificationPopUpView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    AgeVerificationPopUpView.prototype.getContext = function getContext() {
        return {
            popUpContent: popUpContent,
            acceptButtonLabel: acceptButtonLabel,
            denyButtonLabel: denyButtonLabel,
            redirect: redirectLink,
            external: external
        };
    };

    AgeVerificationPopUpView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="accept"]': 'accept',
            'click [data-action="deny"]': 'deny'
        };
    };

    AgeVerificationPopUpView.prototype.accept = function accept() {
        setCookie(cookieName, 1, cookieExpirationDays);
    };

    AgeVerificationPopUpView.prototype.deny = function deny() {
        if (external) {
            window.location.href = redirectLink;
        }
    };

    return AgeVerificationPopUpView;
});
