define('FooterCopyright.View', [
    'SCView',
    'footer_copyright.tpl'
], function FooterCopyrightViewModule(
    SCViewComponent,
    FooterCopyrightTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FooterCopyrightView(options) {
        SCView.call(this);
        this.options = options;
        this.template = FooterCopyrightTpl;
    }

    FooterCopyrightView.prototype = Object.create(SCView.prototype);

    FooterCopyrightView.prototype.constructor = FooterCopyrightView;

    FooterCopyrightView.prototype.getContext = function getContext() {
        var environmentComponent = this.options.application.getComponent('Environment');
        return {
            copyrightText: (environmentComponent.getConfig('footer.copyrightText') || '').replace('[YEAR]', new Date().getFullYear())
        };
    };

    return FooterCopyrightView;
});
