define('Trade.Link.View', [
    'trade_link_view.tpl',
    'SCView',
    'Backbone'
], function TradeLinkViewModule(
    TradeLinkViewTpl,
    SCViewComponent,
    Backbone
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function TradeLinkView(options) {
        SCView.call(this);

        this.options = options || {};
        this.environment = options.environment;
        this.template = TradeLinkViewTpl;
    }

    TradeLinkView.prototype = Object.create(SCView.prototype);

    TradeLinkView.prototype.constructor = TradeLinkView;

    TradeLinkView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="trade-signin"]': 'tradeSignIn',
            'click [data-action="trade-apply"]': 'tradeApply'
        };
    };

    TradeLinkView.prototype.render = function render() {
        if (!this.options.profile || !(this.options.profile.get('isLoggedIn') === 'T')) {
            SCView.prototype.render.apply(this, arguments);
        }
    };

    TradeLinkView.prototype.tradeSignIn = function tradeSignIn() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl;
    };

    TradeLinkView.prototype.tradeApply = function tradeApply() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl + '&fragment=register-trade';
    };

    TradeLinkView.prototype.generateUrl = function generateUrl(touchpoint) {
        var origin = this.environment.getConfig('currentTouchpoint');
        var hash = Backbone.history.fragment;
        var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

        return loginUrl;
    };

    TradeLinkView.prototype.getContext = function getContext() {
        return {};
    };

    return TradeLinkView;
});
