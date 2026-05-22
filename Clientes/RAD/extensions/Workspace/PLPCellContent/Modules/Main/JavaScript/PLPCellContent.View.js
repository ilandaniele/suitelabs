define('PLPCellContent.View', [
    'SCView',
    'plp_cell_content.tpl',
    'underscore'
], function PLPCellContentViewModule(
    SCViewComponent,
    PLPCellContentTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BulbUpsellView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = PLPCellContentTpl;
        this.contextDataRequest = ['item'];

        this.environment = options.container.getComponent('Environment');

        this.configuration = this.environment.getConfig('plpCellContent');
    }

    BulbUpsellView.prototype = Object.create(SCView.prototype);

    BulbUpsellView.prototype.constructor = BulbUpsellView;

    BulbUpsellView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    BulbUpsellView.prototype.getContext = function getContext() {
        var item = this.contextData.item();

        return {
            content: item[this.configuration.fieldId],
            showContent: !!item[this.configuration.fieldId]
        };
    };

    return BulbUpsellView;
});
