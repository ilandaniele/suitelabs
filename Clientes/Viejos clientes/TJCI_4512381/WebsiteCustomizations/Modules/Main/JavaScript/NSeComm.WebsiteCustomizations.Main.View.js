// @module NSeComm.WebsiteCustomizations.Main
define('NSeComm.WebsiteCustomizations.Main.View', [
    'nsecomm_websitecustomizations_main.tpl',
    'SCView'
], function NSeCommWebsiteCustomizationsMainView(
    NSeCommWebsiteCustomizationsMainTpl,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function WebsiteCustomizationsView(options) {
        SCView.call(this);
        this.options = options || {};
        this.template = NSeCommWebsiteCustomizationsMainTpl;
        this.attributes = {
            id: 'MyViewId',
            'class': 'my-view'
        };
        this.on('afterViewRender', this.afterRender, this);
        // in case you need to request data for item
        this.contextDataRequest = ['item'];
    }

  // @class NSeComm.RelatedCategories.Main.View @extends Backbone.View
    WebsiteCustomizationsView.prototype = Object.create(SCView.prototype);
    WebsiteCustomizationsView.prototype.constructor = WebsiteCustomizationsView;
    WebsiteCustomizationsView.prototype.getContext = function getContext() {

    };

    WebsiteCustomizationsView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        SCView.prototype.render.apply(self, args);
    };

    return WebsiteCustomizationsView;
});
