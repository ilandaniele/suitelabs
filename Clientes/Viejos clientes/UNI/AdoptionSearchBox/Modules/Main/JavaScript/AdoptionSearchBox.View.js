define('AdoptionSearchBox.View', [
    'adoptionsearchbox.tpl',
    'SCView'
], function AdoptionSearchBoxViewModule(
    AdoptionSearchBoxTpl,
    SCViewComponent
) {
    'use strict';


    var SCView = SCViewComponent.SCView;

    var AdoptionSearchBoxView = function AdoptionSearchBoxView(options) {
        SCView.call(this);
        this.options = options || {};
        this.template = AdoptionSearchBoxTpl;
        this.attributes = {
            'id': 'AdoptionSearchBoxView',
            'class': 'AdoptionSearchBox-view'
        };
    };

    AdoptionSearchBoxView.prototype = Object.create(SCView.prototype);

    AdoptionSearchBoxView.prototype.constructor = AdoptionSearchBoxView;

    AdoptionSearchBoxView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    AdoptionSearchBoxView.prototype.getContext = function getContext() {
        return {};
    };

    return AdoptionSearchBoxView;
});
